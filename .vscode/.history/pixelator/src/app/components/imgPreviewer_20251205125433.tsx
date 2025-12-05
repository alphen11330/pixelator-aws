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
              // background: isPreview ? "red" : "",
              pointerEvents: "auto",
            }}
            onClick={() => setIsPreview(!isPreview)}
            onTouchStart={() => setIsPreview(!isPreview)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-20"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </>
      )}
    </>
  );
};

export default ImgPreviewer;
