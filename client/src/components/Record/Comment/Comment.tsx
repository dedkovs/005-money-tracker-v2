import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Transaction } from '../../../services/types';

const useStyles = makeStyles((theme) => ({
    commentContainer: {
        marginTop: -39,
        width: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        fontSize: '0.8rem',
        fontStyle: 'italic',
        maxHeight: 27,
        transition: 'max-height 0.3s ease-in-out',
        borderRadius: 10,
        marginBottom: 22,

        '& pre': {
            display: 'inline-block',
            paddingLeft: 40,
            paddingTop: 25,
            paddingRight: 10,
            margin: 0,
            paddingBottom: 5,
            whiteSpace: 'pre-wrap',
            // whiteSpace: '-moz-pre-wrap',
            // whiteSpace: '-pre-wrap',
            // whiteSpace: '-o-pre-wrap',
            wordWrap: 'break-word',
        },
    },
    recordCommentBackgroundColorExpenses: {
        backgroundColor: theme.palette.recordCommentBackgroundColorExpenses,
        color: theme.palette.recordWalletTextColorExpenses,
    },
    recordCommentBackgroundColorIncome: {
        backgroundColor: theme.palette.recordCommentBackgroundColorIncome,
        color: theme.palette.recordWalletTextColorIncome,
    },
    recordCommentBackgroundColorBetween: {
        backgroundColor: theme.palette.recordCommentBackgroundColorBetween,
        color: theme.palette.recordWalletTextColorBetween,
    },
    expandMoreIcon: {
        position: 'absolute',
        transform: 'translate(-9px, 10px)',
        right: '50%',
        left: '50%',
        width: 18,
        opacity: 0.5,
        transition: 'all 0.2s ease-in-out',
    },
    expandMoreIconHide: {
        opacity: 0,
        transform: 'translate(-9px, 20px)',
    },
}));

interface Props {
    record: Transaction;
    show: boolean;
}

const Comment = ({ record: { comment, id, sum, wallet }, show }: Props) => {
    const classes = useStyles();
    const { commentContainer, expandMoreIcon, expandMoreIconHide } = classes;

    const getCommentContainerColor = () => {
        if (sum < 0 && wallet) {
            return `${classes.recordCommentBackgroundColorExpenses}`;
        }
        if (sum > 0 && wallet) {
            return `${classes.recordCommentBackgroundColorIncome}`;
        }
        return `${classes.recordCommentBackgroundColorBetween}`;
    };

    const getExpandClass = (show: boolean) => {
        if (show === false) {
            return expandMoreIcon;
        } else if (show === true) {
            return `${expandMoreIcon} ${expandMoreIconHide}`;
        }
    };

    return (
        <>
            {comment ? (
                comment.trim() !== '' ? (
                    <Paper
                        id={`comment-${id}`}
                        elevation={0}
                        className={`${commentContainer} ${getCommentContainerColor()} `}
                    >
                        <pre>{comment}</pre>
                        <ExpandMoreIcon className={getExpandClass(show)} />
                    </Paper>
                ) : null
            ) : null}
        </>
    );
};

export default Comment;
