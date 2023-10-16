//calculatePayment  Расчет ежемесячного платежа

// summ => СУММА КРЕДИТА
// rate => СТАВКА
// monthOrYear => МЕСЯЦЕВ ИЛИ ЛЕТ
// term => КОЛИЧЕСТВО (МЕСЯЦЕВ ИЛИ ЛЕТ)
// startDate => ДАТА
// typePayment => ТИП ПЛАТЕЖА (АНУИТЕТНЫЙ ИЛИ ДИФФЕРЕНЦИРОВАННЫЙ)
// Создаем массив для хранения платежей


export const calculationMonthlyPayment = (summ, term, monthOrYear, rate, startDate, typePayment) => {
    // Переводим годы в месяцы
    let monthCount;

    const result = [];

    if (monthOrYear === "year") {
        monthCount = term * 12;
    } else if (monthOrYear === "month") {
        monthCount = term;
    }

    //Если тип платежа ануитентный
    if (typePayment === 'annuity') {

        // Преобразование годовой процентной ставки в месячную и вычисление месячной ставки
        const monthlyInterestRate = (rate / 100) / 12;

        // Вычисление аннуитетного коэффициента
        const annuityFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, monthCount)) /
            (Math.pow(1 + monthlyInterestRate, monthCount) - 1);

        // Рассчитываем аннуитетный платеж
        const annuityPayment = summ * annuityFactor;

        //Начисленные проценты
        let interestCharges = 0;
        //Общая выплата
        let totalPayout = 0;


        // Итерируемся через каждый месяц и рассчитываем платежи
        let balance = summ;
        for (let i = 1; i <= monthCount; i++) {
            //Выплата процентов
            const interestPayment = balance * monthlyInterestRate;
            //основной платеж
            const principalPayment = annuityPayment - interestPayment;
            balance = balance - principalPayment;

            const paymentDate = new Date(startDate);
            paymentDate.setMonth(paymentDate.getMonth() + i);

            const payment = {
                id: i,
                date: paymentDate.toISOString(),
                summ: annuityPayment.toFixed(2),
                debt: principalPayment.toFixed(2),
                procent: interestPayment.toFixed(2),
                balance: balance.toFixed(2),
            };
            result.push(payment);

            interestCharges += Number(interestPayment.toFixed(2));
            totalPayout += Number(annuityPayment);
        }



        console.log("Ежемесячный платеж", annuityPayment.toFixed(2))
        console.log("Начисленные проценты", interestCharges.toFixed(2))
        console.log("Общая выплата", totalPayout.toFixed(2))

    }
    // //Если тип платежа дифференцированный
    // if (typePayment = 'differentiated') {

    // }

}

