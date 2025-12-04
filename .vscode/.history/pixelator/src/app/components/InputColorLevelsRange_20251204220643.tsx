import React from "react";
import style from "../util.module.css";

type Props = {
  name: string;
  steps: number[]; // ← 追加（指数ステップ対応）
  value: number;
  unit: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const InputColorLevelsRange: React.FC<Props> = ({
  name,
  steps,
  value,
  unit,
  setValue,
}) => {
  const index = steps.indexOf(value);

  const label: React.CSSProperties = {
    position: "relative",
    fontSize: "16px",
    fontWeight: "bold",
    color: " black",
    userSelect: "none",
  };

  const numberInput: React.CSSProperties = {
    padding: "5px",
    marginLeft: "3rem",
    marginRight: "1rem",
    marginTop: "1rem",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    display: "inline",
    textAlign: "center",
  };

  return (
    <label htmlFor={name} style={label}>
      <p className="ml-12">▼{name}</p>

      {/* 数値入力（直接入力用） */}
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const parsed = parseInt(e.target.value, 10);
          const nearest = steps.reduce((prev, curr) =>
            Math.abs(curr - parsed) < Math.abs(prev - parsed) ? curr : prev
          );
          setValue(nearest);
        }}
        style={numberInput}
      />
      {unit}

      {/* スライダー（インデックスを動かす） */}
      <input
        type="range"
        min={0}
        max={steps.length - 1}
        step={1}
        value={index}
        onChange={(e) => {
          const newIndex = parseInt(e.target.value, 10);
          setValue(steps[newIndex]);
        }}
        className={style.slider}
      />
    </label>
  );
};

export default InputColorLevelsRange;
