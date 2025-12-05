import { useState } from "react";
type Props = {};

const SelectPalette: React.FC<Props> = ({}) => {
  const contentsBar: React.CSSProperties = {
    width: "80%",
    height: "1rem",
    background: "",
  };
  return (
    <>
      <div style={contentsBar} />
    </>
  );
};
export default SelectPalette;
