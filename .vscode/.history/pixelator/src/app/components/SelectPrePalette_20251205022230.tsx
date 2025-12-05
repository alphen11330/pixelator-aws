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
        <span style={{ left: "0" }}>^</span>
      </div>
    </>
  );
};
export default SelectPrePalette;
