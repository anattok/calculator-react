import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    monthlyPayment: '20000',
    amountOfCredit: '1000000',
    procent: '10',
}

export const calculationLoanTermSlice = createSlice({
    name: 'calcLoanTerm',
    initialState,
    reducers: {
        changeTermMonthlyPayment: (state, action) => {
            state.monthlyPayment = action.payload
        },
        changeTermAmountOfCredit: (state, action) => {
            state.amountOfCredit = action.payload
        },
        changeTermProcent: (state, action) => {
            state.procent = action.payload
        },

    },
})

export const { changeTermMonthlyPayment, changeTermAmountOfCredit, changeTermProcent } = calculationLoanTermSlice.actions
export default calculationLoanTermSlice