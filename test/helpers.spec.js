'use strict';

var expect = require('chai').expect;
var helpers = require('../lib/helpers');

describe('helpers', function() {

    describe('#sampleMany', function() {

        it('should return a string', function() {
            expect(helpers.sampleMany([1, 2, 3], 1)).to.be.a.string;
        });

        it('should return a string the specified length using set provided', function() {
            var set = ['A', 'B', 'C'];
            var sample = helpers.sampleMany(set, 2);
            expect(sample).to.be.a.string;
            expect(sample).to.be.lengthOf(2);
            expect(sample).to.match(/[ABC]{2}/);
        });

    });

});
