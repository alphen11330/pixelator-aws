import { useEffect, useState } from "react";

const SelectPrePalette = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/paletteList/sweetie-16.pal")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.trim().split("\n");

        // 最初の3行（ヘッダ）はスキップ
        const rgbLines = lines.slice(3);

        const parsed = rgbLines.map((line) => {
          const [r, g, b] = line.split(" ").map(Number);
          return `rgb(${r}, ${g}, ${b})`;
        });

        setColors(parsed);
      });
  }, []);

  return (
    <>
      {/* bar */}
      <div
        style={{
          display: "flex",
          width: "calc(80% - 3px)",
          height: "1.5rem",
          paddingInline: "1rem",
          marginInline: "auto",
          marginTop: "1rem",
          background: "rgb(101,98,105)",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          color: "white",
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>プリパレットを選択</span>
        <span
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .2s",
          }}
        >
          ▼
        </span>
      </div>

      {/* 展開ボックス（アニメーション） */}
      <div
        style={{
          width: "calc(80% - 3px)",
          marginInline: "auto",
          overflow: "hidden",
          transition: "max-height .3s ease",
          maxHeight: isOpen ? "300px" : "0px",
          background: "rgb(154,152,155)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)", // 2段にしたいので 8列 (16色→2段)
            gap: "4px",
            padding: "1rem",
          }}
        >
          {colors.map((c, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                paddingBottom: "100%", // 正方形を維持するテクニック
                background: c,
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectPrePalette;
