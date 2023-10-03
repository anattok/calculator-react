import React from "react";
import s from "./Button.module.scss";

export const Button = ({ text, className, onClick }) => {
  const innerClassNames = [s.button, className].join(" ");

  return (
    <button onClick={onClick} className={innerClassNames}>
      {text}
    </button>
  );
};
