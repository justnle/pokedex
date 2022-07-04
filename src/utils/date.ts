const formatDate = (pokemon: Object) => {
    if (pokemon[`captured_date`]) {
        const formattedDate = pokemon[`captured_date`],
            [yyyy, mm, dd] = formattedDate.split(/[/:\-T]/);

        const date = new Date(yyyy, mm - 1, dd);
        const month = date.toLocaleString('default', { month: 'long' });

        return `${month} ${dd}, ${yyyy}`;
    }
};

const toISOStringWithTimezone = (date: Date) => {
    const timeZoneOffset = -date.getTimezoneOffset();
    const diff = timeZoneOffset >= 0 ? `+` : `-`;
    const pad = (num: number) =>
        `${Math.floor(Math.abs(num))}`.padStart(2, `0`);

    return (
        date.getFullYear() +
        `-` +
        pad(date.getMonth() + 1) +
        `-` +
        pad(date.getDate()) +
        `T` +
        pad(date.getHours()) +
        `:` +
        pad(date.getMinutes()) +
        `:` +
        pad(date.getSeconds()) +
        diff +
        pad(timeZoneOffset / 60) +
        `:` +
        pad(timeZoneOffset % 60)
    );
};

export { formatDate, toISOStringWithTimezone };
