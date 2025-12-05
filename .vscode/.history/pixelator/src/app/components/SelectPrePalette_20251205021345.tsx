import { useState } from "react";
type Props = {};

const SelectPrePalette: React.FC<Props> = ({}) => {
  const contentsBar: React.CSSProperties = {
    width: "80%",
    height: "1rem",
    background: "black",
  };
  return (
    <>
      <div style={contentsBar} />
    </>
  );
};
export default SelectPrePalette;
