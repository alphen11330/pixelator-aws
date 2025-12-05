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
              width: "10%",
              height: "10%",
              zIndex: "21",
              color: "red",
              userSelect: isPreview ? "all" : "none",
              pointerEvents: isPreview ? "all" : "none",
            }}
            onClick={() => setIsPreview(!isPreview)}
            onTouchStart={() => setIsPreview(!isPreview)}
          />
        </>
      )}
    </>
  );
};

export default ImgPreviewer;
