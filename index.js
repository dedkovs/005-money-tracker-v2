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
        // config: {
        //     type: DataTypes.JSON,
        //     allowNull: false,
        //     defaultValue: { cents: true, theme: true, comments: true },
        // },
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
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            sum: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            wallet: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            expenses_category: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            expenses_subcategory: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            income_category: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            income_subcategory: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            wallet_from: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            wallet_to: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            comment: {
                type: DataTypes.STRING,
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
        `INSERT INTO wallets_top_order VALUES (${userId}, '[]')`,
        {
            type: QueryTypes.INSERT,
        }
    );
    await sequelize.query(`INSERT INTO wallets VALUES (${userId}, '{}')`, {
        type: QueryTypes.INSERT,
    });
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

// ******************* ROUTES *******************

// INDEX

app.get('/isauth', (req, res) => {
    if (req.isAuthenticated()) {
        res.send({ isAuth: true, userId: req.user.id });
    } else {
        res.send({ isAuth: false });
    }
});

// DEMO

app.get('/demo', (req, res) => {
    res.sendFile(__dirname + '/demo/index.html');
});

// LOGIN

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

// GOOGLE

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

// REGISTER

app.post('/register', async (req, res) => {
    const human = await validateHuman(req.body.token);
    if (!human) {
        res.send({
            error: 'Failed recaptcha validation, please refresh the page and try again...',
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

// GET DATA

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
            const wallets_top_order = await sequelize.query(
                'SELECT * FROM wallets_top_order WHERE user_id = ? LIMIT 1',
                {
                    replacements: [+req.params.id],
                    type: QueryTypes.SELECT,
                }
                // 'INSERT INTO wallets_top_order (user_id, data) VALUES (?, []) RETURNING data',
                // {
                //     replacements: [+req.params.id],
                //     type: QueryTypes.SELECT,
                // }
            );
            const wallets = await sequelize.query(
                'SELECT * FROM wallets WHERE user_id = ? LIMIT 1',
                { replacements: [+req.params.id], type: QueryTypes.SELECT }
            );
            const userData = {
                transactions,
                wallets_top_order: wallets_top_order[0].data,
                wallets: wallets[0].data,
            };
            res.send(userData);
        } catch (err) {
            console.log(err);
        }
    }
});

// LOG OUT

app.get('/logout', (req, res) => {
    req.logout();
    res.send({ isAuth: false });
});

// OTHERS

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log('Server started');
});
