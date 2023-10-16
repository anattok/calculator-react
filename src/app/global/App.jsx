import React, { useState, useCallback, useEffect } from "react";
import "./styles/global.css";

import { Input } from "../../components/Input/Input";
import { RadioButton } from "../../components/RadioButton/RadioButton";
import { Button } from "../../components/Button/Button";
import { FinalCalc } from "../../components/FinalCalc/FinalCalc";
import { Container } from "../../layout/Container/Container";

import { variantsOptions, termOptions } from "../../lib/data";
import { calculationMonthlyPayment } from "../../lib/calcFunctions";

import { changeTypeCalculation } from "../../store/reducers/typeCalculation";
import {
  changeMonthAmountOfCredit,
  changeMonthProcent,
  changeMonthCreditTerm,
  changeMonthYearOrMonth,
} from "../../store/reducers/calculationMonthlyPayment";
import {
  changeMaximumMonthlyPayment,
  changeMaximumCreditTerm,
  changeMaximumYearOrMonth,
  changeMaximumProcent,
} from "../../store/reducers/calculationMaximumLoanAmount";
import {
  changeTermMonthlyPayment,
  changeTermAmountOfCredit,
  changeTermProcent,
} from "../../store/reducers/calculationLoanTerm";
import { useSelector, useDispatch } from "react-redux";

