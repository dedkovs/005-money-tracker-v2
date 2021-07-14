import { useRef, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Transaction } from '../../redux/slices/transactions';
import { makeStyles } from '@material-ui/core/styles';
import MenuButton from './MenuButton';
import WalletContainer from './Wallet/WalletContainer';
import Category from './Category';
import Subcategory from './Subcategory';
import ArrowBetweenWallets from './ArrowBetweenWallets';
import Sum from './Sum';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import revealRecordCommentFunc from './Comment/revealRecordCommentFunc';
import commentRevealOrHide from './Comment/commentRevealOrHide';
import Comment from './Comment/Comment';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: 65,
        margin: '0px 0px 22px',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 10,
        zIndex: 2,
    },
    backgroundExpenses: {
        backgroundColor: theme.palette.recordBackgroundColorExpenses,
    },
    backgroundIncome: {
        backgroundColor: theme.palette.recordBackgroundColorIncome,
    },
    backgroundBetween: {
        backgroundColor: theme.palette.recordBackgroundColorBetween,
    },
}));

interface Props {
    record: Transaction;
    // showComments: boolean;
}

const Record = ({
    record: { id, sum, wallet, comment },
    record,
}: // showComments,
Props) => {
    const classes = useStyles();

    let showComments = useAppSelector((state) => state.showComments);
    // let showComment: boolean;
    // let localStorage_transactions = localStorage.getItem('transactions');
    // if (localStorage_transactions && localStorage_transactions.length > 0) {
    //     if ('show' in record) {
    //         showComment = record.show!;
    //     } else showComment = showComments;
    // console.log(showComment);
    // }

    // const mountedRef = useRef<boolean>();
    // const [value, setValue] = useState(false);

    // useEffect(() => {
    //     if (mountedRef.current) {
    //         // ← the trick
    //         commentRevealOrHide(id, showComments, wrapperRef, show, setShow);
    //         console.log('trick: changed');
    //     }
    // }, [value]);

    // useEffect(() => {
    //     console.log('rendered');
    //     mountedRef.current = true;
    //     // update the state after some time
    //     // setTimeout(setValue, 1000, true);
    // }, []);

    const dispatch = useAppDispatch();

    const { backgroundExpenses, backgroundIncome, backgroundBetween } = classes;

    let x: number, y: number;

    let jsonTransactions = JSON.parse(localStorage.transactions);
    const [show, setShow] = useState(
        jsonTransactions.indexOf(record).show || showComments
    );
    // console.log(id, show);

    const wrapperRef = useRef<HTMLAnchorElement>(null);
    const recordMenuButtonRef = useRef<HTMLAnchorElement>(null);

    const f = () => {
        revealRecordCommentFunc(
            id,
            x,
            y,
            wrapperRef,
            recordMenuButtonRef,
            show,
            setShow,
            dispatch,
            record
        );
    };

    useEffect(() => {
        const wrapperRefCurrent = wrapperRef.current;
        if (comment) {
            if (wrapperRefCurrent) {
                wrapperRefCurrent.addEventListener(
                    'mousedown',
                    getMouseCoordinates
                );
                wrapperRefCurrent.addEventListener('mouseup', f);
                return () => {
                    wrapperRefCurrent.removeEventListener(
                        'mousedown',
                        getMouseCoordinates
                    );
                    wrapperRefCurrent.removeEventListener('mouseup', f);
                };
            }
        }
    });

    // useEffect(() => {
    // let localStorage_transactions = localStorage.getItem('transactions');
    // if (localStorage_transactions && localStorage_transactions.length > 0) {
    //     let jsonTransactions = JSON.parse(localStorage_transactions);
    //     jsonTransactions[id - 1].show = show;
    //     localStorage.transactions = JSON.stringify(jsonTransactions);
    // }
    // }, [show]);

    useEffect(() => {
        // console.log('showComments changed');
        commentRevealOrHide(id, showComments, wrapperRef, show, setShow);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showComments]);

    const getMouseCoordinates = (e: MouseEvent) => {
        x = e.clientX;
        y = e.clientY;
    };

    const getPaperColor = () => {
        if (sum < 0 && wallet) {
            return `${backgroundExpenses}`;
        }
        if (sum > 0 && wallet) {
            return `${backgroundIncome}`;
        }
        return `${backgroundBetween}`;
    };
    return (
        <>
            <Paper
                ref={wrapperRef}
                elevation={0}
                className={`${classes.paper} ${getPaperColor()}`}
            >
                <MenuButton
                    // handleClick={(e) => {
                    // 	setAnchorEl(e.currentTarget);
                    // 	setRecordToEdit(record);
                    // }}
                    ref={recordMenuButtonRef}
                />
                <WalletContainer record={record} />
                <ArrowBetweenWallets record={record} />
                <Category record={record} />
                <Subcategory record={record} />
                <Sum record={record} />
            </Paper>
            <Comment record={record} show={show} />
        </>
    );
};

export default Record;
