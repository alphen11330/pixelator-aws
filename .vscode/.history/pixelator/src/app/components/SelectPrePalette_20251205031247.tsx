import { useState } from "react";

type Props = {
  setColorPalette: React.Dispatch<React.SetStateAction<string[]>>;
};

const sweetie16 = [
  "26 28 44",
  "93 39 93",
  "177 62 83",
  "239 125 87",
  "255 205 117",
  "167 240 112",
  "56 183 100",
  "37 113 121",
  "41 54 111",
  "59 93 201",
  "65 166 246",
  "115 239 247",
  "244 244 244",
  "148 176 194",
  "86 108 134",
  "51 60 87",
].map((str) => {
  const [r, g, b] = str.split(" ").map(Number);
  return `rgb(${r},${g},${b})`;
});

const SelectPrePalette: React.FC<Props> = ({ setColorPalette }) => {
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
    flexDirection: "column",
    width: "100%",
    height: isOpenContents ? "25vh" : "0px",
    color: "rgb(255,255,255)",
    paddingInline: "1rem",
    background: "rgb(154, 152, 155)",
    overflow: "hidden",
    transition: "height 0.3s ease",
  };

  return (
    <>
      <div style={contentsBar} onClick={() => setIsContents((prev) => !prev)}>
        <span>プリパレットを選択</span>

        <span
          style={{
            transform: isOpenContents ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </span>
      </div>

      {/* ▼スライドダウン部分 */}
      <div
        style={{
          marginInline: "auto",
          width: "calc(80% - 3px)",
        }}
      >
        <div style={contentsBox}>
          {/* ▼ sweetie-16 のプリセット項目 */}
          <div
            style={{
              padding: "0.5rem 0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onClick={() => {
              setColorPalette(sweetie16);
            }}
          >
            <span>Sweetie-16</span>

            {/* ▼ パレットのプレビュー表示 */}
            <div style={{ display: "flex", gap: "2px", marginLeft: "1rem" }}>
              {sweetie16.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: "15px",
                    height: "15px",
                    background: c,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectPrePalette;
