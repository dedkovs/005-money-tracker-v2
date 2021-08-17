require('dotenv').config();

const express = require('express');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// import * as data from './client/src/services/data';

const expenses_categories = {
	Auto: [
		'Auto parts',
		'Gas',
		'Parking',
		'Toll road',
		'Repairs',
		'Tax',
		'Insurance',
		'Fine',
	],
	Entertainment: ['Restaurant', 'Cinema', 'Concert', 'Bar', 'Club'],
	'Online stores': [
		'Amazon',
		'Aliexpress',
		'ASOS',
		'eBay',
		'Adidas',
		'New Balance',
		'Nike',
		'iHerb',
	],
	'Communal payments': [
		'Phone',
		'Internet',
		'TV',
		'Electricity',
		'Heating',
		'Cold water',
		'Hot water',
		'Garbage removal',
	],
	Education: [
		'Udemi',
		'Coursera',
		'Codecademy',
		'Udacity',
		'Javarush',
		'Learn.Javascript',
	],
	Sport: ['Pool', 'Gym', 'Yoga'],
	Subscriptions: [
		'Apple Music',
		'Google',
		'iCloud',
		'Youtube',
		'Netflix',
		'Spotify',
		'Yandex',
	],
	Food: [
		'Auchan',
		'Tesco',
		'Walmart',
		'Spar',
		'Carrefour',
		'7-Eleven',
		'Costco',
		'Metro',
		'Lidl',
	],
	Others: [''],
	Travels: [
		'UK',
		'USA',
		'France',
		'Spain',
		'Italy',
		'Turkey',
		'Thailand',
		'Indonesia',
		'Cyprus',
		'Greece',
		'Egypt',
		'Cuba',
		'Brazil',
		'Mexico',
	],
	Services: ['Haircut', 'Dry cleaning', 'Dentist', 'Plumber'],
};

const expenses_categories_order = Object.keys(expenses_categories);

const projects = [
	'Project #1',
	'Project #2',
	'Project #3',
	'Project #4',
	'Project #5',
];

const income_categories = {
	Design: projects,
	'Video filming': projects,
	Photography: projects,
	DJ: projects,
	Programming: projects,
};

const income_categories_order = Object.keys(income_categories);

const wallets_order = [
	'Cash',
	'Tinkoff',
	'Sber',
	// 'VTB',
	// 'Gazprom',
	// 'Alfa',
	// 'Raiffeisen',
];

const wallets = {
	[wallets_order[0]]: [1000000, true, 0],
	[wallets_order[1]]: [2000000, true, 0],
	[wallets_order[2]]: [3000000, true, 0],
};

const mode = process.env.MODE;
const public = mode === 'DEV' ? '/client/public' : '/static';
const port = mode === 'DEV' ? 4000 : 80;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + public));

const sequelizeOptions = {
	host: mode === 'DEV' ? 'localhost' : process.env.HOST,
	port: mode === 'DEV' ? 3306 : process.env.PORT,
	username: mode === 'DEV' ? 'root' : process.env.USER,
	password: mode === 'DEV' ? '1234' : process.env.PASSWORD,
	database: mode === 'DEV' ? 'money-tracker' : process.env.DATABASE,
	dialect: 'mysql',
};

const sequelize = new Sequelize(sequelizeOptions);

const User = sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		googleId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: true,
		updatedAt: false,
	}
);

const sequelize_transactions = new Sequelize({
	host: mode === 'DEV' ? 'localhost' : process.env.HOST,
	port: mode === 'DEV' ? 3306 : process.env.PORT,
	username: mode === 'DEV' ? 'root' : process.env.USER,
	password: mode === 'DEV' ? '1234' : process.env.PASSWORD,
	database: mode === 'DEV' ? 'transactions' : process.env.TRANSACTIONS,
	dialect: 'mysql',
});

