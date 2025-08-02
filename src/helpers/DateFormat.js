const dateFormat = (date) => {
    const dateFormated = new Date(date);
    return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(dateFormated);
}

export default dateFormat;
