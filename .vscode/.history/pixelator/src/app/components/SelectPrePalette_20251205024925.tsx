import { useState, useEffect } from "react";

const SelectPrePalette: React.FC = () => {
  const [isOpenContents, setIsOpenContents] = useState(false);
  const [palette, setPalette] = useState<number[][]>([]);

  // ▼ public フォルダの sweetie-16.pal を読み取る
  useEffect(() => {
    fetch("/sweetie-16.pal")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n").map((l) => l.trim());

        // 3行目までヘッダーなのでスキップ
        const colorLines = lines.slice(3);

        const colors = colorLines
          .map((line) => line.split(" ").map(Number))
          .filter((rgb) => rgb.length === 3);

        setPalette(colors);
      });
  }, []);

  const contentsBar: React.CSSProperties = {
    display: "flex",
    width: "calc(80% - 3px)",
    height: "1.5rem",
    paddingInline: "1rem",
    marginInline: "auto",
    marginTop: "1rem",
    fontSize: "0.8rem",
    background: "rgb(101, 98, 105)",
    color: "white",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    userSelect: "none",
  };

  const contentsBoxWrapper: React.CSSProperties = {
    overflow: "hidden",
    transition: "height 0.25s ease",
    height: isOpenContents ? "25vh" : "0",
  };

  const contentsBox: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    padding: isOpenContents ? "1rem" : "0",
    width: "calc(80% - 3px)",
    marginInline: "auto",
    color: "white",
    background: "rgb(154, 152, 155)",
    transition: "padding 0.25s ease",
  };

  return (
    <>
      {/* ▼バー（クリックで開閉） */}
      <div style={contentsBar} onClick={() => setIsOpenContents((p) => !p)}>
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

      {/* ▼アニメーション付きの展開ボックス */}
      <div style={contentsBoxWrapper}>
        <div style={contentsBox}>
          {palette.map((rgb, i) => (
            <div
              key={i}
              style={{
                width: "2rem",
                height: "2rem",
                background: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
                borderRadius: "4px",
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectPrePalette;
