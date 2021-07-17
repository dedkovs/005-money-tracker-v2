const transformDate = (date) => {
    // const monthNames = [
    // 	'января',
    // 	'февраля',
    // 	'марта',
    // 	'апреля',
    // 	'мая',
    // 	'июня',
    // 	'июля',
    // 	'августа',
    // 	'сентября',
    // 	'октября',
    // 	'ноября',
    // 	'декабря',
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
    // const dayNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dateYear = new Date(date).getFullYear();
    const dateMonth = monthNames[new Date(date).getMonth()];
    const dateDay = new Date(date).getDate();
    const dayOfWeek = dayNames[new Date(date).getDay()];
    return `${dateDay} ${dateMonth} ${dateYear}, ${dayOfWeek}`;
};

export default transformDate;
