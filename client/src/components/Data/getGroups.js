const getGroups = (transactions) => {
	const groupsByDay = transactions.reduce((group, record) => {
		if (!group[record.date]) {
			group[record.date] = [];
		}
		group[record.date].push(record);
		return group;
	}, {});

	const groupsByDayWithSum = Object.keys(groupsByDay)
		.sort((a, b) => new Date(b) - new Date(a))
		.map((day) => {
			return {
				day,
				records: groupsByDay[day],
				sum: groupsByDay[day].reduce((acc, current) => {
					if (!current.wallet) {
						return acc;
					} else return acc + current.sum;
				}, 0),
			};
		});

	const groupsByMonth = groupsByDayWithSum.reduce((group, record) => {
		// const monthNames = [
		//     'Январь',
		//     'Февраль',
		//     'Март',
		//     'Апрель',
		//     'Май',
		//     'Июнь',
		//     'Июль',
		//     'Август',
		//     'Сентябрь',
		//     'Октябрь',
		//     'Ноябрь',
		//     'Декабрь',
		// ];
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		// const date = new Date(record.day);
		const date = record.day;
		// console.log('date.getMonth(): ', new Date(date).getMonth());
		// console.log('record.day: ', record.day);
		// console.log('date: ', date);
		// const dateYear = date.getFullYear();
		const dateYear = new Date(date).getFullYear();
		// console.log('dateYear: ', dateYear);
		const dateMonth = monthNames[new Date(date).getMonth()];
		if (!group[`${dateMonth} ${dateYear}`]) {
			group[`${dateMonth} ${dateYear}`] = [];
		}
		group[`${dateMonth} ${dateYear}`].push(record);
		return group;
	}, {});

	return Object.keys(groupsByMonth).map((month) => {
		return {
			month,
			records: groupsByMonth[month],
		};
	});
};

export default getGroups;
