import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ORYN Peptide Labs — Precision Peptide Science";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const fontBold = await readFile(
    join(process.cwd(), "assets/SpaceGrotesk-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1a",
          fontFamily: "SpaceGrotesk",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "#FF6A1A",
            display: "flex",
          }}
        />

        {/* Glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-80px",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            background: "rgba(255, 106, 26, 0.07)",
            display: "flex",
          }}
        />

        {/* Glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-60px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "rgba(255, 106, 26, 0.04)",
            display: "flex",
          }}
        />

        {/* Logo O mark */}
        <div
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            border: "7px solid #FF6A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "28px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-3px",
              right: "-1px",
              width: "18px",
              height: "18px",
              background: "#1a1a1a",
              borderRadius: "2px",
              display: "flex",
            }}
          />
        </div>

        {/* ORYN */}
        <div
          style={{
            fontSize: "78px",
            fontWeight: 700,
            color: "white",
            letterSpacing: "14px",
            lineHeight: 1,
            display: "flex",
          }}
        >
          ORYN
        </div>

        {/* PEPTIDE LABS */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#FF6A1A",
            letterSpacing: "16px",
            lineHeight: 1,
            marginTop: "12px",
            display: "flex",
          }}
        >
          PEPTIDE LABS
        </div>

        {/* Separator */}
        <div
          style={{
            width: "56px",
            height: "2px",
            background: "rgba(255, 106, 26, 0.35)",
            marginTop: "28px",
            display: "flex",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.35)",
            letterSpacing: "7px",
            marginTop: "20px",
            display: "flex",
          }}
        >
          PRECISION PEPTIDE SCIENCE
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            left: "40px",
            display: "flex",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              color: "rgba(255, 255, 255, 0.18)",
              letterSpacing: "3px",
              display: "flex",
            }}
          >
            GMP CERTIFIED · ISO 7 CLEANROOM · &gt;99% PURITY
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "40px",
            display: "flex",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              color: "rgba(255, 106, 26, 0.35)",
              letterSpacing: "2px",
              display: "flex",
            }}
          >
            ORYN.COM
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "SpaceGrotesk",
          data: fontBold,
          style: "normal" as const,
          weight: 700 as const,
        },
      ],
    }
  );
}
