import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "6px",
        }}
      >
        {/* Outer O ring */}
        <div
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            border: "4px solid #FF6A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Gap in the ring (top-right) */}
          <div
            style={{
              position: "absolute",
              top: "-2px",
              right: "-1px",
              width: "8px",
              height: "8px",
              background: "#1a1a1a",
              borderRadius: "1px",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
