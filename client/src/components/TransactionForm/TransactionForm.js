import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    // ThemeProvider,
    // createMuiTheme,
    makeStyles,
} from '@material-ui/core/styles';
// import Header from './Header';
// import Sum from './Sum';
// import Wallet from './Wallet';
// import Arrow from './Arrow';
// import Category from './Category';
// import Subcategory from './Subcategory';
// import Date from './Date';
// import Comment from './Comment';
// import SaveButton from './SaveButton';
import { useHistory, BrowserRouter } from 'react-router-dom';
import { setOpenTransactionForm } from '../../redux/slices/openTransactionForm';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

const useStyles = makeStyles(() => ({
    paperFullWidth: {
        width: '100%',
    },
    paperWidthSm: {
        minWidth: 340,
        maxWidth: 360,
    },
    dialogContent1: {
        minHeight: 500,
        padding: 0,
        '&:first-child': {
            paddingTop: 0,
        },
    },
    dialogContent2: {
        height: '100%',
        padding: 0,
        '&:first-child': {
            paddingTop: 0,
        },
    },
    paper1: {
        position: 'absolute',
        top: 80,
        margin: 0,
        borderRadius: 20,
    },
    paper2: {
        borderRadius: 20,
    },
}));

const TransactionForm = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(max-width:360px)');
    const history = useHistory();
    const openTransactionForm = useAppSelector(
        (state) => state.openTransactionForm
    );
    const dispatch = useAppDispatch();

    // const theme = createMuiTheme({
    //     palette: {
    //         type: store.themeType,
    //         primary: {
    //             main: store.formType === 'expences' ? '#40a7e2' : '#59af35',
    //         },
    //     },
    // });

    return (
        // <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Dialog
                style={{ zIndex: 1302 }}
                open={openTransactionForm}
                onClose={() => {
                    dispatch(setOpenTransactionForm(false));
                    history.push('/');
                }}
                classes={{
                    root: classes.dialogRoot,
                    paperFullWidth: classes.paperFullWidth,
                    paperWidthSm: classes.paperWidthSm,
                    paper: `${matches ? classes.paper2 : classes.paper1}`,
                    // paper: classes.paper1,
                }}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent
                    className={`${
                        matches
                            ? classes.dialogContent2
                            : classes.dialogContent1
                    }`}
                >
                    {/* <Header /> */}
                    {/* <Sum /> */}
                    {/* <Wallet /> */}
                    {/* <Arrow /> */}
                    {/* <Category /> */}
                    {/* <Subcategory /> */}
                    {/* <Date /> */}
                    {/* <Comment /> */}
                    {/* <SaveButton /> */}
                </DialogContent>
            </Dialog>
        </BrowserRouter>
        // </ThemeProvider>
    );
};

export default TransactionForm;
