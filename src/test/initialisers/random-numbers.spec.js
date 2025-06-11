'use strict';

var expect = require('chai').expect;

var randomNumbers = require('../../lib/initialisers/random-numbers');

describe('randomNumbers', function() {

    it('should have exports', function() {
        expect(randomNumbers).to.have.property('method');
        expect(randomNumbers.method).to.be.a.function;
        expect(randomNumbers).to.have.property('identifier', 'N');
        expect(randomNumbers.identifier).to.be.a.string;
    });

    describe('#randomNumbers', function() {

        it('should return the specified number of random numbers #1', function() {
            var result = randomNumbers.method(1);
            expect(result).to.be.a.string;
            expect(result).to.have.lengthOf(1);
            expect(result).to.match(/[0-9]/);
        });

        it('should return the specified number of random numbers #2', function() {
            var result = randomNumbers.method(5);
            expect(result).to.be.a.string;
            expect(result).to.have.lengthOf(5);
            expect(result).to.match(/[0-9]{5}/);
        });

    });

});
