'use strict';

var expect = require('chai').expect;
var mapYear = require('../../lib/initialisers/map-year').method;
var testConfig = {
    'products': {
        'productOne': {
            'applicationTypeOne': 'A',
            'applicationTypeTwo': 'B'
        },
        'productTwo': {
            'applicationTypeOne': 'C'
        }
    }
};

describe('mapYear', function() {

    describe('#mapYear', function () {

        it('returns A for 2016', function() {
            expect(mapYear(1, testConfig, 2016)).to.equal('A');
        });

        it('returns B for 2017', function() {
            expect(mapYear(1, testConfig, 2017)).to.equal('B');
        });

        it('returns C for 2018', function() {
            expect(mapYear(1, testConfig, 2018)).to.equal('C');
        });

        it('returns Z for 2041', function() {
            expect(mapYear(1, testConfig, 2041)).to.equal('Z');
        });

        it('restarts back at A after 2042', function() {
            expect(mapYear(1, testConfig, 2042)).to.equal('A');
        });

        it('restarts back at C after 2044', function() {
            expect(mapYear(1, testConfig, 2044)).to.equal('C');
        });

        it('restarts back at A after 2068', function() {
            expect(mapYear(1, testConfig, 2068)).to.equal('A');
        });

        it('can output longer strings', function() {
            expect(mapYear(4, testConfig, 2016)).to.equal('AAAA');
        });

    });

    describe('when year is not supplied', function() {

        it('should throw an error', function() {
            var error = 'mapYear error: year must be supplied';
            var mapYearFn = function() {
                mapYear(1, testConfig);
            };
            expect(mapYearFn).to.throw(error);
        });

    });

});

