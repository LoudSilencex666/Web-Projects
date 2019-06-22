function lastLoginPeriod(dbDate) {
    const converter = 86400000;
    let now = new Date();
    let result = 0;

    dbDate = JSON.stringify(dbDate);
    dbDate = JSON.parse(dbDate);
    dbDate = new Date(dbDate);

    result = Math.floor((now - dbDate) / converter);

    if(result < 1) {
        return "Ostatnie logowanie: dzisiaj";
    } else if(result === 1) {
        return "Ostatnie logowanie wczoraj";
    } else {
        return "Ostatnie logowanie: " + result + " dni temu";
    }
}

module.exports = lastLoginPeriod;