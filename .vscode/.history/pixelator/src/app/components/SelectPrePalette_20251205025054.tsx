import { useEffect, useState } from "react";

const SelectPrePalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [colors, setColors] = useState<string[]>([]);

  // ---- パレット読み込み ----
  useEffect(() => {
    fetch("/sweetie-16.pal")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n").map((x) => x.trim());
        const rgbLines = lines.slice(3); // 色データのみ

        const parsed = rgbLines.map((line) => {
          const [r, g, b] = line.split(" ").map(Number);
          return `rgb(${r}, ${g}, ${b})`;
        });

        setColors(parsed);
      });
  }, []);

  // ---- スタイル ----
  const barStyle: React.CSSProperties = {
    display: "flex",
    width: "calc(80% - 3px)",
    height: "1.5rem",
    color: "white",
    paddingInline: "1rem",
    background: "rgb(101, 98, 105)",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1rem auto 0",
    fontSize: "0.8rem",
    cursor: "pointer",
    userSelect: "none",
  };

  const boxWrapper: React.CSSProperties = {
    overflow: "hidden",
    transition: "max-height 0.3s ease",
    maxHeight: isOpen ? "500px" : "0px",
  };

  const boxStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gap: "0.5rem",
    padding: isOpen ? "1rem" : "0rem",
    background: "rgb(154,152,155)",
    width: "calc(80% - 3px)",
    margin: "0 auto",
    transition: "padding 0.3s ease",
  };

  return (
    <>
      <div style={barStyle} onClick={() => setIsOpen((prev) => !prev)}>
        <span>プリパレットを選択</span>

        <span
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          ▼
        </span>
      </div>

      {/* アニメーション用 wrapper */}
      <div style={boxWrapper}>
        <div style={boxStyle}>
          {colors.map((c, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                background: c,
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
