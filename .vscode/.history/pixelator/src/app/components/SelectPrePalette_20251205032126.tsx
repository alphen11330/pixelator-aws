import { useState, useEffect } from "react";

type Props = {
  setColorPalette: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectPrePalette: React.FC<Props> = ({ setColorPalette }) => {
  const [isOpenContents, setIsContents] = useState(false);
  const [palette, setPalette] = useState<string[]>([]);
  const paletteFile = "sweetie-16.pal"; // ファイル名
  const paletteName = paletteFile.replace(".pal", ""); // 表示名（.palを外す）

  // ▼ public/paletteList/xxx.pal を読み込み
  useEffect(() => {
    const loadPalette = async () => {
      const res = await fetch(`/paletteList/${paletteFile}`);
      const text = await res.text();

      // 行ごとに分解し、先頭3行（JASCヘッダ）を除去
      const lines = text.split("\n").map((l) => l.trim());
      const colorLines = lines.slice(3);

      // RGB → "rgb(r,g,b)" に変換
      const rgbList = colorLines.map((line) => {
        const [r, g, b] = line.split(" ").map(Number);
        return `rgb(${r},${g},${b})`;
      });

      setPalette(rgbList);
    };

    loadPalette();
  }, []);

  const contentsBar: React.CSSProperties = {
    display: "flex",
    width: "calc(80% - 3px)",
    height: "1.5rem",
    color: "white",
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

      {/* ▼ スライドダウン部分 */}
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
            }}
            onClick={() => setColorPalette(palette)}
          >
            <span>{paletteName}</span>

            {/* ▼ プレビュー */}
            <div style={{ display: "flex", gap: "2px", marginLeft: "1rem" }}>
              {palette.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: "15px",
                    height: "15px",
                    background: c,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectPrePalette;
