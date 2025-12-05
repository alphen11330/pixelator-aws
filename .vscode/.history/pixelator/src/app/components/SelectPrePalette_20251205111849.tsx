import { useState, useEffect } from "react";
import { paletteFiles } from "@/app/paletteList";

type Props = {
  setColorPalette: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectPrePalette: React.FC<Props> = ({ setColorPalette }) => {
  const [isOpenContents, setIsContents] = useState(false);

  // 読み込んだパレット一覧（複数）
  const [palettes, setPalettes] = useState<
    { name: string; author: string; link: string; colors: string[] }[]
  >([]);

  // ▼ すべてのパレットファイルを読み込む
  useEffect(() => {
    const loadAllPalettes = async () => {
      const results: {
        name: string;
        author: string;
        link: string;
        colors: string[];
      }[] = [];

      for (const [file, author, link] of paletteFiles) {
        const res = await fetch(`/paletteList/${file}`);
        const text = await res.text();

        const lines = text.split("\n").map((l) => l.trim());
        const colorLines = lines.slice(3);

        const rgbList = colorLines
          .filter((l) => l.length > 0)
          .map((line) => {
            const [r, g, b] = line.split(" ").map(Number);
            return `rgb(${r},${g},${b})`;
          });

        results.push({
          name: file.replace(".pal", ""),
          author,
          link,
          colors: rgbList,
        });
      }

      setPalettes(results);
    };

    loadAllPalettes();
  }, []);

  // ▼ UI スタイル
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

      {/* スライドダウン部分 */}
      <div
        style={{
          marginInline: "auto",
          width: "calc(80% - 3px)",
        }}
      >
        <div style={contentsBox}>
          {palettes.map((p, index) => (
            <div
              key={index}
              onClick={() => setColorPalette(p.colors)}
              style={{
                padding: "0.5rem 0",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span>
                {/* パレット名 by 作者名 */}
                <span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                  {p.name}{" "}
                </span>
                <span style={{ fontWeight: "normal", fontSize: "0.7rem" }}>
                  by {p.author}
                </span>
                {/* ▼ リンク */}
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    color: "#e0e0e0",
                    textDecoration: "underline",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      stroke="rgb(0, 179, 249)"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                </a>
              </span>

              {/* ▼ 色プレビュー */}
              <div style={{ display: "flex", gap: "2px" }}>
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

              {/* 区切り線 */}
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "rgba(255,255,255,0.2)",
                  marginTop: "4px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectPrePalette;
