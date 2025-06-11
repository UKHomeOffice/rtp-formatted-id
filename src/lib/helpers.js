'use strict';

var _ = require('lodash');

function sampleMany(set, number) {
    var result = '';
    for (var i = 1; i <= number; i++) {
        result += _.sample(set);
    }
    return result;
}

module.exports = {
    sampleMany: sampleMany
};
