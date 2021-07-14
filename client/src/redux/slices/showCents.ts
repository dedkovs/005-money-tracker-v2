import { createSlice } from '@reduxjs/toolkit';

let initialState: boolean;

let localStorage_showCents = localStorage.getItem('showCents');
if (localStorage_showCents) {
    initialState = JSON.parse(localStorage_showCents);
} else initialState = true;

export const showCents = createSlice({
    name: 'showCents',
    initialState,
    reducers: {
        toggleShowCents: (state: boolean) => {
            state = !state;
            // localStorage.setItem('showCents', JSON.stringify(state));
            return state;
        },
        setShowCents: (
            state: boolean,
            action: { payload: boolean; type: string }
        ) => {
            state = action.payload;
            // localStorage.setItem('showCents', JSON.stringify(action.payload));
            return state;
        },
    },
});

export const { toggleShowCents, setShowCents } = showCents.actions;
export default showCents.reducer;