function App() {
  //выбор варианта рассчета сохранятся в редаксе
  const dispatch = useDispatch();
  const typeCalculation = useSelector(
    (state) => state.typeCalc.calculationOption
  );

  const handleChangeTypeCalculation = (newOption) => {
    dispatch(changeTypeCalculation(newOption));
  };

  //ФУНКЦИИ ДЛЯ MonthlyPayment
  //Сумма кредита
  const sumCreditMonthlyPayment = useSelector(
    (state) => state.calcMonthlyPayment.amountOfCredit
  );

  const handleSumCreditMonthlyPayment = (e) => {
    dispatch(changeMonthAmountOfCredit(e.target.value));
  };
  //Срок кредита
  const termCreditMonthlyPayment = useSelector(
    (state) => state.calcMonthlyPayment.creditTerm
  );

  const handleTermCreditMonthlyPayment = (e) => {
    dispatch(changeMonthCreditTerm(e.target.value));
  };

  //Лет или месяцев
  const yearOrMonthMonthlyPayment = useSelector(
    (state) => state.calcMonthlyPayment.yearOrMonth
  );
  const handleYearOrMonthMonthlyPayment = (newOption) => {
    dispatch(changeMonthYearOrMonth(newOption));
  };
  //Ставка
  const procentCreditMonthlyPayment = useSelector(
    (state) => state.calcMonthlyPayment.procent
  );

  const handleProcentCreditMonthlyPayment = (e) => {
    dispatch(changeMonthProcent(e.target.value));
  };

  //ануитентный или дифференцированный
  const [selectedOption, setSelectedOption] = useState("annuity");
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  //ФУНКЦИИ ДЛЯ Calculation of the maximum loan amount
  //Ежемесячный платёж
  const sumMonthlyPayment = useSelector(
    (state) => state.calcMaximumLoanAmount.monthlyPayment
  );

  const handleSumMonthlyPayment = (e) => {
    dispatch(changeMaximumMonthlyPayment(e.target.value));
  };

  //Срок кредита
  const termCreditMaximumPayment = useSelector(
    (state) => state.calcMaximumLoanAmount.creditTerm
  );

  const handleTermCreditMaximumPayment = (e) => {
    dispatch(changeMaximumCreditTerm(e.target.value));
  };

  //Лет или месяцев
  const handleYearOrMonthMaximumPayment = (newOption) => {
    dispatch(changeMaximumYearOrMonth(newOption));
  };
  //Ставка
  const procentCreditMaximumPayment = useSelector(
    (state) => state.calcMaximumLoanAmount.procent
  );

  const handleProcentCreditMaximumPayment = (e) => {
    dispatch(changeMaximumProcent(e.target.value));
  };

  //ФУНКЦИИ для Loan term calculation / Расчет срока кредита
  //Сумма кредита
  const sumMonthlyPaymentTerm = useSelector(
    (state) => state.calcLoanTerm.monthlyPayment
  );

  const handleSumMonthlyPaymentTerm = (e) => {
    dispatch(changeTermMonthlyPayment(e.target.value));
  };

  //Ежемесячный платёж
  const amountOfCreditTerm = useSelector(
    (state) => state.calcLoanTerm.amountOfCredit
  );

  const handleAmountOfCreditTerm = (e) => {
    dispatch(changeTermAmountOfCredit(e.target.value));
  };

  //Ставка
  const procentCreditTerm = useSelector((state) => state.calcLoanTerm.procent);

  const handleProcentCreditTerm = (e) => {
    dispatch(changeTermProcent(e.target.value));
  };

  // TODO: пофиксить на второй клик должен быть перерасчет
  //функция рассчета
  const [showTotal, setShowTotal] = useState(false);

  const calculation = () => {
    setShowTotal(!showTotal);
    if (typeCalculation === "monthly-payment") {
      calculationMonthlyPayment(
        sumCreditMonthlyPayment,
        termCreditMonthlyPayment,
        yearOrMonthMonthlyPayment,
        procentCreditMonthlyPayment,
        "15-10-2023",
        selectedOption
      );
    }
  };
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    console.log(
      sumCreditMonthlyPayment,
      termCreditMonthlyPayment,
      yearOrMonthMonthlyPayment,
      procentCreditMonthlyPayment,
      "15-10-2023",
      selectedOption
    );
  }, [selectedOption]);

  return (
    <div className="App">
      <Container>
        <h1>Кредитный калькулятор</h1>
        <form className="form" action="#">
          <div className="wrapper">
            <Input
              className="calculation-option"
              label="Вариант расчета"
              list={variantsOptions}
              setFunction={handleChangeTypeCalculation}
            />

            {/* Расчет ежемесячного платежа */}

            {typeCalculation === "monthly-payment" && (
              <>
                <Input
                  className="sum-credit"
                  label="Сумма кредита"
                  value={sumCreditMonthlyPayment}
                  onChange={handleSumCreditMonthlyPayment}
                  type="text"
                />
                <Input
                  className="credit-term-small"
                  label="Срок кредита"
                  value={termCreditMonthlyPayment}
                  onChange={handleTermCreditMonthlyPayment}
                  type="text"
                />
                <Input
                  className="credit-term-list-small"
                  setFunction={handleYearOrMonthMonthlyPayment}
                  list={termOptions}
                />
                <Input
                  className="count-procent-small"
                  label="Ставка"
                  value={procentCreditMonthlyPayment}
                  onChange={handleProcentCreditMonthlyPayment}
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
                    <span>
                      <svg
                        data-qa="Tooltip"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 17.25A7.25 7.25 0 0 1 2.75 10 7.25 7.25 0 0 1 10 2.75 7.25 7.25 0 0 1 17.25 10 7.25 7.25 0 0 1 10 17.25Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M10 11.042v-.209c0-.68.42-1.05.842-1.333.412-.277.825-.64.825-1.306a1.666 1.666 0 1 0-3.334 0"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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

            {typeCalculation === "maximum-loan-amount" && (
              <>
                <Input
                  className="monthly-payment"
                  label="Ежемесячный платеж"
                  value={sumMonthlyPayment}
                  onChange={handleSumMonthlyPayment}
                  type="text"
                />
                <Input
                  className="credit-term-small"
                  label="Срок кредита"
                  value={termCreditMaximumPayment}
                  onChange={handleTermCreditMaximumPayment}
                  type="text"
                />
                {/* TODO: НАЧАЛЬНОЕ ЗНАЧЕНИЕ СПИСКА */}
                <Input
                  className="credit-term-list-small"
                  list={termOptions}
                  setFunction={handleYearOrMonthMaximumPayment}
                />
                <Input
                  className="count-procent-small"
                  label="Ставка"
                  value={procentCreditMaximumPayment}
                  onChange={handleProcentCreditMaximumPayment}
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

            {typeCalculation === "credit-term" && (
              <>
                <Input
                  className="credit-term"
                  label="Сумма кредита"
                  value={amountOfCreditTerm}
                  onChange={handleAmountOfCreditTerm}
                  type="text"
                />
                <Input
                  className="monthly-payment-small"
                  label="Ежемесячный платеж"
                  value={sumMonthlyPaymentTerm}
                  onChange={handleSumMonthlyPaymentTerm}
                  type="text"
                />
                <Input
                  className="count-procent-small-term"
                  label="Ставка"
                  value={procentCreditTerm}
                  onChange={handleProcentCreditTerm}
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
          <div className="calculation">
            {showTotal ? (
              <FinalCalc
                title="Максимальная сумма кредита"
                count="227 490,17"
                procent="12 509,83"
                total="240 000,00"
              />
            ) : (
              <div className="calculation__picture">
                <svg
                  width="176"
                  height="111"
                  viewBox="0 0 176 111"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_524_61106)">
                    <path
                      d="M105.767 31.8724C109.135 40.5321 122.004 40.7333 128.018 39.7514C134.753 24.8865 124.42 18.2823 118.412 16.8383C114.09 16.2971 110.245 17.0951 107.707 19.1226C104.603 21.6014 103.452 25.9181 105.767 31.8724Z"
                      fill="#00AFFF"
                    ></path>
                    <ellipse
                      rx="10.2232"
                      ry="12.2376"
                      transform="matrix(-0.912373 -0.40936 -0.40936 0.912373 152.405 29.9295)"
                      fill="#00AFFF"
                    ></ellipse>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M122.884 62.4647H154.387L149.855 89.2696C149.649 90.4874 148.599 91.3785 147.369 91.3785H130.406C129.193 91.3785 128.153 90.5118 127.928 89.3152L122.884 62.4647Z"
                      fill="#002A3A"
                    ></path>
                    <path
                      d="M154.387 62.4647V62.4647C155.587 62.4647 156.56 61.4825 156.56 60.2826V60.2826M154.387 62.4647H122.884M154.387 62.4647L149.855 89.2696M154.387 62.4647C155.587 62.4647 156.56 61.4878 156.56 60.2826M122.884 62.4647V62.4647C121.684 62.4647 120.711 61.4825 120.711 60.2826V60.2826M122.884 62.4647C121.684 62.4647 120.711 61.4877 120.711 60.2826M122.884 62.4647L127.928 89.3152M156.56 60.2826V57.3601M156.56 57.3601C156.56 55.9612 155.43 54.8271 154.038 54.8271M156.56 57.3601V57.3601C156.56 55.9673 155.43 54.8271 154.038 54.8271V54.8271M154.038 54.8271H123.233M123.233 54.8271C121.84 54.8271 120.711 55.9612 120.711 57.3601M123.233 54.8271V54.8271C121.84 54.8271 120.711 55.9673 120.711 57.3601V57.3601M120.711 57.3601V60.2826M127.928 89.3152C128.153 90.5118 129.193 91.3785 130.406 91.3785M127.928 89.3152V89.3152C128.152 90.5066 129.194 91.3785 130.406 91.3785V91.3785M130.406 91.3785H147.369M147.369 91.3785C148.599 91.3785 149.649 90.4874 149.855 89.2696M147.369 91.3785V91.3785C148.598 91.3785 149.65 90.482 149.855 89.2696V89.2696"
                      stroke="#002A3A"
                    ></path>
                    <path
                      d="M167.708 51.1163C165.703 49.3122 160.732 45.8242 156.883 46.3053C153.035 46.7864 149.881 50.2581 147.773 54.827"
                      stroke="#002A3A"
                    ></path>
                    <path
                      d="M170.715 57.7314C165.928 57.7314 165.496 54.4231 166.06 51.9216C166.27 50.9916 166.966 50.2129 167.903 50.0403C173.29 49.0488 177.366 57.7314 170.715 57.7314Z"
                      fill="#002A3A"
                    ></path>
                    <path
                      d="M128.72 2.83737C125.089 5.67607 129.272 9.43742 132.19 10.7978C133.054 11.2007 134.082 11.054 134.751 10.3741C138.592 6.4655 133.96 -1.25917 128.72 2.83737Z"
                      fill="#002A3A"
                    ></path>
                    <path
                      d="M158.087 19.2437C154.679 24.8564 146.091 42.448 143.204 54.4754"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M161.479 33.6767H150.87M153.275 27.663L149.066 19.8452"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M137.932 54.8269C138.333 46.0069 138.121 21.5289 132.829 9.02051"
                      stroke="#002A3A"
                    ></path>
                    <path
                      d="M133.715 54.4756C133.012 50.961 130.938 44.43 128.018 39.7515C127.29 38.5852 126.49 37.3834 125.613 36.1608M107.707 19.1227C111.609 21.7239 115.476 24.7175 118.412 27.663M118.412 27.663V16.8384M118.412 27.663C121.228 30.4867 123.617 33.3774 125.613 36.1608M125.613 36.1608C123.207 35.9341 116.833 35.8416 110.579 37.2849"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.5498 91.6978H155.953"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M24.9748 48.3082C25.2338 59.7682 25.5542 63.8227 29.3062 72.5534C30.0152 74.203 30.3852 75.0139 31.6807 77.2757C30.3065 77.9309 28.5192 81.681 28.5207 85.1433C28.5225 89.4712 31.4803 91.8331 34.4547 91.8344L48.6895 91.8403C48.2952 94.3319 48.8509 99.3945 54.2286 99.7115C58.3429 99.954 59.4773 95.6049 59.5465 91.8447L64.1105 91.7174C60.8486 98.963 61.9049 108.473 65.6994 108.765C70.8399 109.161 70.753 104.046 71.2303 97.3578C71.5447 92.9513 74.7866 91.8511 77.1591 91.852L131.33 91.8746C138.052 91.8774 143.587 88.7322 143.584 82.0436C143.581 75.355 139.402 72.5991 136.324 71.4175C135.005 51.7422 119.012 42.5447 108.938 40.4619L108.933 40.4608C104.268 39.4596 91.9589 36.8177 79.0217 46.1085C78.6149 44.8385 76.8404 39.8047 73.4548 36.8618C73.446 36.8624 73.0439 36.3615 72.8886 34.7722C72.8672 34.6058 72.8493 34.3683 72.8274 34.0781C72.4725 29.6028 71.7502 23.554 69.6603 22.7088C67.4684 21.8092 63.2272 28.5071 59.7814 34.4389L59.4977 34.9197C58.219 34.9344 48.619 35.1472 43.8556 37.7448C42.934 35.8937 36.6324 23.4998 32.9823 23.769L32.9204 23.7735C29.0429 24.2099 24.7302 37.5105 24.9748 48.3082Z"
                      fill="white"
                    ></path>
                    <path
                      d="M132.907 80.0719C133.304 84.0065 122.232 83.6085 119.069 83.6071C119.069 83.6071 82.5158 83.5919 75.574 83.589C69.8323 83.5866 66.1376 87.2147 64.1105 91.7174M36.8222 80.032C40.249 79.9022 48.21 79.8793 52.639 80.8254C57.068 81.7716 58.9679 86.4675 59.3643 88.6972C59.4885 89.5908 59.5678 90.69 59.5465 91.8447M59.5465 91.8447C59.4773 95.6049 58.3429 99.954 54.2286 99.7115C48.8509 99.3945 48.2952 94.3319 48.6895 91.8403C43.8128 91.8383 35.0874 91.8346 34.4547 91.8343C31.4803 91.8331 28.5225 89.4712 28.5207 85.1433C28.5192 81.681 30.3065 77.9309 31.6807 77.2757C30.3852 75.0139 30.0152 74.203 29.3062 72.5534C25.5542 63.8227 25.2338 59.7682 24.9748 48.3082C24.7302 37.5105 29.0429 24.2099 32.9204 23.7735C32.9381 23.7722 32.9558 23.7709 32.9823 23.769C36.6324 23.4998 42.934 35.8937 43.8556 37.7448C48.619 35.1472 58.219 34.9344 59.4977 34.9197L59.7814 34.4389C63.2272 28.5071 67.4684 21.8092 69.6603 22.7088C71.7502 23.554 72.4725 29.6028 72.8274 34.0781C72.8493 34.3683 72.8672 34.6058 72.8886 34.7722C73.0439 36.3615 73.446 36.8624 73.4549 36.8618C76.8404 39.8047 78.6149 44.8385 79.0217 46.1085C91.9635 36.8144 104.276 39.4615 108.938 40.4619C119.012 42.5447 135.005 51.7422 136.324 71.4175C139.402 72.5991 143.581 75.355 143.584 82.0436C143.587 88.7322 138.052 91.8774 131.33 91.8746L77.1591 91.852C74.7866 91.8511 71.5447 92.9513 71.2303 97.3578C70.753 104.046 70.8399 109.161 65.6994 108.765C61.9049 108.473 60.8486 98.963 64.1105 91.7174M59.5465 91.8447L64.1105 91.7174"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M116.415 63.4042C106.637 62.2043 86.8163 64.5578 85.7576 83.5704"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M57.9988 34.9667L57.9988 34.9956C59.7465 37.9055 68.7961 46.0349 78.567 44.8246C77.7768 42.7693 76.1124 39.1733 73.456 36.8646C73.4472 36.8652 73.045 36.3643 72.8899 34.7752C72.8685 34.6088 72.8506 34.3713 72.8287 34.0811C72.4741 29.6062 71.7522 23.5578 69.6621 22.7128C67.4703 21.8134 63.2284 28.5111 59.7822 34.4427L59.4984 34.9235C59.2598 34.9263 58.7314 34.9359 57.9988 34.9667Z"
                      fill="#002A3A"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M85.5571 42.5954C85.5571 42.5954 85.6848 42.9928 85.8489 43.5202C86.7035 46.2518 87.9995 48.8269 89.6937 51.1428C91.0801 53.0304 92.8417 54.9434 94.7894 55.9052C98.5828 57.7744 110.668 59.1647 109.481 48.6045C108.75 42.0876 106.118 40.177 106.118 40.177C106.118 40.177 95.7384 37.8295 85.5571 42.5954Z"
                      fill="#002A3A"
                    ></path>
                    <path
                      d="M63.9336 56.7871C63.9553 56.8385 64.5096 58.0706 64.8156 59.8955"
                      stroke="#002A3A"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M61.6747 56.0759L63.7091 56.89C63.737 56.9056 63.773 56.9118 63.8083 56.9092C63.8879 56.9033 63.9553 56.8541 63.9948 56.7893L64.9033 54.9267"
                      stroke="#002A3A"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M62.3702 62.4954C62.3784 62.4859 63.4013 61.9063 64.5457 59.6372C64.5846 59.5636 64.6527 59.5232 64.7322 59.5173C64.8118 59.5114 64.8858 59.5502 64.9265 59.618C64.9271 59.6268 65.4031 60.2816 67.1061 60.9431"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M30.1693 43.4999C30.1693 43.4999 32.4207 28.6782 34.1861 30.0003C35.9591 31.3178 39.6847 39.6951 39.6847 39.6951C39.6847 39.6951 34.1092 41.4935 30.1693 43.4999Z"
                      fill="#002A3A"
                    ></path>
                    <path
                      d="M71.3906 48.396C71.444 49.1123 70.9528 50.6494 69.4689 51.0601C67.985 51.4708 66.7044 50.5459 66.3498 49.8521"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M55.3652 52.165C55.4186 52.8813 54.9274 54.4184 53.4435 54.8291C51.9596 55.2398 50.679 54.3149 50.3244 53.6211"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.4812 84.233C7.68622 84.7639 6.69546 85.0765 5.62165 85.0706C3.04688 85.047 0.982316 83.1712 1.00011 80.8884C1.02384 78.8003 2.77991 77.0896 5.04619 76.8301L8.4812 84.233ZM7.50231 82.8822C6.9743 83.3187 6.26831 83.5842 5.49707 83.5724C3.88338 83.5547 2.59007 82.3631 2.60193 80.912C2.6138 79.5022 3.85372 78.3638 5.40215 78.3107"
                      fill="white"
                    ></path>
                    <path
                      d="M7.50231 82.8822C6.9743 83.3187 6.26831 83.5842 5.49707 83.5724C3.88338 83.5547 2.59007 82.3631 2.60193 80.912C2.6138 79.5022 3.85372 78.3638 5.40215 78.3107M8.4812 84.233C7.68622 84.7639 6.69546 85.0765 5.62165 85.0706C3.04688 85.047 0.982316 83.1712 1.00011 80.8884C1.02384 78.8003 2.77991 77.0896 5.04619 76.8301L8.4812 84.233Z"
                      stroke="#002A3A"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.6543 73.6035C4.6543 83.4486 12.6812 91.4296 22.5828 91.4296C32.4844 91.4296 40.5113 83.4486 40.5113 73.6035H22.5828H4.6543Z"
                      fill="white"
                      stroke="#002A3A"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.0854 79.016C17.0854 78.6208 16.7591 78.2964 16.3616 78.2964H12.4757C12.0783 78.2964 11.752 78.6208 11.752 79.016V83.9946C11.752 84.3898 12.0783 84.7142 12.4757 84.7142H16.3616C16.7591 84.7142 17.0854 84.3898 17.0854 83.9946V79.016Z"
                      fill="#0DD149"
                    ></path>
                    <path
                      d="M14.2363 73.4858V79.2369"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M71.1454 98.3184C70.2476 96.3168 68.7233 95 66.9941 95C64.6585 95 62.697 97.402 62.1475 100.649C62.0874 105.028 63.3796 108.576 65.6754 108.751C70.4262 109.115 70.7151 104.778 71.1104 98.8426C71.1219 98.6692 71.1336 98.4945 71.1454 98.3184Z"
                      fill="#002A3A"
                    ></path>
                    <path
                      d="M58.6136 78.5655C61.6145 77.314 66.7967 70.0409 67.0442 69.7047C66.6958 69.8577 58.1537 73.0935 56.7874 76.3671C56.5537 76.9384 56.5344 77.4825 56.744 77.9778C56.9395 78.4401 57.2514 78.6985 57.6769 78.7464C57.9553 78.7779 58.2691 78.7092 58.6136 78.5655Z"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M67.0509 69.6937C69.0837 69.5836 76.4374 69.6831 79.312 74.2129C79.8645 75.0769 79.7573 75.3389 79.6852 75.4078C78.8841 76.2386 71.5956 72.4095 67.0509 69.6937Z"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M71.8329 82.439C73.242 78.215 67.7563 69.6494 67.0355 69.7029C67.0437 75.3739 67.0572 84.78 62.88 89"
                      stroke="#002A3A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_524_61106">
                      <rect width="176" height="111" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <p className="calculation__picture-text">
                  Нажмите «Рассчитать», чтобы увидеть расчет, график платежей и
                  погашения
                </p>
              </div>
            )}

            <Button
              className="calculation__button"
              text="Рассчитать"
              onClick={calculation}
            />
          </div>
        </form>
        {showTotal && (
          <div className="accordeon">
            <div
              onClick={() => setShowList(!showList)}
              className="accordeon__top"
            >
              <span>
                <svg
                  width="24"
                  height="24"
                  data-qa="CalendarSimple"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2.75"
                    y="3.75"
                    width="14.5"
                    height="13.5"
                    rx="1.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  ></rect>
                  <rect
                    x="2"
                    y="7.5"
                    width="16"
                    height="1.5"
                    rx=".75"
                    fill="currentColor"
                  ></rect>
                  <rect
                    x="6"
                    y="2"
                    width="1.5"
                    height="4"
                    rx=".75"
                    fill="currentColor"
                  ></rect>
                  <rect
                    x="12.5"
                    y="2"
                    width="1.5"
                    height="4"
                    rx=".75"
                    fill="currentColor"
                  ></rect>
                </svg>
              </span>
              <h2 className="accordeon__title">График платежей</h2>
              <i
                style={
                  showList
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
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
