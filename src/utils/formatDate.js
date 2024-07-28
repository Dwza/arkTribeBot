module.exports = (dateString, lang = 'de') => {
    const d = new Date(dateString);
    let day = d.getDate(); 
    let month = d.getMonth()+1;
    let year = d.getFullYear();

    day = (day<10?"0":"") + day;
    month = (month<10?"0":"") + month;

    switch(lang) {
        case "de":
            return `${day}.${month}.${year}`;
        case "en":
            return `${year}/${month}/${day}`
        case "string":
            return `${year}${month}${day}`
        default:
            return `${day}.${month}.${year}`
    }
}