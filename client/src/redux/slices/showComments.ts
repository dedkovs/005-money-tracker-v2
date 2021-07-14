import { createSlice } from '@reduxjs/toolkit';

let initialState: boolean = false;

// let localStorage_showComments = localStorage.getItem('showComments');
// if (localStorage_showComments) {
//     initialState = JSON.parse(localStorage_showComments);
// } else initialState = true;

export const showComments = createSlice({
    name: 'showComments',
    initialState,
    reducers: {
        toggleShowComments: (state: boolean) => {
            state = !state;
            // localStorage.setItem('showComments', JSON.stringify(state));
            return state;
        },
        setShowComments: (
            state: boolean,
            action: { payload: boolean; type: string }
        ) => {
            state = action.payload;
            // localStorage.setItem(
            //     'showComments',
            //     JSON.stringify(action.payload)
            // );
            return state;
        },
    },
});

export const { toggleShowComments, setShowComments } = showComments.actions;
export default showComments.reducer;