const createNewTransactionsTable = async (userId) => {
	const Transactions = sequelize_transactions.define(
		`t_${userId}`,
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			sum: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			wallet: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			expenses_category: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			expenses_subcategory: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			income_category: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			income_subcategory: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			wallet_from: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			wallet_to: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			date: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			comment: {
				type: Sequelize.STRING,
				allowNull: true,
			},
		},
		{
			timestamps: false,
			freezeTableName: true,
		}
	);

	await Transactions.sync();
	await sequelize.query(
		`INSERT INTO wallets_top_order VALUES (${userId}, '${JSON.stringify(
			wallets_order
		)}')`,
		{
			type: QueryTypes.INSERT,
		}
	);
	await sequelize.query(
		`INSERT INTO wallets_order VALUES (${userId}, '${JSON.stringify(
			wallets_order
		)}')`,
		{
			type: QueryTypes.INSERT,
		}
	);
	await sequelize.query(
		`INSERT INTO wallets VALUES (${userId}, '${JSON.stringify(wallets)}')`,
		{
			type: QueryTypes.INSERT,
		}
	);
	await sequelize.query(
		`INSERT INTO expenses_categories VALUES (${userId}, '${JSON.stringify(
			expenses_categories
		)}')`,
		{
			type: QueryTypes.INSERT,
		}
	);
	await sequelize.query(
		`INSERT INTO expenses_categories_order VALUES (${userId}, '${JSON.stringify(
			expenses_categories_order
		)}')`,
		{
			type: QueryTypes.INSERT,
		}
	);
	await sequelize.query(
		`INSERT INTO income_categories VALUES (${userId}, '${JSON.stringify(
			income_categories
		)}')`,
		{
			type: QueryTypes.INSERT,
		}
	);
	await sequelize.query(
		`INSERT INTO income_categories_order VALUES (${userId}, '${JSON.stringify(
			income_categories_order
		)}')`,
		{
			type: QueryTypes.INSERT,
		}
	);
};

let localStrategy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	async function (email, password, done) {
		let user;
		try {
			user = await User.findOne({ where: { email: email } });
			if (!user) {
				return done(null, false, { message: 'No user by that email' });
			}
		} catch (e) {
			return done(e);
		}

		const isValid = await comparePassword(password, user.password);

		if (!isValid) {
			return done(null, false, { message: 'Not a matching password' });
		}

		return done(null, user);
	}
);

passport.use(localStrategy);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL:
				mode === 'DEV'
					? 'http://localhost:3000/auth/google/callback'
					: 'https://money-tracker.ru/auth/google/callback',
			userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({
				where: {
					googleId: profile.id,
				},
			});

			if (existingUser) {
				return done(null, existingUser);
			} else {
				try {
					const newUser = await User.create({
						email: profile.emails[0].value,
						googleId: profile.id,
					});
					await createNewTransactionsTable(newUser.id);
					return done(null, newUser);
				} catch (err) {
					console.log(err);
				}
			}
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findByPk(id);
		if (!user) {
			return done(new Error('User not found'));
		}
		done(null, user);
	} catch (e) {
		done(e);
	}
});

const mySqlStoreOptions = {
	host: mode === 'DEV' ? 'localhost' : process.env.HOST,
	port: mode === 'DEV' ? 3306 : process.env.PORT,
	user: mode === 'DEV' ? 'root' : process.env.USER,
	password: mode === 'DEV' ? '1234' : process.env.PASSWORD,
	database: mode === 'DEV' ? 'money-tracker' : process.env.DATABASE,
};

