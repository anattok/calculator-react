import React, { useState, useEffect } from "react";
import "./styles/global.css";
import { Input } from "../../components/Input/Input";
import { RadioButton } from "../../components/RadioButton/RadioButton";
import { Container } from "../../layout/Container/Container";

function App() {
  const [typeCalc, setTypeCalc] = useState("monthly-payment");
  const [selectedOption, setSelectedOption] = useState("annuity");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
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

  const termOptions = [
    {
      value: "year",
      text: "Лет",
    },
    {
      value: "month",
      text: "Месяцев",
    },
  ];

  return (
    <div className="App">
      <Container>
        <h1>Кредитный калькулятор</h1>
        <form className="form" action="#">
          <div className="wrapper">
            <div className="wrapper__top">
              {/* TODO: сделать рендер компонентов input по условию  typeCalculation */}
              <Input
                className="calculation-option"
                label="Вариант расчета"
                list={variantsOptions}
                setFunction={setTypeCalc}
              />

              {/* Расчет ежемесячного платежа */}

              {typeCalc === "monthly-payment" && (
                <>
                  <Input
                    className="sum-credit"
                    label="Сумма кредита"
                    initValue="500000"
                    type="text"
                  />
                  <Input
                    className="credit-term-small"
                    label="Срок кредита"
                    initValue="5"
                    type="text"
                  />
                  <Input
                    className="credit-term-list-small"
                    list={termOptions}
                  />
                  <Input
                    className="count-procent-small"
                    label="Ставка"
                    initValue="5"
                    type="text"
                  />
                  <Input
                    className="start-date-small"
                    label="Начало выплат"
                    type="date"
                  />
                  <div className="wrapper-bottom">
                    <div className="question">
                      Тип платежей{" "}
                      <span
                        data-qa="Icon"
                        class="_17sy1wp _18zu2v3 _g18kgu shape-round"
                        tabindex="0"
                      >
                        <svg
                          data-qa="Tooltip"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 17.25A7.25 7.25 0 0 1 2.75 10 7.25 7.25 0 0 1 10 2.75 7.25 7.25 0 0 1 17.25 10 7.25 7.25 0 0 1 10 17.25Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M10 11.042v-.209c0-.68.42-1.05.842-1.333.412-.277.825-.64.825-1.306a1.666 1.666 0 1 0-3.334 0"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M9.997 13a.75.75 0 1 0 .007 1.5.75.75 0 0 0-.007-1.5Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="radio-wrapper ">
                      <RadioButton
                        id="annuity"
                        name="typeCredit"
                        value="annuity"
                        text="Аннуитетный"
                        checked={selectedOption === "annuity"}
                        onChange={handleOptionChange}
                      />
                      <RadioButton
                        id="differentiated"
                        name="typeCredit"
                        value="differentiated"
                        text="Дифференцированый"
                        checked={selectedOption === "differentiated"}
                        onChange={handleOptionChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Расчет максимальной суммы кредита */}

              {typeCalc === "maximum-loan-amount" && (
                <>
                  <Input
                    className="monthly-payment"
                    label="Ежемесячный платеж"
                    initValue="20000"
                    type="text"
                  />
                  <Input
                    className="credit-term-small"
                    label="Срок кредита"
                    initValue="12"
                    type="text"
                  />
                  <Input
                    className="credit-term-list-small"
                    list={termOptions}
                  />
                  <Input
                    className="count-procent-small"
                    label="Ставка"
                    initValue="10"
                    type="text"
                  />
                  <Input
                    className="start-date-small"
                    label="Начало выплат"
                    type="date"
                  />
                </>
              )}

              {/* Расчет срока кредита */}

              {typeCalc === "credit-term" && (
                <>
                  <Input
                    className="credit-term"
                    label="Сумма кредита"
                    initValue="1000000"
                    type="text"
                  />
                  <Input
                    className="monthly-payment-small"
                    label="Ежемесячный платеж"
                    initValue="20000"
                    type="text"
                  />
                  <Input
                    className="count-procent-small-term"
                    label="Ставка"
                    initValue="10"
                    type="text"
                  />
                  <Input
                    className="start-date-small-term"
                    label="Начало выплат"
                    type="date"
                  />
                </>
              )}
            </div>
          </div>
          <div className="calculation"></div>
        </form>
      </Container>
    </div>
  );
}

export default App;
