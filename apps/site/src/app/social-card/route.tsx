import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { socialCardSize } from "@/lib/metadata";

const logoData = readFile(join(process.cwd(), "public/logo.png"), "base64");
const lexendRegularData = readFile(
  join(process.cwd(), "src/app/fonts/Lexend-Regular.ttf"),
);
const lexendBoldData = readFile(
  join(process.cwd(), "src/app/fonts/Lexend-Bold.ttf"),
);

async function renderSocialCard(pageName: string) {
  const [logo, lexendRegular, lexendBold] = await Promise.all([
    logoData,
    lexendRegularData,
    lexendBoldData,
  ]);
  const logoSrc = `data:image/png;base64,${logo}`;

  return new ImageResponse(
    <div
      style={{
        background: "hsl(255 10% 5%)",
        color: "hsl(210 40% 95%)",
        display: "flex",
        fontFamily: "Lexend",
        height: "100%",
        padding: 36,
        width: "100%",
      }}
    >
      <div
        style={{
          background: "hsl(255 10% 15%)",
          border: "2px solid hsl(264 40% 20%)",
          borderRadius: 16,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(90deg, hsl(264 85% 52%), hsl(316 85% 35%))",
            display: "flex",
            height: 4,
            width: "100%",
          }}
        />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            padding: "48px 54px 44px",
          }}
        >
          <div style={{ alignItems: "center", display: "flex" }}>
            {/* ImageResponse renders standard image elements into the generated PNG. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt="" height={62} width={62} />
            <span
              style={{
                fontSize: 30,
                fontWeight: 400,
                letterSpacing: "-0.025em",
                marginLeft: 18,
              }}
            >
              melikechan
            </span>
          </div>

          <div
            style={{
              alignItems: "center",
              color: "hsl(265 5% 95%)",
              display: "flex",
              flex: 1,
              fontSize:
                pageName.length > 48 ? 50 : pageName.length > 28 ? 62 : 76,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {pageName}
          </div>

          <div
            style={{
              color: "hsl(265 10% 60%)",
              display: "flex",
              fontSize: 23,
              fontWeight: 400,
            }}
          >
            melikechan.me
          </div>
        </div>
      </div>
    </div>,
    {
      ...socialCardSize,
      fonts: [
        {
          name: "Lexend",
          data: Uint8Array.from(lexendRegular).buffer,
          weight: 400,
        },
        {
          name: "Lexend",
          data: Uint8Array.from(lexendBold).buffer,
          weight: 700,
        },
      ],
    },
  );
}

export async function GET(request: NextRequest) {
  const pageName = request.nextUrl.searchParams.get("page")?.trim() || "Home";
  const image = await renderSocialCard(pageName.slice(0, 100));

  image.headers.set(
    "Cache-Control",
    "public, s-maxage=31536000, stale-while-revalidate=86400",
  );

  return image;
}
