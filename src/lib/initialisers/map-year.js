'use strict';

function mapYear(num, config, year) {
    if (!year) {
        throw new Error('mapYear error: year must be supplied');
    }
    var str = String.fromCharCode(((year - 2016) % 26) + 65);
    if (num && num > 1) {
        return new Array(num + 1).join(str);
    }
    return str;
}

module.exports = {
    method: mapYear,
    identifier: 'Y'
};

