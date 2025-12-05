import { useState } from "react";
import sweetie16 from "./paletteList/sweetie-16.pal";

type RGB = { r: number; g: number; b: number };

const SelectPrePalette: React.FC = () => {
  const [isOpenContents, setIsContents] = useState(false);

  // --- PALファイルをパース ---
  const parsePAL = (text: string): RGB[] => {
    const lines = text.trim().split("\n");

    // 最初の3行はヘッダーなのでスキップ
    const colorLines = lines.slice(3);

    return colorLines.map((line) => {
      const [r, g, b] = line.split(" ").map(Number);
      return { r, g, b };
    });
  };

  const colors = parsePAL(sweetie16);

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

  return (
    <>
      {/* --- 開閉バー --- */}
      <div style={contentsBar} onClick={() => setIsContents((prev) => !prev)}>
        <span>プリパレットを選択</span>
        <span
          style={{
            transform: isOpenContents ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          ▼
        </span>
      </div>

      {/* --- アニメーション付き展開ボックス --- */}
      <div
        style={{
          width: "calc(80% - 3px)",
          overflow: "hidden",
          marginInline: "auto",
          maxHeight: isOpenContents ? "200px" : "0px",
          transition: "max-height 0.35s ease",
          background: "rgb(154, 152, 155)",
          paddingInline: isOpenContents ? "1rem" : "1rem",
          paddingBlock: isOpenContents ? "1rem" : "0",
        }}
      >
        {/* Palette を 2段グリッドで表示 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)", // 16色 → 8×2 の2段
            gap: "0.5rem",
          }}
        >
          {colors.map((c, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                paddingBottom: "100%", // 正方形
                background: `rgb(${c.r}, ${c.g}, ${c.b})`,
                borderRadius: "4px",
                border: "1px solid #00000030",
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectPrePalette;
