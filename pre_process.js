const validator = require("validator");


function dropWordEndings(word) {

}

function dropPunctuation(text) {
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
}

function specialTokens(w) {
    if (validator.isEmail(w))
        return "emaiAddr";
    if (validator.isCurrency(w))
        return "currencyAmmount";
    if (validator.isMobilePhone(w, "any"))
        return "phoneNumber"
    if (validator.isNumeric(w))
        return "numericValue";
    if (validator.isURL(w))
        return "webAddress";
}

module.exports = function preProcess(text) {
    let words = text.split(' ');
    return words
        .map(dropPunctuation)
        .map(dropWordEndings)
        .map(specialTokens);
};
