"use client";
import React from "react";
import style from "../util.module.css";

type Props = {
  imageSrc: string | null;
  isPreview: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImgPreviewer = ({ imageSrc, isPreview, setIsPreview }: Props) => {
  const previewImgStyle: React.CSSProperties = {
    position: "absolute",
    background: "rgba(0, 0, 0, 0.6)",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    zIndex: "20",
    transition: "opacity 0.3s",
    imageRendering: "pixelated",
  };

  return (
    <>
      {imageSrc && (
        <>
          <img
            src={imageSrc}
            alt="edited Image"
            style={{
              ...previewImgStyle,
              opacity: isPreview ? 1 : 0,
              pointerEvents: isPreview ? "auto" : "none",
            }}
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
              background: isPreview ? "rgba(0, 0, 0, 0.6)" : "transparent",
              transition: "background 0.3s",
              pointerEvents: isPreview ? "auto" : "none",
            }}
            onClick={() => setIsPreview(false)}
          />
        </>
      )}
    </>
  );
};

export default ImgPreviewer;
