import { useState, useEffect } from "react";
import { paletteFiles } from "@/app/paletteList"; // index.ts を読み込む

type Props = {
  setColorPalette: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectPrePalette: React.FC<Props> = ({ setColorPalette }) => {
  const [isOpenContents, setIsContents] = useState(false);
  const [palettes, setPalettes] = useState<
    { name: string; colors: string[] }[]
  >([]);

  // ▼ 複数のPALファイルを全て読み込む
  useEffect(() => {
    const loadAllPalettes = async () => {
      const results: { name: string; colors: string[] }[] = [];

      for (const file of paletteFiles) {
        const res = await fetch(`/paletteList/${file}`);
        const text = await res.text();

        // 行ごとに分割してヘッダ3行をスキップ
        const lines = text.split("\n").map((l) => l.trim());
        const colorLines = lines.slice(3);

        // "r g b" → "rgb(r,g,b)"
        const rgbList = colorLines
          .filter((l) => l.length > 0)
          .map((line) => {
            const [r, g, b] = line.split(" ").map(Number);
            return `rgb(${r},${g},${b})`;
          });

        results.push({
          name: file.replace(".pal", ""), // 表示名（.pal除去）
          colors: rgbList,
        });
      }

      setPalettes(results);
    };

    loadAllPalettes();
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
          {/* ▼ パレット一覧 */}
          {palettes.map((p, index) => (
            <div
              key={index}
              style={{
                padding: "0.5rem 0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setColorPalette(p.colors)}
            >
              <span>{p.name}</span>

              {/* ▼ プレビュー色 */}
              <div
                style={{
                  display: "flex",
                  gap: "2px",
                  marginLeft: "1rem",
                }}
              >
                {p.colors.map((c, i) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectPrePalette;
