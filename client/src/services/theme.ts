import { Theme } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
const WHITE = '#ffffff';

const TRANSPARENT_WHITE_1 = 'rgba(255,255,255,0.12)';
const TRANSPARENT_BLACK_1 = 'rgba(0,0,0,0.12)';

const YELLOW_1 = 'rgb(255,193,7)';
const YELLOW_2 = 'rgb(180,136,4)';
const YELLOW_3 = 'rgba(180, 136, 4, 0.08)';

const GREY_1 = '#e6ebed';
const GREY_2 = '#68747a';
const GREY_3 = 'rgba(255,255,255,0.5)';
const GREY_4 = '#b0bec5';
const GREY_5 = '#303030';
const GREY_6 = '#455a64';
const GREY_7 = 'rgba(0,0,0,0.54)';
const GREY_8 = '#263238';
const GREY_9 = '#192024';
const GREY_10 = 'rgba(0,0,0,0.42)';
const GREY_11 = 'rgba(0,0,0,0.87)';
const GREY_12 = 'rgba(255,255,255,0.3)';
const GREY_13 = 'rgba(255,255,255,0.7)';

const BLUE_1 = 'rgb(219,233,248)';
const BLUE_2 = 'rgb(98,127,148)';
const BLUE_3 = 'rgba(144,202,249,0.6)';
const BLUE_4 = 'rgb(144,202,249)';
const BLUE_5 = 'rgb(0,103,163)';
const BLUE_6 = 'rgb(20,64,90)';
const BLUE_7 = 'rgba(43,63,79,0.7)';
const BLUE_8 = 'rgb(43,63,79)';
const BLUE_9 = 'rgb(14,32,46)';
const BLUE_10 = 'rgba(0,103,163,0.08)';

const GREEN_1 = '#def0d5';
const GREEN_2 = '#6a875d';
const GREEN_3 = 'rgba(156,204,101,0.6)';
const GREEN_4 = 'rgb(156,204,101)';
const GREEN_5 = '#8bc34a';
const GREEN_6 = '#33691e';
const GREEN_7 = 'rgba(37,77,22,0.7)';
const GREEN_8 = 'rgb(37,77,22)';
const GREEN_9 = '#172e0d';

export const light: Theme = createMuiTheme({
    palette: {
        type: 'light',

        common: {
            white: WHITE,
            yellow1: YELLOW_1,
            yellow2: YELLOW_2,
            yellow3: YELLOW_3,
            green5: GREEN_5,
            blueSwitch: BLUE_5,
            blueSwitchHover: BLUE_10,
        },

        text1: GREY_11,
        text2: GREY_5,

        background: {
            paper: WHITE,
        },
        recordArrowDownColor: GREY_8,

        recordWalletTextColorExpenses: BLUE_8,
        recordWalletTextColorIncome: GREEN_8,
        recordWalletTextColorBetween: GREY_8,

        recordWalletBackgroundColor: GREY_3,

        recordBackgroundColorExpenses: BLUE_4,
        recordBackgroundColorIncome: GREEN_4,
        recordBackgroundColorBetween: GREY_4,

        recordSumTextColorExpenses: BLUE_8,
        recordSumTextColorIncome: GREEN_8,
        recordSumTextColorBetween: GREY_8,

        recordSubcategoryTextColorExpenses: BLUE_7,
        recordSubcategoryTextColorIncome: GREEN_7,

        recordCommentBackgroundColorExpenses: BLUE_1,
        recordCommentBackgroundColorIncome: GREEN_1,
        recordCommentBackgroundColorBetween: GREY_1,

        inputUnderlineBeforeColor: GREY_10,
        inputUnderlineBeforeHoveredColor: GREY_10,

        inputLabelColor: GREY_7,

        appBarBackgroundColor: BLUE_5,

        dividerColor: TRANSPARENT_BLACK_1,
    },
});

export const dark: Theme = createMuiTheme({
    palette: {
        type: 'dark',

        common: {
            white: WHITE,
            yellow1: YELLOW_1,
            yellow2: YELLOW_2,
            yellow3: YELLOW_3,
            green5: GREEN_5,
            blueSwitch: BLUE_5,
            blueSwitchHover: BLUE_10,
        },

        text1: GREY_13,
        text2: WHITE,

        background: {
            paper: GREY_5,
        },

        recordArrowDownColor: WHITE,

        recordWalletTextColorExpenses: BLUE_9,
        recordWalletTextColorIncome: GREEN_9,
        recordWalletTextColorBetween: GREY_9,

        recordWalletBackgroundColor: GREY_12,

        recordBackgroundColorExpenses: BLUE_6,
        recordBackgroundColorIncome: GREEN_6,
        recordBackgroundColorBetween: GREY_6,

        recordSumTextColorExpenses: BLUE_4,
        recordSumTextColorIncome: GREEN_4,
        recordSumTextColorBetween: GREY_4,

        recordSubcategoryTextColorExpenses: BLUE_3,
        recordSubcategoryTextColorIncome: GREEN_3,

        recordCommentBackgroundColorExpenses: BLUE_2,
        recordCommentBackgroundColorIncome: GREEN_2,
        recordCommentBackgroundColorBetween: GREY_2,

        inputUnderlineBeforeColor: GREY_13,
        inputUnderlineBeforeHoveredColor: GREY_13,

        inputLabelColor: GREY_3,

        appBarBackgroundColor: BLUE_6,

        dividerColor: TRANSPARENT_WHITE_1,
    },
});
