import React from "react";
import style from "../util.module.css";

type Props = {
  name: string;
  min: number;
  max: number;
  value: number;
  step: number;
  unit: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const InputRange: React.FC<Props> = ({
  name,
  min,
  max,
  step,
  value,
  unit,
  setValue,
}) => {
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
    <>
      <div>
        <label htmlFor={name} style={label}>
          <p className="ml-12">▼{name}</p>

          <input
            id={name}
            type="number"
            value={Math.pow(2, value)}
            onChange={(e) => {
              const raw = parseFloat(e.target.value);
              const exponent = Math.log2(raw);
              setValue(exponent);
              alert(exponent);
            }}
            style={numberInput}
          />

          {unit}

          <input
            id={name}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            className={style.slider}
          />
        </label>
      </div>
    </>
  );
};

export default InputRange;
