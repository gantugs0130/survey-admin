var { EventEmitter } = require("fbemitter");
let config = {};
let configList = {
    emitter: new EventEmitter(),
    // apiUrl: "http://172.16.10.25:8080",
    apiUrl: "https://test.hipay.mn:8088",
};

config.config = function (data) {
    configList = {
        ...configList,
        ...data,
    };
};
config.get = function (option) {
    return configList[option];
};

config.formatMoney = function (
    amount,
    decimalCount = 0,
    decimal = ".",
    thousands = "'",
    sign = ""
) {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount
                ? decimal +
                  Math.abs(amount - i)
                      .toFixed(decimalCount)
                      .slice(2) +
                  sign
                : "")
        );
    } catch (e) {
        console.log(e);
    }
};

config.countdown = function (s) {
    const d = Math.floor(s / (3600 * 24));
    s -= d * 3600 * 24;
    const h = Math.floor(s / 3600);
    s -= h * 3600;
    const m = Math.floor(s / 60);
    s -= m * 60;
    const tmp = [];
    d && tmp.push(d + "ө");
    (d || h) && tmp.push(h + "ц");
    (d || h || m) && tmp.push(m + "м");
    s && tmp.push(s + "с");
    return tmp.join(" ");
};

export default config;
