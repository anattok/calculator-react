import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    //Расчет ежемесячного платежа - "monthly-payment"
    //Расчет максимальной суммы кредита - "maximum-loan-amount"
    //Расчет срока кредита - "credit-term"
    calculationOption: "monthly-payment"
}

export const typeCalculationSlice = createSlice({
    name: 'typeCalc',
    initialState,
    reducers: {
        changeTypeCalculation: (state, action) => {
            state.calculationOption = action.payload
        },

    },
})

export const { changeTypeCalculation } = typeCalculationSlice.actions
export default typeCalculationSlice