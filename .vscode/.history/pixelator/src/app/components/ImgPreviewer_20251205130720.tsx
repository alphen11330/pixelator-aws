"use client";
import React from "react";
import style from "../util.module.css";

type Props = {
  imageSrc: string | null;
  isPreview: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImgPreviewer: React.FC<Props> = ({
  imageSrc,
  isPreview,
  setIsPreview,
}) => {
  const previewImgStyle: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(4px)",
    objectFit: "contain",
    zIndex: "20",
    userSelect: "none",
    pointerEvents: "none",
    opacity: isPreview ? "1" : "0",
    transition: "all 0.35s",
    imageRendering: "pixelated",
  };

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsPreview(!isPreview);
  };

  return (
    <>
      {imageSrc && (
        <>
          <img
            src={imageSrc}
            alt="edited Image"
            style={previewImgStyle}
            onContextMenu={(e) => e.preventDefault()}
          />
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              zIndex: "21",
              userSelect: isPreview ? "all" : "none",
              pointerEvents: isPreview ? "all" : "none",
              cursor: isPreview ? "pointer" : "default",
              WebkitTapHighlightColor: "transparent",
            }}
            onClick={handleToggle}
            onTouchEnd={handleToggle}
          >
            {isPreview && (
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  width: "40px",
                  height: "40px",
                  background: "rgba(0,0,0,0.7)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.7)";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  style={{ width: "24px", height: "24px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ImgPreviewer;
