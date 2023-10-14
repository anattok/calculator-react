import React, { useState, useEffect, useRef } from "react";
import s from "./Input.module.scss";

export const Input = ({
  label,
  list,
  value,
  type,
  className,
  setFunction,
  onChange,
}) => {
  const [listOpen, isListOpen] = useState(false); // открытие/закрытие списка
  const [inputValue, setInputValue] = useState(value);

  // TODO: переписать чтобы объекты со свойствами листа хранились в компоненте
  const [selectedItem, setSelectedItem] = useState(list && list[0].text);
  const inputClassNames = [s.input, className].join(" ");
  const inputRef = useRef(null);

  // Эффект для обновления inputValue при изменении value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  //закрываем список по клику вне списка
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        isListOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  return (
    <label
      ref={inputRef}
      style={label ? { padding: "28px 16px 10px" } : { padding: "22px 16px" }}
      className={inputClassNames}
      onClick={() => isListOpen(!listOpen)}
    >
      {label && <span>{label}</span>}
      {list ? (
        <>
          <p>{selectedItem}</p>
          <i
            style={
              listOpen
                ? {
                    transform: "rotate(180deg)",
                  }
                : {}
            }
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m4 7 6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </i>
          {renderedList}
        </>
      ) : (
        <input
          type={type === "date" ? "date" : type}
          value={inputValue}
          onChange={onChange}
        />
      )}
    </label>
  );
};
