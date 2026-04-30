import type { ReactNode } from "react";

export interface TimelineItem {
  id: string;
  children?: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  lineColor?: string;
  dotColor?: string;
  renderItemContent?: (item: TimelineItem) => ReactNode;
}

const defaultRender = (item: TimelineItem) => (
  <article className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-card rounded-lg border border-primary/20 shadow-sm text-wrap">
    {item.children}
  </article>
);

export default function Timeline({
  items,
  lineColor = "bg-primary",
  dotColor = "bg-primary",
  renderItemContent = defaultRender,
}: TimelineProps) {
  return (
    <section className="w-full py-4 sm:py-6">
      <div className="relative">
        <div
          className={`absolute w-0.5 h-full ${lineColor} top-2 left-5 -translate-x-1/2 sm:left-1/2`}
        />

        <div className="space-y-12 sm:space-y-0">
          {items.map((item, index) => {
            const dot = (
              <div
                className={`w-4 h-4 rounded-full ${dotColor} z-10 border-4 border-background`}
              />
            );
            const content = renderItemContent(item);

            return (
              <div key={item.id} className="sm:mb-12">
                {/* Mobile */}
                <div className="sm:hidden relative">
                  <div
                    className={`absolute ${dotColor} rounded-full w-4 h-4 left-5 -translate-x-1/2 top-1 z-10 border-4 border-background`}
                  />
                  <div className="ml-12 pt-0.5">{content}</div>
                </div>

                {/* Desktop — alternating left/right */}
                <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-x-8 items-center">
                  {index % 2 === 0 ? content : <div />}
                  <div className="flex justify-center">{dot}</div>
                  {index % 2 !== 0 ? content : <div />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
