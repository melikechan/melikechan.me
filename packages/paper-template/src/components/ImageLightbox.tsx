"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@melikechan/ui/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@melikechan/ui";

const MIN_SCALE = 1;
const MAX_SCALE = 8;
const CLICK_ZOOM = 2.5;
const ARROW_PAN = 50;
// Debounce delay (ms) for syncing React state after continuous wheel zoom.
// Keeps button disabled-states accurate without re-rendering on every tick.
const WHEEL_SYNC_DELAY = 150;

const BAR_BTN =
  "flex items-center justify-center w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors disabled:opacity-30 disabled:pointer-events-none";

const DIALOG_CLS = [
  "fixed inset-0 z-50 flex flex-col w-screen h-screen max-w-none max-h-none",
  "left-0 top-0 translate-x-0 translate-y-0",
  "p-0 gap-0 bg-transparent border-none shadow-none rounded-none sm:rounded-none",
  "[&>button]:hidden",
].join(" ");

interface ImageLightboxProps {
  src: string;
  alt: string;
  sizes: string;
  backdropSizes: string;
  priority?: boolean;
  containerClassName?: string;
}

type Offset = { x: number; y: number };

export function ImageLightbox({
  src,
  alt,
  sizes,
  backdropSizes,
  priority = false,
  containerClassName,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  // Only scale lives in React state — it drives button disabled states.
  // Offset and transform are written directly to the DOM via innerRef,
  // eliminating re-renders during drag, wheel, and pinch interactions.
  const [scale, setScale] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  // Refs mirror scale/offset so every event handler always reads fresh values.
  const scaleRef = useRef(1);
  const offsetRef = useRef<Offset>({ x: 0, y: 0 });
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startOX: number;
    startOY: number;
    moved: boolean;
  } | null>(null);
  const touchRef = useRef<{
    dist: number;
    midX: number;
    midY: number;
    startScale: number;
    startOX: number;
    startOY: number;
  } | null>(null);
  // rAF throttling for pointer-move drag.
  const rafRef = useRef<number | null>(null);
  const pendingMoveRef = useRef<{ dx: number; dy: number } | null>(null);
  // Debounce handle for syncing React scale state after wheel zoom ends.
  const wheelSyncRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clamp = useCallback(
    (ox: number, oy: number, s: number, rect?: DOMRect) => {
      const r = rect ?? containerRef.current?.getBoundingClientRect();
      if (!r) return { x: ox, y: oy };
      const maxX = (r.width * (s - 1)) / 2;
      const maxY = (r.height * (s - 1)) / 2;
      return {
        x: Math.max(-maxX, Math.min(maxX, ox)),
        y: Math.max(-maxY, Math.min(maxY, oy)),
      };
    },
    [],
  );

  // Hot path: write transform directly to the DOM. Zero React re-renders.
  const applyTransform = useCallback(
    (s: number, o: Offset, animated: boolean) => {
      scaleRef.current = s;
      offsetRef.current = o;
      const el = innerRef.current;
      if (!el) return;
      el.style.transform = `translate(${o.x}px, ${o.y}px) scale(${s})`;
      el.style.transition = animated ? "transform 0.15s ease-out" : "none";
    },
    [],
  );

  // Cold path: DOM write + React state sync. Use only for discrete actions
  // (button click, keyboard, single-click zoom) where button states must update.
  const commit = useCallback(
    (s: number, o: Offset, animated = true) => {
      applyTransform(s, o, animated);
      setScale(s);
    },
    [applyTransform],
  );

  const cancelPendingRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pendingMoveRef.current = null;
  }, []);

  useEffect(() => {
    if (!open) {
      cancelPendingRaf();
      if (wheelSyncRef.current !== null) {
        clearTimeout(wheelSyncRef.current);
        wheelSyncRef.current = null;
      }
      // Animate back to identity during the dialog's exit fade.
      applyTransform(1, { x: 0, y: 0 }, true);
      setScale(1);
    }
  }, [open, applyTransform, cancelPendingRaf]);

  // Pure computation — no side effects, usable by both hot and cold paths.
  const computeZoom = useCallback(
    (newScale: number, cx: number, cy: number, rect?: DOMRect) => {
      const clamped = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
      const ratio = clamped / scaleRef.current;
      return {
        scale: clamped,
        offset: clamp(
          cx + (offsetRef.current.x - cx) * ratio,
          cy + (offsetRef.current.y - cy) * ratio,
          clamped,
          rect,
        ),
      };
    },
    [clamp],
  );

  // Discrete zoom: DOM write + React state sync.
  const zoomTo = useCallback(
    (newScale: number, cx = 0, cy = 0, rect?: DOMRect) => {
      const { scale: s, offset: o } = computeZoom(newScale, cx, cy, rect);
      commit(s, o);
    },
    [computeZoom, commit],
  );

  const zoomIn = useCallback(() => zoomTo(scaleRef.current * 1.5), [zoomTo]);
  const zoomOut = useCallback(() => {
    const next = scaleRef.current / 1.5;
    next <= MIN_SCALE ? commit(1, { x: 0, y: 0 }) : zoomTo(next);
  }, [commit, zoomTo]);

  // Single effect for all non-React listeners; passive:false required on wheel
  // and touchmove so preventDefault() can suppress page scroll and pinch-zoom.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !open) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      const { scale: s, offset: o } = computeZoom(
        scaleRef.current * factor,
        e.clientX - rect.left - rect.width / 2,
        e.clientY - rect.top - rect.height / 2,
        rect,
      );
      // Direct DOM write — no React re-render per wheel tick.
      applyTransform(s, o, false);
      // Sync React scale state once the gesture settles so buttons reflect the
      // new min/max boundary, without re-rendering on every tick.
      if (wheelSyncRef.current !== null) clearTimeout(wheelSyncRef.current);
      wheelSyncRef.current = setTimeout(() => {
        setScale(scaleRef.current);
        wheelSyncRef.current = null;
      }, WHEEL_SYNC_DELAY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 2) return;
      const [t1, t2] = [e.touches[0], e.touches[1]];
      touchRef.current = {
        dist: Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY),
        midX: (t1.clientX + t2.clientX) / 2,
        midY: (t1.clientY + t2.clientY) / 2,
        startScale: scaleRef.current,
        startOX: offsetRef.current.x,
        startOY: offsetRef.current.y,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || !touchRef.current) return;
      e.preventDefault();
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const newScale = Math.max(
        MIN_SCALE,
        Math.min(
          MAX_SCALE,
          touchRef.current.startScale * (dist / touchRef.current.dist),
        ),
      );
      const rect = el.getBoundingClientRect();
      const cx = touchRef.current.midX - rect.left - rect.width / 2;
      const cy = touchRef.current.midY - rect.top - rect.height / 2;
      const ratio = newScale / touchRef.current.startScale;
      // Direct DOM write — no React re-render per touch-move event.
      applyTransform(
        newScale,
        clamp(
          cx + (touchRef.current.startOX - cx) * ratio,
          cy + (touchRef.current.startOY - cy) * ratio,
          newScale,
          rect,
        ),
        false,
      );
    };

    const onTouchEnd = () => {
      touchRef.current = null;
      // Sync React state once per pinch gesture.
      setScale(scaleRef.current);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [open, applyTransform, computeZoom, clamp]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startOX: offsetRef.current.x,
      startOY: offsetRef.current.y,
      moved: false,
    };
    if (scaleRef.current > 1) {
      // Direct style writes — no React re-render.
      if (containerRef.current) containerRef.current.style.cursor = "grabbing";
      if (innerRef.current) innerRef.current.style.transition = "none";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current || scaleRef.current <= 1) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragRef.current.moved = true;
    if (!dragRef.current.moved) return;

    // Store latest delta; at most one DOM write per animation frame.
    pendingMoveRef.current = { dx, dy };
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const pending = pendingMoveRef.current;
      if (!pending || !dragRef.current) return;
      applyTransform(
        scaleRef.current,
        clamp(
          dragRef.current.startOX + pending.dx,
          dragRef.current.startOY + pending.dy,
          scaleRef.current,
        ),
        false,
      );
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasDrag = dragRef.current?.moved ?? false;
    cancelPendingRaf();
    dragRef.current = null;
    if (containerRef.current) containerRef.current.style.cursor = "";
    if (innerRef.current)
      innerRef.current.style.transition = "transform 0.15s ease-out";

    if (wasDrag) return; // drag: scale unchanged, no state sync needed

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (scaleRef.current <= 1) {
      zoomTo(
        CLICK_ZOOM,
        e.clientX - rect.left - rect.width / 2,
        e.clientY - rect.top - rect.height / 2,
        rect,
      );
    } else {
      commit(1, { x: 0, y: 0 });
    }
  };

  // pointercancel fires with potentially zeroed coordinates — only clean up, never zoom.
  const handlePointerCancel = () => {
    cancelPendingRaf();
    dragRef.current = null;
    if (containerRef.current) containerRef.current.style.cursor = "";
    if (innerRef.current)
      innerRef.current.style.transition = "transform 0.15s ease-out";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "+":
      case "=":
        e.preventDefault();
        zoomIn();
        break;
      case "-":
        e.preventDefault();
        zoomOut();
        break;
      case "0":
        e.preventDefault();
        commit(1, { x: 0, y: 0 });
        break;
      case "ArrowLeft":
        if (scaleRef.current > 1) {
          e.preventDefault();
          commit(
            scaleRef.current,
            clamp(
              offsetRef.current.x + ARROW_PAN,
              offsetRef.current.y,
              scaleRef.current,
            ),
          );
        }
        break;
      case "ArrowRight":
        if (scaleRef.current > 1) {
          e.preventDefault();
          commit(
            scaleRef.current,
            clamp(
              offsetRef.current.x - ARROW_PAN,
              offsetRef.current.y,
              scaleRef.current,
            ),
          );
        }
        break;
      case "ArrowUp":
        if (scaleRef.current > 1) {
          e.preventDefault();
          commit(
            scaleRef.current,
            clamp(
              offsetRef.current.x,
              offsetRef.current.y + ARROW_PAN,
              scaleRef.current,
            ),
          );
        }
        break;
      case "ArrowDown":
        if (scaleRef.current > 1) {
          e.preventDefault();
          commit(
            scaleRef.current,
            clamp(
              offsetRef.current.x,
              offsetRef.current.y - ARROW_PAN,
              scaleRef.current,
            ),
          );
        }
        break;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open full size: ${alt}`}
        className={cn(
          "relative rounded-lg overflow-hidden mx-auto w-full cursor-zoom-in group",
          containerClassName ?? "aspect-video",
        )}
      >
        {/* Blurred backdrop eliminates letterbox gaps for any aspect ratio mismatch */}
        <Image
          src={src}
          alt=""
          fill
          aria-hidden
          sizes={backdropSizes}
          priority={priority}
          className="object-cover scale-110 blur-2xl opacity-60 select-none"
        />
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain z-10"
        />
        <div className="absolute inset-0 z-20 flex items-end justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="bg-black/60 text-white rounded p-1" aria-hidden>
            <span className="material-symbols-outlined text-base leading-none">
              zoom_in
            </span>
          </span>
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={DIALOG_CLS}>
          <DialogTitle className="sr-only">{alt}</DialogTitle>

          <div className="h-14 shrink-0 flex items-center justify-end gap-2 px-4">
            <button
              type="button"
              onClick={zoomOut}
              disabled={scale <= MIN_SCALE}
              aria-label="Zoom out"
              className={BAR_BTN}
            >
              <span
                className="material-symbols-outlined text-lg leading-none"
                aria-hidden
              >
                zoom_out
              </span>
            </button>
            <button
              type="button"
              onClick={zoomIn}
              disabled={scale >= MAX_SCALE}
              aria-label="Zoom in"
              className={BAR_BTN}
            >
              <span
                className="material-symbols-outlined text-lg leading-none"
                aria-hidden
              >
                zoom_in
              </span>
            </button>
            <DialogClose className={BAR_BTN}>
              <span
                className="material-symbols-outlined text-lg leading-none"
                aria-hidden
              >
                close
              </span>
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <div
            ref={containerRef}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            className={cn(
              "flex-1 relative overflow-hidden select-none",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
              scale > 1 ? "cursor-zoom-out" : "cursor-zoom-in",
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onKeyDown={handleKeyDown}
          >
            <div
              ref={innerRef}
              className="w-full h-full"
              style={{
                transformOrigin: "center center",
                willChange: "transform",
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                draggable={false}
              />
            </div>
          </div>

          <div className="h-14 shrink-0" aria-hidden />
        </DialogContent>
      </Dialog>
    </>
  );
}
