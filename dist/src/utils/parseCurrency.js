"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCurrency = exports.parseContainerToCurrency = exports.alcampoParseCurrency2 = exports.alcampoParseCurrency = void 0;
function alcampoParseCurrency(price) {
    let parse = 0;
    if (price.length >= 9) {
        parse = parseFloat(price.substring(1, 6).replace(',', '.'));
    }
    else if (price.length === 8) {
        parse = parseFloat(price.substring(1, 5).replace(',', '.'));
        console.log(parse);
    }
    return parse;
}
exports.alcampoParseCurrency = alcampoParseCurrency;
function alcampoParseCurrency2(price) {
    let parse = 0;
    console.log(price.length);
    if (price.length >= 6) {
        parse = parseFloat(price.substring(0, 7).replace(',', '.'));
    }
    else if (price.length === 5) {
        parse = parseFloat(price.substring(0, 6).replace(',', '.'));
        console.log(parse);
    }
    return parse;
}
exports.alcampoParseCurrency2 = alcampoParseCurrency2;
function parseContainerToCurrency(price) {
    console.log(price);
    let parse = price.replace(/(\r\n|\n|\r)/gm, "");
    parse = parse.replace('Unidad', '');
    console.log(parse);
    parse = parse.split(' ')[0];
    parse = parse + ' €';
    return parse;
}
exports.parseContainerToCurrency = parseContainerToCurrency;
function parseCurrency(price) {
    let parse = 0;
    if (price.length > 0) {
        parse = parseFloat(price.substring(0, price.length - 2).replace(',', '.'));
    }
    return parse;
}
exports.parseCurrency = parseCurrency;
//# sourceMappingURL=parseCurrency.js.map