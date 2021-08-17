export const comments = [
	'',
	'Just\nDo\nIt',
	'Think Different',
	"Because you're worth it",
	'Open Happiness',
	"I'm loving it",
	'There are some things money can’t buy.\nFor everything else, there’s MasterCard.',
	'Think Big',
	"What's in your wallet?",
	'Have it your way',
	'All for Freedom.\nFreedom for All.',
	'Quality never goes out of style',
	'Live in your world.\nPlay in ours.',
	'Diamonds are forever',
	'Everywhere you want to be',
	'The Ultimate Driving Machine',
	'Save money.\nLive better.',
	'Impossible is Nothing',
	"Don't leave home without it",
	'Challenge everything',
	'What happens here, stays here',
];

export const expenses_categories = {
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
		"Macy's",
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

export const expenses_categories_order = Object.keys(expenses_categories);

export const projects = [
	'Project #1',
	'Project #2',
	'Project #3',
	'Project #4',
	'Project #5',
];

export const income_categories = {
	Design: projects,
	'Video filming': projects,
	Photography: projects,
	DJ: projects,
	Programming: projects,
};

export const income_categories_order = Object.keys(income_categories);

export const wallets_order = [
	'Cash',
	'Tinkoff',
	'Sber',
	// 'VTB',
	// 'Gazprom',
	// 'Alfa',
	// 'Raiffeisen',
];

export const wallets = {
	[wallets_order[0]]: [1000000, true, 0],
	[wallets_order[1]]: [2000000, true, 0],
	[wallets_order[2]]: [3000000, true, 0],
};
