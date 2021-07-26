import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Anchors {
    recordMenuButtonAnchor: null | string;
}

export let initialState: Anchors = {
    recordMenuButtonAnchor: null,
};

export const anchors = createSlice({
    name: 'anchors',
    initialState,
    reducers: {
        setRecordMenuButtonAnchor: (
            state,
            action: PayloadAction<null | string>
        ) => {
            state.recordMenuButtonAnchor = action.payload;
            return state;
        },
    },
});

export const { setRecordMenuButtonAnchor } = anchors.actions;
export default anchors.reducer;
