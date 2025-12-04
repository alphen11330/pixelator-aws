"use client";
import React from "react";
import style from "../util.module.css";

type Props = {
  imageSrc: string | null;
  setIsPreview: (value: React.SetStateAction<boolean>) => void;
  isPreview: true;
};

const PreviewButton: React.FC<Props> = ({
  imageSrc,

  setIsPreview,
  isPreview,
}) => {
  const previewImgStyle: React.CSSProperties = {
    position: "absolute",
    background: "rgba(0, 0, 0, 0.6)",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    zIndex: "20",
    userSelect: "none",
    pointerEvents: "none",
    transition: "all 0.3s",
    imageRendering: "pixelated",
  };

  return (
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
        }}
        onClick={() => setIsPreview(!isPreview)}
      />
    </>
  );
};

export default PreviewButton;
