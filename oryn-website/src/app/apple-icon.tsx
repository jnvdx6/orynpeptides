import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1a",
          borderRadius: "36px",
        }}
      >
        {/* Outer O ring */}
        <div
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "50%",
            border: "20px solid #FF6A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Gap in the ring (top-right) — signature ORYN mark */}
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-4px",
              width: "36px",
              height: "36px",
              background: "#1a1a1a",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
