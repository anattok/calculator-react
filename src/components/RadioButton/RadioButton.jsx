import React, { useState } from "react";
import s from "./RadioButton.module.scss";

export const RadioButton = ({ id, name, value, text, checked, onChange }) => {
  return (
    <>
      <label className={s.label}>
        <input
          className={s.input}
          type="radio"
          id={id}
          name={name}
          checked={checked}
          value={value}
          onChange={onChange}
        />
        <span className={s.span}>{text}</span>
      </label>
    </>
  );
};
