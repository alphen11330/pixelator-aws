import { useState } from "react";
import { paletteFiles } from "@/app/paletteList"; // index.ts を読み込む

type Props = {
  setColorPalette: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectPrePalette: React.FC<Props> = ({ setColorPalette }) => {
  const [isOpenContents, setIsOpenContents] = useState(false);

  // .pal を読み取り → RGB配列を返す
  const loadPalette = async (fileName: string) => {
    const res = await fetch(`/paletteList/${fileName}`);
    const text = await res.text();

    // PALファイルパース
    const lines = text.split("\n").map((l) => l.trim());
    const colorLines = lines.slice(3); // JASC-PAL / 0100 / count の3行をスキップ

    const rgbList = colorLines
      .filter((l) => l.length > 0)
      .map((line) => {
        const [r, g, b] = line.split(" ").map(Number);
        return `rgb(${r},${g},${b})`;
      });

    setColorPalette(rgbList);
  };

  return (
    <div>
      <button onClick={() => setIsOpenContents(!isOpenContents)}>
        プリセットパレット
      </button>

      {isOpenContents && (
        <div>
          {paletteFiles.map((file) => {
            const name = file.replace(".pal", ""); // .palを削除した表示名
            return (
              <div key={file}>
                <button onClick={() => loadPalette(file)}>{name}</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectPrePalette;
