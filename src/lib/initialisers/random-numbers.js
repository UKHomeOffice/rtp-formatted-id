'use strict';

var helpers = require('../helpers');

function randomNumbers(num, config) {
    var all = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return helpers.sampleMany(all, num);
}

module.exports = {
    method: randomNumbers,
    identifier: 'N'
};
