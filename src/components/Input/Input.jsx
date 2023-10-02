import React, { useState, useEffect } from "react";
import s from "./Input.module.scss";

export const Input = ({
  label,
  list,
  initValue,
  type,
  className,
  setFunction,
}) => {
  const [listOpen, isListOpen] = useState(false); // открытие/закрытие списка
  const [inputValue, setInputValue] = useState(initValue);
  const [selectedItem, setSelectedItem] = useState(list && list[0].text);

  // Проверяем, что list существует и является массивом
  const renderedList =
    listOpen && list && Array.isArray(list) ? (
      <ul className={s.list}>
        {list.map((item, index) => (
          <li
            data-variant={item.value}
            key={index}
            onClick={() => {
              setSelectedItem(item.text);
              setFunction && setFunction(item.value);
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    ) : null;

  const inputClassNames = [s.input, className].join(" ");

  useEffect(() => {
    console.log(list && list[0].text);
  }, [list]);

  return (
    <label
      style={label ? { padding: "28px 16px 10px" } : { padding: "22px 16px" }}
      className={inputClassNames}
      onClick={() => isListOpen(!listOpen)}
    >
      {label && <span>{label}</span>}
      {list ? (
        <>
          <p>{selectedItem}</p>
          {renderedList}
        </>
      ) : (
        <input
          type={type === "date" ? "date" : type}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      )}
    </label>
  );
};
