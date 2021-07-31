import { useAppSelector } from '../../redux/hooks';
import RecordsByDayHeader from './RecordsByDayHeader';
import getRecordsBetween from './getRecordsBetween';
import getRecordsIncome from './getRecordsIncome';
import getRecordsExpenses from './getRecordsExpenses';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
    },
    recordsContainer1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    recordsContainer2: {
        display: 'block',
        margin: '0 auto',
        maxWidth: 500,
        minWidth: 320,
        width: 'calc(100% - 20px)',
        marginTop: 30,
        marginBottom: 30,
    },
    pagination: {
        marginTop: 90,
        '& > ul': {
            justifyContent: 'center',
        },
    },
    headerMonth: {
        fontSize: '1.5em',
        fontWeight: 300,
        opacity: 0.7,
        margin: '0 auto',
        marginTop: 15,
        maxWidth: '500px',
        textAlign: 'center',
        color: theme.palette.text1,
    },
    recordsGroupDate: {
        '& > :last-child': {
            marginBottom: 50,
        },
    },
    paginationColor: {
        color: theme.palette.common.blueSwitch,
    },
}));

const Records = () => {
    const classes = useStyles();

    const transactions = useAppSelector((state) => state.user.transactions);

    const groupsByMonth = useAppSelector((state) => state.user.groupsByMonth);
    const pageNumber = useAppSelector((state) => state.user.pageNumber);

    return transactions.length > 0 ? (
        <div className={classes.recordsContainer2}>
            {groupsByMonth[pageNumber].records.map((group) => {
                return (
                    <div key={group.day} className={classes.recordsGroupDate}>
                        <RecordsByDayHeader group={group} />

                        {getRecordsBetween(group.records)}

                        {getRecordsIncome(group.records)}

                        {getRecordsExpenses(group.records)}
                    </div>
                );
            })}
        </div>
    ) : null;
};

export default Records;
