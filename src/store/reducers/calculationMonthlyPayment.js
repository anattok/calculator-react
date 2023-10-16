import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    amountOfCredit: '500000',
    procent: '10',
    creditTerm: '5',
    yearOrMonth: "year",
    startDate: new Date()
}

export const calculationMonthlyPaymentSlice = createSlice({
    name: 'calcMonthlyPayment',
    initialState,
    reducers: {
        changeMonthAmountOfCredit: (state, action) => {
            state.amountOfCredit = action.payload
        },
        changeMonthCreditTerm: (state, action) => {
            state.creditTerm = action.payload
        },
        changeMonthProcent: (state, action) => {
            state.procent = action.payload
        },

        changeMonthYearOrMonth: (state, action) => {
            state.yearOrMonth = action.payload
        },
        changeMonthStartDate: (state, action) => {
            state.startDate = action.payload
        },

    },
})

export const { changeMonthAmountOfCredit, changeMonthProcent, changeMonthCreditTerm, changeMonthYearOrMonth, changeMonthStartDate } = calculationMonthlyPaymentSlice.actions
export default calculationMonthlyPaymentSlice