import { useState, useEffect } from "react";

type Props = {
  setColorPalette: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectPrePalette: React.FC<Props> = ({ setColorPalette }) => {
  const [isOpenContents, setIsContents] = useState(false);
  const [sweetiePalette, setSweetiePalette] = useState<string[]>([]);
  const paletteName = "sweetie-16"; // .pal を除いた名前

  // ▼ .pal ファイルを読み込み
  useEffect(() => {
    const loadPalette = async () => {
      const res = await fetch("/paletteList/sweetie-16.pal");
      const text = await res.text();

      // テキストを行ごとに分割
      const lines = text.split("\n").map((l) => l.trim());

      // 先頭3行はヘッダなので無視
      const colorLines = lines.slice(3);

      // RGB → "rgb(r,g,b)" に変換
      const rgbList = colorLines.map((line) => {
        const [r, g, b] = line.split(" ").map(Number);
        return `rgb(${r},${g},${b})`;
      });

      setSweetiePalette(rgbList);
    };

    loadPalette();
  }, []);

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
          ▼
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
          {/* ▼ sweetie-16.pal の項目 */}
          <div
            style={{
              padding: "0.5rem 0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onClick={() => {
              setColorPalette(sweetiePalette);
            }}
          >
            <span>{paletteName}</span>

            {/* ▼ パレットプレビュー */}
            <div style={{ display: "flex", gap: "2px", marginLeft: "1rem" }}>
              {sweetiePalette.map((c, i) => (
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
