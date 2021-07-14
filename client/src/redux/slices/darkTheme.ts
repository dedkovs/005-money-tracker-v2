import { createSlice } from '@reduxjs/toolkit';

let initialState: boolean;

let localStorage_darkTheme = localStorage.getItem('darkTheme');
if (localStorage_darkTheme) {
    initialState = JSON.parse(localStorage_darkTheme);
} else initialState = false;

export const darkTheme = createSlice({
    name: 'darkTheme',
    initialState,
    reducers: {
        toggleTheme: (state: boolean) => {
            state = !state;
            localStorage.setItem('darkTheme', JSON.stringify(state));
            return state;
        },
        setDarkTheme: (
            state: boolean,
            action: { payload: boolean; type: string }
        ) => {
            state = action.payload;
            localStorage.setItem('darkTheme', JSON.stringify(action.payload));
            return state;
        },
    },
});

export const { toggleTheme, setDarkTheme } = darkTheme.actions;
export default darkTheme.reducer;
