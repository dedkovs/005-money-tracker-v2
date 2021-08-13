import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NumberFormat from 'react-number-format';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setOpenDrawer } from '../../redux/slices/user';

const useStyles = makeStyles(() => ({
	topWalletsContainer: {
		display: 'flex',
		maxWidth: 'calc(100% - 90px)',
		height: 50,
		overflowY: 'hidden',
		overflowX: 'auto',
	},
	walletContainer: {
		padding: '0 10px',
		margin: '0 10px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		minHeight: 50,
		minWidth: 'unset',
		textTransform: 'none',
		opacity: 0.8,
		border: '1px solid rgba(255,255,255,0.5)',
		borderRadius: 5,
	},
	scrollButtonsDesktop1: {
		display: 'none',
	},
	scrollButtonsDesktop2: {
		display: 'inline-flex',
	},
}));

const TopWallets = () => {
	const classes = useStyles();
	// const matches = useMediaQuery('(max-width: 360px)');

	const dispatch = useAppDispatch();
	const showCents = useAppSelector((state) => state.user.showCents);
	const walletsTopOrder = useAppSelector((state) => state.user.walletsTopOrder);
	const wallets = useAppSelector((state) => state.user.wallets);

	return (
		<div className={classes.topWalletsContainer}>
			<Tabs
				value={false}
				variant="scrollable"
				scrollButtons="auto"
				textColor="inherit"
				// indicatorColor="primary"
				// classes={{
				// 	scrollButtonsDesktop: matches
				// 		? classes.scrollButtonsDesktop1
				// 		: classes.scrollButtonsDesktop2,
				// }}
			>
				{Object.keys(wallets).length > 0 &&
					walletsTopOrder
						.filter((wallet: string) => wallets[wallet][1] === true)
						.map((wallet: string) => {
							return (
								<Tab
									onClick={() => {
										dispatch(setOpenDrawer(false));
									}}
									key={wallet}
									className={classes.walletContainer}
									icon={
										<div>
											<Typography
												style={{
													fontFamily: 'Roboto',
													fontWeight: 300,
													fontSize: '0.8rem',
												}}
												variant={'body2'}
												align={'center'}
											>
												{wallet}
											</Typography>
											<Typography
												style={{
													fontFamily: 'Circe Light',
												}}
												variant={'body2'}
												align={'center'}
											>
												<NumberFormat
													value={wallets[wallet][0] / 100}
													displayType={'text'}
													thousandSeparator={' '}
													decimalSeparator={'.'}
													decimalScale={showCents ? 2 : 0}
													fixedDecimalScale={true}
												/>
											</Typography>
										</div>
									}
								></Tab>
							);
						})}
			</Tabs>
		</div>
	);
};

export default TopWallets;
