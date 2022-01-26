import { createSlice } from '@reduxjs/toolkit';

export const othersSlice = createSlice({
    name: 'others',
    initialState: {
        textareaValue: '',
        isDarkTheme: false,
        isLoading: false
    },
    reducers: {
        setTextareaValue: (state, text) => {
            state.textareaValue = text.payload;
        },
        setIsDarkTheme: state => {
            state.isDarkTheme = !state.isDarkTheme;
        },
        setIsLoading: state => {
            state.isLoading = !state.isLoading;
        },
    },
});

export const { setTextareaValue, setIsDarkTheme, setIsLoading } = othersSlice.actions;

export const selectTextareaValue = state => state.others.textareaValue;
export const selectIsDarkTheme = state => state.others.isDarkTheme;
export const selectIsLoading = state => state.others.isLoading;


export default othersSlice.reducer;