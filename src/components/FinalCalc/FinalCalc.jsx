import React from "react";
import s from "./FinalCalc.module.scss";

export const FinalCalc = ({ title, count, procent, total }) => {
  return (
    <div className={s.final}>
      <p className={s.final__title}>{title}</p>
      <span className={s.final__count}>{count} ₽</span>
      <div className={s.final__row}>
        <span>Начисленные проценты</span>
        <span>{procent} ₽</span>
      </div>
      <div className={s.final__row}>
        <span>Общая выплата</span>
        <span>{total} ₽</span>
      </div>
    </div>
  );
};
