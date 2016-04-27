'use strict';

var _ = require('lodash');

var path = require('path');
var initialisers = require('require-all')(path.join(__dirname, '/initialisers'));

function FormattedId(config) {
    this.config = config || require('../config');
    this.initialisers = initialisers;
}

FormattedId.prototype.setConfig = function setConfig(newConfig) {
    this.config = _.defaults(newConfig, this.config);
};

FormattedId.prototype._findInitialiserByIdentifier = function _findInitialiserByIdentifier(id) {
    var initializer = _.filter(this.initialisers, {'identifier': id});
    return initializer.length ? _.filter(this.initialisers, {'identifier': id})[0].method : undefined;
};

FormattedId.prototype.generate = function generate(options) {
    var outputFormat = this.config.format;
    var output = '';
    var currentChar = outputFormat.charAt(0);
    var charCount = 0;
    var index = 0;
    var args;

    while (index <= outputFormat.length) {
        let nextChar = outputFormat.charAt(index);
        if (nextChar !== currentChar) {
            var method = this._findInitialiserByIdentifier(currentChar);
            args = options && options[currentChar] ? options[currentChar] : undefined;
            output += method ? method(charCount, this.config, args) : currentChar;
            currentChar = nextChar;
            charCount = 1;
        } else {
            charCount++;
        }
        index++;
    }
    return output;
};

module.exports = FormattedId;
