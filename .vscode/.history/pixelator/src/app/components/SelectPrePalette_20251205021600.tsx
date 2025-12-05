import { useState } from "react";
type Props = {};

const SelectPrePalette: React.FC<Props> = ({}) => {
  const contentsBar: React.CSSProperties = {
    width: "calc(80% - 3px)",
    height: "1rem",
    marginInline: "auto",
    marginTop: "2rem",
    background: "black",
  };
  return (
    <>
      <div style={contentsBar} />
    </>
  );
};
export default SelectPrePalette;
