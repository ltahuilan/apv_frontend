const dateFormat = (date) => {
    // 1. Convertir el string de fecha en una object Date
    const dateObj = new Date(date);
    console.log(dateObj)
    // 2. Ajustar el día para compensar la zona horaria
    // Se obtiene la diferencia en minutos entre la zona horaria local y UTC.
    const timezoneOffset = dateObj.getTimezoneOffset() * 60000;

    // Se le suma ese 'offset' a la fecha en UTC para obtener la fecha correcta en tu zona horaria local
    const correctedDate = new Date(dateObj.getTime() + timezoneOffset);
    console.log(correctedDate)

    return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(correctedDate);
}

export default dateFormat;
