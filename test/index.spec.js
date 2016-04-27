'use strict';

var proxyquire = require('proxyquire');
var expect = require('chai').expect;

describe('FormattedId', function () {

    var formattedId;
    var FormattedId;
    var mockConfig = {
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

    before(function() {
        FormattedId = proxyquire('../lib/index', {
            '../config': mockConfig
        });
        formattedId = new FormattedId();
    });

    describe('#constructor', function() {

        it('should initialise with default config if not specified', function() {
            expect(formattedId.config).to.deep.equal(mockConfig);
        });

        it('should set config on creation if it is supplied', function() {
            let config = {format: 'NN-LL'};
            let formattedIdWithConfig = new FormattedId(config);
            expect(formattedIdWithConfig.config).to.deep.equal(config);
        });

    });

    describe('#_findInitialiserByIdentifier', function() {

        it('should return undefined if initialiser does not exist', function() {
            expect(formattedId._findInitialiserByIdentifier('A')).to.be.undefined;
        });

        it('should return the method function', function() {
            expect(formattedId._findInitialiserByIdentifier('L')).to.be.a.function;
        });

    });

    describe('#setConfig', function() {

        it('overrides the parts of config you pass to it ', function() {
            var oldFormat = formattedId.config.format;
            formattedId.setConfig({
                format: 'NNLLNNMM'
            });
            expect(formattedId.config.format).not.to.equal(oldFormat);
            expect(formattedId.config.format).to.equal('NNLLNNMM');
        });

        it('does not override the parts of config that were not passed to it', function() {
            formattedId.config.newProperty = 'foo';
            formattedId.setConfig({
                format: 'NNLLNNMM'
            });
            expect(formattedId.config.newProperty).to.exist;
            expect(formattedId.config.newProperty).to.equal('foo');
        });

    });

    describe('#generate', function() {

        it('should return a code', function() {
            formattedId.config.format = 'NNNLLLNNN';
            var code = formattedId.generate();
            expect(code).to.be.a.string;
            expect(code).to.match(/[0-9]{3}[A-Z]{3}[0-9]{3}/);
        });

        it('should return a code with just letters', function() {
            formattedId.config.format = 'LLLLLL';
            var code = formattedId.generate();
            expect(code).to.be.a.string;
            expect(code).to.match(/[A-Z]{6}/);
        });

        it('should return a code with just numbers', function() {
            formattedId.config.format = 'NNNNN';
            var code = formattedId.generate();
            expect(code).to.be.a.string;
            expect(code).to.match(/[0-9]{5}/);
        });

        it('should return a code with a single letter', function() {
            formattedId.config.format = 'L';
            var code = formattedId.generate();
            expect(code).to.be.a.string;
            expect(code).to.match(/[A-Z]/);
        });

        it('should return a code with a single number', function() {
            formattedId.config.format = 'N';
            var code = formattedId.generate();
            expect(code).to.be.a.string;
            expect(code).to.match(/[0-9]/);
        });

        it('should handle characters than do not map to a method', function() {
            formattedId.config.format = 'NNN-LLL';
            var code = formattedId.generate();
            expect(code).to.be.a.string;
            expect(code).to.match(/[0-9]{3}-[A-Z]{3}/);
        });

        it('does pass arguments to the method if applicable - for mapYear', function() {
            formattedId.config.format = 'LLL-Y';
            var code = formattedId.generate({
                'Y': 2018
            });
            expect(code).to.be.a.string;
            expect(code).to.match(/[A-Z]{3}-C/);
        });

        it('does pass arguments to the method if applicable - for mapProduct', function() {
            formattedId.config.format = 'LLL-NNN-P';
            var code = formattedId.generate({
                'P': {
                    product: 'productOne',
                    applicationType: 'applicationTypeTwo'
                }
            });
            expect(code).to.be.a.string;
            expect(code).to.match(/[A-Z]{3}-[0-9]{3}-B/);
        });

    });

});
