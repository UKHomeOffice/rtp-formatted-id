'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire').noPreserveCache();

var randomLetters = require('../../lib/initialisers/random-letters');

describe('randomLetters', function() {

    it('should have exports', function() {
        expect(randomLetters).to.have.property('method');
        expect(randomLetters.method).to.be.a.function;
        expect(randomLetters).to.have.property('identifier', 'L');
        expect(randomLetters.identifier).to.be.a.string;
    });

    describe('#randomLetters', function() {

        it('should return the specified number of random letters #1', function() {
            var result = randomLetters.method(1);
            expect(result).to.be.a.string;
            expect(result).to.have.lengthOf(1);
            expect(result).to.match(/[A-Z]/);
        });

        it('should return the specified number of random letters #2', function() {
            var result = randomLetters.method(5);
            expect(result).to.be.a.string;
            expect(result).to.have.lengthOf(5);
            expect(result).to.match(/[A-Z]{5}/);
        });

    });

    describe('Swear words prevention', function() {

        it('recurses till it finds a word that is not a swear word', function() {
            var scanStub = sinon.stub();
            scanStub.onFirstCall().returns(['argh']);
            scanStub.onSecondCall().returns([]);

            function MockParser() {}
            MockParser.prototype.scan = scanStub;

            var stubs = {
                'profanity-matcher': MockParser
            };

            var gen = proxyquire('../../lib/initialisers/random-letters', stubs);
            scanStub.reset();
            var str = gen.method(4);
            expect(str).to.be.a('string');
        });

    });

    it('returns a match for the words that are swear words', function() {
        var scanStub = sinon.stub();
        scanStub.onFirstCall().returns(['argh']);
        scanStub.onSecondCall().returns([]);
        scanStub.onThirdCall().returns(['bad words']);

        function MockParser() {}
        MockParser.prototype.scan = scanStub;

        var stubs = {
            'profanity-matcher': MockParser
        };
        var gen = proxyquire('../../lib/initialisers/random-letters', stubs);
        var res = gen.isSwearWord('suspicious word');
        expect(res).to.be.true;
        res = gen.isSwearWord('another one');
        expect(res).to.be.false;
        res = gen.isSwearWord('last one');
        expect(res).to.be.true;
    });

});
