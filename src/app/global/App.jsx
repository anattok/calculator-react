import React, { useState } from "react";
import "./styles/global.css";
import { Input } from "../../components/Input/Input";
import { Container } from "../../layout/Container/Container";

function App() {
  const [typeCalculation, setTypeCalculation] = useState("monthly-payment");

  // Функция обратного вызова для обновления значения в родительском компоненте
  const handleTypeCalculation = (newValue) => {
    setTypeCalculation(newValue);
  };

  const variantsOptions = [
    {
      value: "monthly-payment",
      text: "Расчет ежемесячного платежа",
    },
    {
      value: "maximum-loan-amount",
      text: "Расчет максимальной суммы кредита",
    },
    {
      value: "credit-term",
      text: "Расчет срока кредита",
    },
  ];

  const monthOrYearOptions = [
    {
      value: "year",
      text: "Лет",
    },
    {
      value: "month",
      text: "Месяцев",
    },
  ];

  //добавляем класс к .wrapper__top чтобы менять grid сетку
  const wrapperTopClassName = ["wrapper__top"];

  if (typeCalculation === "monthly-payment") {
    wrapperTopClassName.push("option-monthly");
  } else if (typeCalculation === "maximum-loan-amount") {
    wrapperTopClassName.push("option-maximum");
  } else if (typeCalculation === "credit-term") {
    wrapperTopClassName.push("option-term");
  }

  return (
    <div className="App">
      <Container>
        <h1>Кредитный калькулятор</h1>
        <form className="form" action="#">
          <div className="wrapper">
            <div className={wrapperTopClassName.join(" ")}>
              {/* TODO: сделать рендер компонентов input по условию  typeCalculation */}
              <Input
                className="calculation-option"
                label="Вариант расчета"
                list={variantsOptions}
                typeChange={handleTypeCalculation}
              />
              <Input
                className="sum-credit"
                label="Сумма кредита"
                initialValue="1000000"
                type="text"
              />
              <Input
                className="count-procent"
                label="Ставка"
                initialValue="10"
                type="text"
              />
              <Input className="start-date" label="Начало выплат" type="date" />
              <Input className="month-or-year" list={monthOrYearOptions} />
              <Input
                className="credit-term"
                label="Срок кредита"
                initialValue="12"
                type="text"
              />
            </div>
            <div className="wrapper__bottom"></div>
          </div>
          <div className="calculation"></div>
        </form>
      </Container>
    </div>
  );
}

export default App;
