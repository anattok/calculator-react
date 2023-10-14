import { configureStore } from '@reduxjs/toolkit'
import { typeCalculationSlice } from "./reducers/typeCalculation"
import { calculationMonthlyPaymentSlice } from "./reducers/calculationMonthlyPayment"
import { calculationMaximumLoanAmountSlice } from "./reducers/calculationMaximumLoanAmount"
import { calculationLoanTermSlice } from "./reducers/calculationLoanTerm"

export const store = configureStore({
    reducer: {
        typeCalc: typeCalculationSlice.reducer,
        calcMonthlyPayment: calculationMonthlyPaymentSlice.reducer,
        calcMaximumLoanAmount: calculationMaximumLoanAmountSlice.reducer,
        calcLoanTerm: calculationLoanTermSlice.reducer,
    },
})