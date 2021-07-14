import { makeStyles } from '@material-ui/core';
// import DarkModeSwitcher from './StartHeader/DarkModeSwitcher';
// import CustomButton from './CustomButton';
// import ButtonSpinner from './ButtonSpinner';
// import axios from 'axios';
import { useAppSelector } from '../redux/hooks';
// import {
//     addTransaction,
//     setAllTransactions,
// } from '../redux/slices/transactions';
// import { mockTransactions } from '../services/mockTransactions';
import Record from './Record/Record';
// import { setIsAuth } from '../redux/slices/isAuth';
// import { Transaction } from '../redux/slices/transactions';

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

interface Props {
    // showComments: boolean;
    // prevShowComments: boolean;
}

const SecretPage = (props: Props) => {
    const classes = useStyles();

    // let jsonTransactions: Transaction[] | undefined;
    // if (localStorage.transactions && localStorage.transactions.length > 0) {
    //     jsonTransactions = JSON.parse(localStorage.transactions);
    // }
    const transactions = useAppSelector((state) => state.transactions);
    // const [trx, setTrx] = useState<Transaction[]>([]);

    // useEffect(() => {
    //     setTrx(transactions);
    // }, []);
    // const showComments = useAppSelector((state) => state.showComments);

    // const mountedRef = useRef<boolean>();
    // const [value, setValue] = useState(false);

    // const dispatch = useAppDispatch();

    // const [loading, setLoading] = React.useState(false);

    // const handleLogOutButtonClick = () => {
    //     setLoading(true);

    //     axios
    //         .get('/logout')
    //         .then((res) => {
    //             setLoading(false);
    //             dispatch(setIsAuth(res.data.result));
    //             dispatch(setAllTransactions([]));
    //         })
    //         .catch((err) => {
    //             setLoading(false);
    //             console.log(
    //                 'Something went wrong. Try to reload the page.',
    //                 err
    //             );
    //         });
    // };

    // with the trick
    // useEffect(() => {
    //     if (mountedRef.current) {
    //         // ← the trick
    //         console.log('trick: changed');
    //     }
    // }, [value]);

    // without the trick
    // useEffect(() => {
    //     console.log('regular: changed');
    // }, [value]);

    // useEffect(() => {
    //     console.log('showComments changed: ', showComments);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [value]);

    // useEffect(() => {
    //     console.log('rendered');
    //     mountedRef.current = true;
    //     // update the state after some time
    //     // setTimeout(setValue, 1000, true);
    // }, []);

    // useEffect(() => {
    //     console.log('MOUNTED');
    // }, []);

    // useLayoutEffect(() => {
    //     // if (props.prevShowComments === showComments) {
    //     //     console.log('NO CHANGE!');
    //     //     return;
    //     // }
    //     console.log('showComments changed: ', showComments);
    //     // console.log(store.getState().showComments);
    // }, [store.getState().showComments]);

    // useEffect(() => {
    //     console.log('showComments changed: ', showComments);
    // }, [showComments]);

    return (
        <>
            <div className={classes.toolbarMargin} />
            <div style={{ minWidth: 360 }}>
                <div className={classes.recordsContainer1}>
                    <div className={classes.recordsContainer2}>
                        {transactions.map((record) => (
                            <Record
                                key={record.id}
                                record={record}
                                // showComments={showComments}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SecretPage;
