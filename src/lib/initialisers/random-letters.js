'use strict';

var helpers = require('../helpers');
var Matcher = require('profanity-matcher');
var pf = new Matcher();

function isSwearWord(str) {
    return !!pf.scan(str).length;
}

function generateRandomString(num) {
    var all = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    return helpers.sampleMany(all, num);
}

function randomLetters(num, config, opts) {
    var str = generateRandomString(num);
    var options = opts || {};
    // do not check very short words
    var isWordUnacceptable = (options.disableSwearWordsCheck || num <= 2) ? false : isSwearWord(str);
    return isWordUnacceptable ? randomLetters(num) : str;
}

module.exports = {
    isSwearWord: isSwearWord,
    generateRandomString: generateRandomString,
    method: randomLetters,
    identifier: 'L'
};
