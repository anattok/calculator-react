import { createSlice } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns'; //

const initialState = {
    startDate: new Date()
}

export const datePickerSlice = createSlice({
    name: 'datePicker',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.startDate = parseISO(action.payload);
        },
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // проверка сериализуемости
        }),
});

export const { setDate } = datePickerSlice.actions;
export default datePickerSlice;