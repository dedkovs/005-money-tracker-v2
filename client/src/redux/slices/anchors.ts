import { createSlice } from '@reduxjs/toolkit';
import { Anchors } from '../../services/types';

const initialState: Anchors = {
	recordMenuButtonAnchor: null,
};

export const anchors = createSlice({
	name: 'anchors',
	initialState,
	reducers: {
		setRecordMenuButtonAnchor: (state, action: { payload: null | string }) => {
			let recordMenuButtonAnchor = action.payload;
			return { ...state, recordMenuButtonAnchor };
		},
	},
});

export const { setRecordMenuButtonAnchor } = anchors.actions;
export default anchors.reducer;
