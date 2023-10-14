import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    monthlyPayment: '20000',
    creditTerm: '12',
    yearOrMonth: "month",
    procent: '10',
}

export const calculationMaximumLoanAmountSlice = createSlice({
    name: 'calcMaximumLoanAmount',
    initialState,
    reducers: {
        changeMaximumMonthlyPayment: (state, action) => {
            state.monthlyPayment = action.payload
        },
        changeMaximumCreditTerm: (state, action) => {
            state.creditTerm = action.payload
        },
        changeMaximumYearOrMonth: (state, action) => {
            state.yearOrMonth = action.payload
        },
        changeMaximumProcent: (state, action) => {
            state.procent = action.payload
        },
    },
})

export const { changeMaximumMonthlyPayment, changeMaximumCreditTerm, changeMaximumYearOrMonth, changeMaximumProcent } = calculationMaximumLoanAmountSlice.actions
export default calculationMaximumLoanAmountSlice