import React, { useState } from "react";
import s from "./Input.module.scss";

export const Input = ({ list, input, date, initialValue, label, type }) => {
  // Используйте initialValue из пропсов для установки начального значения состояния
  const [inputValue, setInputValue] = useState(initialValue);

  // Функция обратного вызова для обновления значения <input>
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <label className={s.input}>
      <span>{label}</span>
      {/* сделать условный рендеринг */}
      <input type={type} value={inputValue} onChange={handleInputChange} />
      <p>Месяцев</p>
      <ul></ul>
    </label>
  );
};
