#!/usr/bin/env node

'use strict';
/* eslint no-console: 0 */

var program = require('commander');
var _ = require('lodash');
var chalk = require('chalk');
var Generator = require('./lib/index');

program
    .arguments('<num>')
    .arguments('<format>')
    .option('-a, --arg <arg>', 'Arguments to be passed to generate()')
    .option('-o, --output <output>', 'Show the output')
    .action(function action(num, format) {
        var output = [];
        var generator = new Generator();
        generator.config.format = format;
        _.times(num, function times(i) {
            let id = generator.generate(program.arg ? JSON.parse(program.arg) : undefined);
            let colour = i % 2 ? 'green' : 'magenta';
            if (program.output) {
                console.info(chalk[colour](id));
            }
            output.push(id);
        });
        var dedupedL = new Set(output).size;
        var dupes = output.length - dedupedL;
        var colour = dupes ? 'red' : 'blue';
        console.info(chalk[colour]('We got ', dupes, dupes === 1 ? ' duplicate' : ' duplicates'));

    })
    .parse(process.argv);
