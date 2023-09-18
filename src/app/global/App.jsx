import React from "react";
import "./styles/global.css";
import { Input } from "../../components/Input/Input";
import { Container } from "../../layout/Container/Container";

function App() {
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

  return (
    <div className="App">
      <Container>
        <h1>Кредитный калькулятор</h1>
        <form className="form" action="#">
          <div className="wrapper">
            <div className="wrapper__top">
              <Input
                className="calculation-option"
                label="Вариант расчета"
                list={variantsOptions}
              />
              <Input label="Сумма кредита" initialValue="1000000" type="text" />
              <Input label="Ставка" initialValue="10" type="text" />
              <Input label="Начало выплат" type="date" />
              <Input list={monthOrYearOptions} />
              <Input label="Срок кредита" initialValue="12" type="text" />
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
