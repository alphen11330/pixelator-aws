"use client";
import React from "react";
import style from "../util.module.css";

type Props = {
  ImageSrc: string | null;
  setIsPreview: (value: React.SetStateAction<boolean>) => void;
  isPreview: true;
};

const PreviewButton: React.FC<Props> = ({
  setIsPreview,
  isPreview,
  ImageSrc,
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

  return <></>;
};

export default PreviewButton;
