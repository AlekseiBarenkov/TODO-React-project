import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OthersState } from './interface';


const initialState: OthersState = {
    isDarkTheme: false,
    isLoading: true
}

export const othersSlice = createSlice({
    name: 'others',
    initialState,
    reducers: {
        setIsDarkTheme: (state, action: PayloadAction<boolean>) => {
            state.isDarkTheme = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setIsDarkTheme, setIsLoading } = othersSlice.actions;

export default othersSlice.reducer;