import { createSlice } from '@reduxjs/toolkit';
import { FormType, UI } from '../../services/types';

let darkTheme: boolean;
const localStorage_darkTheme = localStorage.getItem('darkTheme');
if (
    localStorage_darkTheme &&
    (localStorage_darkTheme === 'false' || localStorage_darkTheme === 'true')
) {
    darkTheme = JSON.parse(localStorage_darkTheme);
} else darkTheme = false;

let showComments: boolean;
const localStorage_showComments = localStorage.getItem('showComments');
if (
    localStorage_showComments &&
    (localStorage_showComments === 'false' ||
        localStorage_showComments === 'true')
) {
    showComments = JSON.parse(localStorage_showComments);
} else showComments = true;

let showCents: boolean;
const localStorage_showCents = localStorage.getItem('showCents');
if (
    localStorage_showCents &&
    (localStorage_showCents === 'false' || localStorage_showCents === 'true')
) {
    showCents = JSON.parse(localStorage_showCents);
} else showCents = true;

const initialState: UI = {
    darkTheme,
    showComments,
    showCents,
    logoAnimated: true,
    logoLoaded: false,
    formType: 'expenses',
};

export const ui = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            darkTheme = !darkTheme;
            localStorage.setItem('darkTheme', JSON.stringify(darkTheme));
            return { ...state, darkTheme };
        },
        toggleShowComments: (state) => {
            showComments = !showComments;
            localStorage.setItem('showComments', JSON.stringify(showComments));
            return { ...state, showComments };
        },
        toggleShowCents: (state) => {
            showCents = !showCents;
            localStorage.setItem('showCents', JSON.stringify(showCents));
            return { ...state, showCents };
        },
        setLogoAnimated: (state, action: { payload: boolean }) => {
            const logoAnimated = action.payload;
            return { ...state, logoAnimated };
        },
        setLogoLoaded: (state, action: { payload: boolean }) => {
            const logoLoaded = action.payload;
            return { ...state, logoLoaded };
        },
        setFormType: (state, action: { payload: FormType }) => {
            const formType = action.payload;
            return { ...state, formType };
        },
    },
});

export const {
    toggleTheme,
    toggleShowComments,
    toggleShowCents,
    setLogoAnimated,
    setLogoLoaded,
    setFormType,
} = ui.actions;
export default ui.reducer;
