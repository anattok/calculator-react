import React, { useState } from "react";
import s from "./Input.module.scss";

export const Input = ({
  label,
  list,
  initialValue,
  type,
  className,
  typeChange,
}) => {
  const [inputValue, setInputValue] = useState(initialValue); // initialValue из пропсов для установки начального значения состояния
  const [isListOpen, setIsListOpen] = useState(false); // Состояние для открытия/закрытия списка list
  const [selectedItem, setSelectedItem] = useState(null); // Состояние для хранения выбранного элемента из списка list
  const [selectedTypeCalculation, setSelectedTypeCalculation] =
    useState("monthly-payment"); // Тип выбраннго рассчета платежа

  // Обновяление значения input value
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Меняем значение isListOpen при каждом клике
  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  //  Выбираем значение из выпадаюцего списка и закрываем список
  const handleItemClick = (item, type) => {
    setSelectedItem(item);
    setIsListOpen(false);
    setSelectedTypeCalculation(type);
    typeChange(selectedTypeCalculation);
  };

  // Проверяем, что list существует и является массивом
  const renderedList =
    isListOpen && list && Array.isArray(list) ? (
      <ul className={s.list}>
        {list.map((item, index) => (
          <li
            data-variant={item.value}
            key={index}
            onClick={() => handleItemClick(item, item.value)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    ) : null;

  const inputClassNames = [s.input, className].join(" "); // Объединяем классы в строку если приходят доп.класс через пропс

  return (
    <label className={inputClassNames} onClick={toggleList}>
      {label && <span>{label}</span>}
      {list ? (
        <>
          <p>{selectedItem ? selectedItem.text : list[0].text}</p>
          {renderedList}
        </>
      ) : (
        <input
          type={type === "date" ? "date" : type}
          value={inputValue}
          onChange={handleInputChange}
        />
      )}
    </label>
  );
};
