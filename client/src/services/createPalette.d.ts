import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
    export interface CommonColors {
        black: string;
        white: string;
        yellow1: string;
        yellow2: string;
        yellow3: string;
        green5: string;
        blueSwitch: string;
        blueSwitchHover: string;
    }

    interface Palette {
        common: CommonColors;
        text1: string;
        text2: string;
        recordArrowDownColor: string;
        recordWalletTextColorExpenses: string;
        recordWalletTextColorIncome: string;
        recordWalletTextColorBetween: string;
        recordWalletBackgroundColor: string;
        recordBackgroundColorExpenses: string;
        recordBackgroundColorIncome: string;
        recordBackgroundColorBetween: string;
        recordSumTextColorExpenses: string;
        recordSumTextColorIncome: string;
        recordSumTextColorBetween: string;
        recordSubcategoryTextColorExpenses: string;
        recordSubcategoryTextColorIncome: string;
        recordCommentBackgroundColorExpenses: string;
        recordCommentBackgroundColorIncome: string;
        recordCommentBackgroundColorBetween: string;
        inputUnderlineBeforeColor: string;
        inputUnderlineBeforeHoveredColor: string;
        inputLabelColor: string;
        appBarBackgroundColor: string;
        dividerColor: string;
        // blueSwitchChecked: string;
        // blueSwitchTrack: string;
        // blueSwitchHover: string;
    }

    interface PaletteOptions {
        text1?: string;
        text2?: string;
        recordArrowDownColor?: string;
        recordWalletTextColorExpenses?: string;
        recordWalletTextColorIncome?: string;
        recordWalletTextColorBetween?: string;
        recordWalletBackgroundColor?: string;
        recordBackgroundColorExpenses?: string;
        recordBackgroundColorIncome?: string;
        recordBackgroundColorBetween?: string;
        recordSumTextColorExpenses?: string;
        recordSumTextColorIncome?: string;
        recordSumTextColorBetween?: string;
        recordSubcategoryTextColorExpenses?: string;
        recordSubcategoryTextColorIncome?: string;
        recordCommentBackgroundColorExpenses?: string;
        recordCommentBackgroundColorIncome?: string;
        recordCommentBackgroundColorBetween?: string;
        inputUnderlineBeforeColor?: string;
        inputUnderlineBeforeHoveredColor?: string;
        inputLabelColor?: string;
        appBarBackgroundColor?: string;
        dividerColor?: string;
        // blueSwitchChecked?: string;
        // blueSwitchTrack?: string;
        // blueSwitchHover?: string;
    }
}
