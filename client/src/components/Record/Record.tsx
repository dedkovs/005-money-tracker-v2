import { useRef, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Transaction } from '../../services/types';
import { makeStyles } from '@material-ui/core/styles';
import MenuButton from './MenuButton';
import WalletContainer from './Wallet/WalletContainer';
import Category from './Category';
import Subcategory from './Subcategory';
import ArrowBetweenWallets from './ArrowBetweenWallets';
import Sum from './Sum';
import { useAppSelector } from '../../redux/hooks';
import revealRecordCommentFunc from './Comment/revealRecordCommentFunc';
import commentRevealOrHide from './Comment/commentRevealOrHide';
import Comment from './Comment/Comment';
import { useAppDispatch } from '../../redux/hooks';
import { setRecordMenuButtonAnchor } from '../../redux/slices/user';
import { setRecordToEdit } from '../../redux/slices/user';

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
}

const Record = ({ record: { id, sum, wallet, comment }, record }: Props) => {
	const classes = useStyles();
	const dispatch = useAppDispatch();

	let x: number, y: number;
	let showComments = useAppSelector((state) => state.user.showComments);
	const [show, setShow] = useState(showComments);

	const wrapperRef = useRef<HTMLAnchorElement>(null);
	const recordMenuButtonRef = useRef<HTMLButtonElement>(null);
	const { backgroundExpenses, backgroundIncome, backgroundBetween } = classes;

	useEffect(() => {
		const f = () => {
			revealRecordCommentFunc(
				x,
				y,
				wrapperRef,
				recordMenuButtonRef,
				show,
				setShow
			);
		};
		const wrapperRefCurrent = wrapperRef.current;
		if (comment) {
			if (wrapperRefCurrent) {
				wrapperRefCurrent.addEventListener('mousedown', getMouseCoordinates);
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

	useEffect(() => {
		commentRevealOrHide(showComments, wrapperRef, setShow);
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
					handleClick={(e) => {
						dispatch(setRecordMenuButtonAnchor(`recordMenuButton_${id}`));
						dispatch(setRecordToEdit(record));
					}}
					ref={recordMenuButtonRef}
					id={`recordMenuButton_${id}`}
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