const sessionStore = new MySQLStore(mySqlStoreOptions);

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		store: sessionStore,
		cookie: {
			maxAge: 31536000000,
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

const hashPassword = async (password, saltRounds = 10) => {
	try {
		const salt = await bcrypt.genSalt(saltRounds);
		return await bcrypt.hash(password, salt);
	} catch (error) {
		console.log(error);
	}

	return null;
};

const comparePassword = async (password, hash) => {
	try {
		return await bcrypt.compare(password, hash);
	} catch (error) {
		console.log(error);
	}

	return false;
};

const validateHuman = async (token) => {
	const secret = process.env.REACT_APP_SECRET_KEY_INVISIBLE;
	try {
		const response = await axios.post(
			`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
		);
		const data = response.data;
		console.log(data);
		return data.success;
	} catch (err) {
		console.log(err);
	}
	return false;
};

/// ******************* ROUTES *******************

/// INDEX

app.get('/isauth', (req, res) => {
	if (req.isAuthenticated()) {
		res.send({ isAuth: true, userId: req.user.id });
	} else {
		res.send({ isAuth: false });
	}
});

/// DEMO

app.get('/demo', (req, res) => {
	res.sendFile(__dirname + '/demo/index.html');
});

/// SYNTH

app.get('/synth', (req, res) => {
	res.sendFile(__dirname + '/synth/index.html');
});

/// CURRENCY CONVERTER

app.get('/currency-converter', (req, res) => {
	res.sendFile(__dirname + '/currency-converter/index.html');
});

/// LOGIN

app.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/failure',
		successRedirect: '/success',
	}),
	(err, req, res, next) => {
		if (err) next(err);
	}
);

app.get('/failure', (req, res) => {
	res.send({ isAuth: false });
});

app.get('/success', (req, res) => {
	res.send({ isAuth: true, userId: req.user.id });
});

/// GOOGLE

app.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/',
	}),
	(req, res) => {
		res.redirect('/');
	}
);

/// ADD TRANSACTION

// const Wallet = sequelize.define(
// 	'wallets',
// 	{
// 		user_id: {
// 			type: Sequelize.INTEGER,
// 			allowNull: false,
// 			primaryKey: true,
// 		},
// 		data: {
// 			type: Sequelize.JSON,
// 			allowNull: false,
// 			defaultValue: {},
// 		},
// 	},
// 	{
// 		timestamps: false,
// 	}
// );

app.post('/add-transaction', async (req, res, next) => {
	const { userId, trx, updatedWallets } = req.body;
	const t1 = await sequelize_transactions.transaction();
	const t2 = await sequelize.transaction();
	try {
		const trxId = await sequelize_transactions.query(
			`INSERT INTO t_? (sum, wallet, expenses_category, expenses_subcategory, income_category, income_subcategory, wallet_from, wallet_to, date, comment) VALUES (${
				trx.sum
			}, ${trx.wallet === null ? null : `'${trx.wallet}'`}, ${
				trx.expenses_category === null || trx.expenses_category === ''
					? null
					: `'${trx.expenses_category}'`
			}, ${
				trx.expenses_subcategory === null || trx.expenses_subcategory === ''
					? null
					: `'${trx.expenses_subcategory}'`
			}, ${
				trx.income_category === null || trx.income_category === ''
					? null
					: `'${trx.income_category}'`
			}, ${
				trx.income_subcategory === null || trx.income_subcategory === ''
					? null
					: `'${trx.income_subcategory}'`
			}, ${trx.wallet_from === null ? null : `'${trx.wallet_from}'`}, ${
				trx.wallet_to === null ? null : `'${trx.wallet_to}'`
			}, '${trx.date}', ${
				trx.comment === null || trx.comment === '' ? null : `'${trx.comment}'`
			});`,
			{
				replacements: [userId],
				type: QueryTypes.INSERT,
				transaction: t1,
			}
		);

		// console.log('WALLETS: ', updatedWallets);

		await sequelize.query(
			`UPDATE wallets SET data = '${JSON.stringify(
				updatedWallets
			)}' WHERE user_id = ${userId}`,
			{
				type: QueryTypes.UPDATE,
				transaction: t2,
			}
		);

		res.send(`${trxId[0]}`);

		await t1.commit();
		await t2.commit();
	} catch (err) {
		await t1.rollback();
		await t2.rollback();
		next(err);
	}
});

/// DELETE TRANSACTION

