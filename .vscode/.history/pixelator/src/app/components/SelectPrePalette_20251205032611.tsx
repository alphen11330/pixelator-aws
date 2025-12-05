import { useState, useEffect } from "react";
import { paletteFiles } from "../paletteList";

type Props = {
  setColorPalette: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectPrePalette: React.FC<Props> = ({ setColorPalette }) => {
  const [isOpenContents, setIsContents] = useState(false);
  const [palettes, setPalettes] = useState<
    { name: string; colors: string[] }[]
  >([]);

  useEffect(() => {
    const loadAllPalettes = async () => {
      const result: { name: string; colors: string[] }[] = [];

      for (const filename of paletteFiles) {
        const res = await fetch(`/paletteList/${filename}`);
        const text = await res.text();

        const lines = text.split("\n").map((l) => l.trim());
        const rgbLines = lines.slice(3);

        const colors = rgbLines.map((line) => {
          const [r, g, b] = line.split(" ").map(Number);
          return `rgb(${r},${g},${b})`;
        });

        result.push({
          name: filename.replace(".pal", ""),
          colors,
        });
      }

      setPalettes(result);
    };

    loadAllPalettes();
  }, []);

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setIsContents((v) => !v)}
      >
        プリパレットを選択 ▼
      </div>

      {isOpenContents && (
        <div style={{ padding: "1rem" }}>
          {palettes.map((p) => (
            <div
              key={p.name}
              style={{ marginBottom: "0.5rem", cursor: "pointer" }}
              onClick={() => setColorPalette(p.colors)}
            >
              <span>{p.name}</span>
              <div style={{ display: "flex", gap: "3px", marginLeft: "1rem" }}>
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
      )}
    </>
  );
};

export default SelectPrePalette;
