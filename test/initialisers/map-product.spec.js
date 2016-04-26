'use strict';

var expect = require('chai').expect;
var mapProduct = require('../../lib/initialisers/map-product').method;
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

describe('mapProduct', function() {

    describe('#mapProduct', function () {

        var options;

        beforeEach(function() {
            options = {
                product: '',
                applicationType: ''
            };
        });

        it('returns A for global entry register to apply', function() {
            options.product = 'productOne';
            options.applicationType = 'applicationTypeOne';
            expect(mapProduct(1, testConfig, options)).to.equal('A');
        });

        it('returns B for registered traveller initial application', function() {
            options.product = 'productOne';
            options.applicationType = 'applicationTypeTwo';
            expect(mapProduct(1, testConfig, options)).to.equal('B');
        });

        it('returns C for registered traveller renewal', function() {
            options.product = 'productTwo';
            options.applicationType = 'applicationTypeOne';
            expect(mapProduct(1, testConfig, options)).to.equal('C');
        });

        it('returns multiple times if specified', function() {
            options.product = 'productTwo';
            options.applicationType = 'applicationTypeOne';
            expect(mapProduct(3, testConfig, options)).to.equal('CCC');
        });

    });

    describe('when options are incorrect', function() {

        var error = 'mapProduct error: options parameter must be supplied with product and applicationType properties';

        it('should throw error if they are not supplied at all', function() {
            var mapProductFn = function() {
                mapProduct(1, testConfig);
            };
            expect(mapProductFn).to.throw(error);
        });

        it('should throw error if does not include required properties', function() {
            var mapProductFn = function() {
                mapProduct(1, testConfig, {});
            };
            expect(mapProductFn).to.throw(error);
        });

        it('should throw error if does not include product property', function() {
            var mapProductFn = function() {
                mapProduct(1, testConfig, {applicationType: ''});
            };
            expect(mapProductFn).to.throw(error);
        });

        it('should throw error if does not include applicationType property', function() {
            var mapProductFn = function() {
                mapProduct(1, testConfig, {product: ''});
            };
            expect(mapProductFn).to.throw(error);
        });

    });

});
