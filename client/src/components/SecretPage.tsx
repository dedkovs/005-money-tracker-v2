import { makeStyles } from '@material-ui/core';
import { useAppSelector } from '../redux/hooks';
import Record from './Record/Record';

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
    },
    button: {
        display: 'block',
        position: 'relative',
        margin: '0 auto',
        paddingLeft: '12px',
        paddingRight: '12px',
        backgroundColor: theme.palette.common.yellow1,
        '&:hover': {
            backgroundColor: theme.palette.common.yellow2,
        },
    },
    recordsContainer1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    recordsContainer2: {
        display: 'block',
        maxWidth: 500,
        minWidth: 320,
        width: '95%',
        margin: '20px 0',
    },
    pagination: {
        marginTop: 15,
        '& > ul': {
            justifyContent: 'center',
        },
    },
    headerMonth: {
        fontSize: '1.5em',
        opacity: 0.7,
        margin: '0 auto',
        marginTop: 15,
        maxWidth: '500px',
        textAlign: 'center',
    },
    recordsGroupDate: {
        '& > :last-child': {
            marginBottom: 50,
        },
    },
}));

const SecretPage = () => {
    const classes = useStyles();

    const transactions = useAppSelector(
        (state) => state.transactions2.transactions
    );

    return (
        <>
            <div className={classes.toolbarMargin} />
            <div style={{ minWidth: 360 }}>
                <div className={classes.recordsContainer1}>
                    <div className={classes.recordsContainer2}>
                        {transactions.map((record) => (
                            <Record key={record.id} record={record} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SecretPage;
