import { useState } from "react";
type Props = {};

const SelectPrePalette: React.FC<Props> = ({}) => {
  const [isOpenContents, setIsContents] = useState(false);
  const contentsBar: React.CSSProperties = {
    display: "flex",
    width: "calc(80% - 3px)",
    height: "1.5rem",
    color: "rgb(255,255,255)",
    paddingInline: "1rem",
    background: "rgb(101, 98, 105)",

    alignItems: "center",
    justifyContent: "space-between",
    marginInline: "auto",
    marginTop: "1rem",
    fontSize: "0.8rem",
    cursor: "pointer",
    userSelect: "none",
  };
  const contentsBox: React.CSSProperties = {
    display: "flex",
    width: "calc(80% - 3px)",
    height: "25vh",
    color: "rgb(255,255,255)",
    paddingInline: "1rem",
    background: "rgb(154, 152, 155)",
  };

  return (
    <>
      <div style={contentsBar}>
        <span>プリパレットを選択</span>
        <span>
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