app.post('/delete-transaction', async (req, res, next) => {
	const { userId, trxId, updatedWallets } = req.body;
	const t1 = await sequelize_transactions.transaction();
	const t2 = await sequelize.transaction();
	try {
		await sequelize_transactions.query(`DELETE FROM t_? WHERE (id = ?);`, {
			replacements: [userId, trxId],
			type: QueryTypes.DELETE,
			transaction: t1,
		});

		await sequelize.query(
			`UPDATE wallets SET data = '${JSON.stringify(
				updatedWallets
			)}' WHERE user_id = ${userId}`,
			{
				type: QueryTypes.UPDATE,
				transaction: t2,
			}
		);

		// res.send('OK - Record successfully deleted from database.');
		res.status(200).send('OK - Record successfully deleted from database.');

		await t1.commit();
		await t2.commit();
	} catch (err) {
		await t1.rollback();
		await t2.rollback();
		next(err);
	}
});

/// REGISTER

app.post('/register', async (req, res) => {
	const human = await validateHuman(req.body.token);
	if (!human) {
		res.send({
			error:
				'Failed recaptcha validation, please refresh the page and try again...',
		});
		return;
	}
	const user = await User.findOne({
		where: {
			email: req.body.email,
		},
	});

	if (user === null) {
		const newUser = User.build({
			email: req.body.email,
			password: await hashPassword(req.body.password),
		});

		try {
			await newUser.save();
			await createNewTransactionsTable(newUser.id);
			passport.authenticate('local')(req, res, () => {
				res.send({ isAuth: true, userId: newUser.id, error: '' });
			});
		} catch (err) {
			res.send({ isAuth: false, error: err });
		}
	} else {
		res.send({
			isAuth: false,
			error: 'User with this e-mail address already exists.',
		});
	}
});

/// GET DATA

app.get('/getdata/:id', async (req, res) => {
	if (req.isAuthenticated) {
		try {
			const transactions = await sequelize_transactions.query(
				'SELECT * FROM t_?',
				{
					replacements: [+req.params.id],
					type: QueryTypes.SELECT,
				}
			);
			const wallets = await sequelize.query(
				'SELECT data FROM wallets WHERE user_id = ?',
				{ replacements: [+req.params.id], type: QueryTypes.SELECT }
			);
			const wallets_top_order = await sequelize.query(
				'SELECT data FROM wallets_top_order WHERE user_id = ?',
				{
					replacements: [+req.params.id],
					type: QueryTypes.SELECT,
				}
			);
			const wallets_order = await sequelize.query(
				'SELECT data FROM wallets_order WHERE user_id = ?',
				{
					replacements: [+req.params.id],
					type: QueryTypes.SELECT,
				}
			);

			const expenses_categories = await sequelize.query(
				'SELECT data FROM expenses_categories WHERE user_id = ?',
				{
					replacements: [+req.params.id],
					type: QueryTypes.SELECT,
				}
			);

			const expenses_categories_order = await sequelize.query(
				'SELECT data FROM expenses_categories_order WHERE user_id = ?',
				{
					replacements: [+req.params.id],
					type: QueryTypes.SELECT,
				}
			);

			const income_categories = await sequelize.query(
				'SELECT data FROM income_categories WHERE user_id = ?',
				{
					replacements: [+req.params.id],
					type: QueryTypes.SELECT,
				}
			);

			const income_categories_order = await sequelize.query(
				'SELECT data FROM income_categories_order WHERE user_id = ?',
				{
					replacements: [+req.params.id],
					type: QueryTypes.SELECT,
				}
			);

			const userData = {
				transactions,
				wallets: wallets[0].data,
				wallets_top_order: wallets_top_order[0].data,
				wallets_order: wallets_order[0].data,
				expenses_categories: expenses_categories[0].data,
				expenses_categories_order: expenses_categories_order[0].data,
				income_categories: income_categories[0].data,
				income_categories_order: income_categories_order[0].data,
			};
			res.send(userData);
		} catch (err) {
			console.log(err);
		}
	}
});

/// LOG OUT

app.get('/logout', (req, res) => {
	req.logout();
	res.send({ isAuth: false });
});

/// OTHERS

app.get('*', (req, res) => {
	res.redirect('/');
});

app.listen(port, () => {
	console.log('Server started');
});
