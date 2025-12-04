"use client";
import React from "react";
import style from "../util.module.css";
import { pupupuFont } from "../fonts/pupupuFont";

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
    background: "rgba(0, 0, 0)",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    zIndex: "20",
    userSelect: "none",
    pointerEvents: "none",
    transition: "all 0.3s",
    opacity: isPreview ? "1" : "0",
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
              userSelect: isPreview ? "all" : "none",
              pointerEvents: isPreview ? "all" : "none",
            }}
            onClick={() => setIsPreview(!isPreview)}
          />
        </>
      )}

      <span className={style.previewButton}>
        <div
          className={pupupuFont.className}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "2.5rem",
            color: "rgb(255, 175, 209)",
            WebkitTextStroke: "1px rgb(163, 158, 194)",
            textShadow: "4px 3px  rgb(146, 208, 255)",
          }}
          onClick={() => setIsPreview(!isPreview)}
        >
          P
        </div>
      </span>
    </>
  );
};

export default ImgPreviewer;
