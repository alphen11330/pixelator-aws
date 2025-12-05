import { useState } from "react";
type Props = {};

const SelectPrePalette: React.FC<Props> = ({}) => {
  const contentsBar: React.CSSProperties = {
    width: "calc(80% - 3px)",
    height: "1.5rem",
    marginInline: "auto",
    marginTop: "1rem",
    background: "rgb(101, 98, 105)",
    color: "rgb(255,255,255)",
    fontSize: "1.3rem",
  };
  return (
    <>
      <div style={contentsBar}>
        <span style={{ right: "0px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </span>
      </div>
    </>
  );
};
export default SelectPrePalette;
