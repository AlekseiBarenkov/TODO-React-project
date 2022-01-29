import { createSlice } from '@reduxjs/toolkit';

export const othersSlice = createSlice({
    name: 'others',
    initialState: {
        isDarkTheme: false,
        isLoading: false
    },
    reducers: {
        setIsDarkTheme: state => {
            state.isDarkTheme = !state.isDarkTheme;
        },
        setIsLoading: state => {
            state.isLoading = !state.isLoading;
        },
    },
});

export const { setIsDarkTheme, setIsLoading } = othersSlice.actions;

export const selectIsDarkTheme = state => state.others.isDarkTheme;
export const selectIsLoading = state => state.others.isLoading;

export default othersSlice.reducer;