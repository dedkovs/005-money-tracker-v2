import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
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

    return (
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
                ></DialogContent>
            </Dialog>
        </BrowserRouter>
    );
};

export default TransactionForm;
