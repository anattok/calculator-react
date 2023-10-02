import React, { useState, useEffect } from "react";
import "./styles/global.css";
import { Input } from "../../components/Input/Input";
import { Container } from "../../layout/Container/Container";

function App() {
  const [typeCalc, setTypeCalc] = useState("monthly-payment");
  const [typeTerm, setTypeTerm] = useState("year");
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
                    setFunction={setTypeTerm}
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
                    initValue="5"
                    type="text"
                  />
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
                    list={setTypeTerm}
                    typeCalc={setTypeCalc}
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
                </>
              )}
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
