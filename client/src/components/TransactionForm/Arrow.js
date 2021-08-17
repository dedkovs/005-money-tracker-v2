import makeStyles from '@material-ui/styles/makeStyles';
import { useAppSelector } from '../../redux/hooks';
import ArrowUp from '../../images/arrow-up.svg';
import ArrowDown from '../../images/arrow-down.svg';

const useStyles = makeStyles(() => ({
	'@keyframes rotateup': {
		from: {
			transform: 'rotate3d(1, 0, 0, -90deg)',
		},
		to: {
			transform: 'rotate3d(1, 0, 0, -180deg)',
		},
	},
	'@keyframes rotatedown': {
		from: {
			transform: 'rotate3d(1, 0, 0, 90deg)',
		},
		to: {
			transform: 'rotate3d(1, 0, 0, 0deg)',
		},
	},
	FormExpensesArrow: {
		position: 'relative',
		width: 270,
		marginLeft: 20,
		marginTop: 10,
		height: 15,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		animationDuration: '1s',
	},
	arrowDown: {
		backgroundImage: `url(${ArrowDown})`,
		transform: 'rotate3d(1, 0, 0, 0deg)',
		animationName: '$rotatedown',
	},

	arrowUp: {
		backgroundImage: `url(${ArrowUp})`,
		transform: 'rotate3d(1, 0, 0, -180deg)',
		animationName: '$rotateup',
	},
}));

const Arrow = () => {
	const classes = useStyles();
	const formType = useAppSelector((state) => state.user.formType);

	const getArrow = () => {
		if (formType === 'expenses') return classes.arrowDown;
		if (formType === 'income') return classes.arrowUp;
	};

	return <div className={`${classes.FormExpensesArrow} ${getArrow()}`}></div>;
};

export default Arrow;
