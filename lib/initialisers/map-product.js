'use strict';

var _ = require('lodash');

function mapProduct(num, config, options) {
    if (_.has(options, 'product') && _.has(options, 'applicationType')) {
        return new Array(num + 1).join(config.products && config.products[options.product] &&
            config.products[options.product][options.applicationType]);
    }
    throw new Error('mapProduct error: options parameter must be supplied with product and applicationType properties');
}

module.exports = {
    method: mapProduct,
    identifier: 'P'
};

