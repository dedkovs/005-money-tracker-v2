import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useAppDispatch } from '../../redux/hooks';
import { setOpenDrawer } from '../../redux/slices/openDrawer';
import { addTransaction } from '../../redux/slices/transactions';

const useStyles = makeStyles(() => ({
    tooltip: {
        fontSize: '0.9rem',
    },
    addIcon: {
        color: 'white',
    },
    button: {
        minHeight: 56,
        minWidth: 45,
        '@media (min-width:600px)': { minHeight: 64, minWidth: 64 },
    },
}));

const AddTransactionButton1 = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    return (
        <Tooltip
            title={'Добавить новую запись'}
            placement="bottom"
            classes={{ tooltip: classes.tooltip }}
            arrow
            enterDelay={500}
        >
            <Button
                className={classes.button}
                onClick={() => {
                    dispatch(setOpenDrawer(false));
                    dispatch(addTransaction());
                }}
            >
                <AddIcon className={classes.addIcon} />
            </Button>
        </Tooltip>
    );
};

export default AddTransactionButton1;
