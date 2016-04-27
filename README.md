# rtp-reference-id

[![Build Status](https://travis-ci.org/UKHomeOffice/rtp-formatted-id.svg?branch=master)](https://travis-ci.org/UKHomeOffice/rtp-formatted-id)
[![npm version](https://badge.fury.io/js/rtp-formatted-id.svg)](https://www.npmjs.com/package/rtp-formatted-id)

This module creates non-sequential ids to use in your applications. The aim is to avoid duplicates: the longest the id
you creates, the most unlikely the creation of duplicates is.

## Usage

To use straight off with the default format, you can simply do.

``` JavaScript
var FormattedId = require('rtp-formatted-id');
var formattedId = new FormattedId();
formattedId.generate();  // outputs something like EF-435670-LU
```

##### Advanced

If you set the format to something that uses the `mapYear` and / or `mapProduct` initialisers (Y or P respectively) then
you must supply the options to the `generate` function. An example is below: -
 
``` javascript
var FormattedId = require('rtp-formatted-id');
var formattedId = new FormattedId({
  format: 'Y-P-NN-LL',
  products: {
      productName: {
          applicationTypeName: 'A',
          otherApplicationTypeName: 'B'
      },
      otherProductName: {
          applicationTypeName: 'C'
      }
  }
});
formattedId.generate({
    // pass 2016 as argument to the method identified by the letter Y, in this case mapYear
    Y : 2016,
    // pass object as argument to the method identified by the letter P, in this case mapProduct 
    P : {
        product: 'productName', // matches a product set in the FormattedId config 
        applicationType: 'applicationTypeName' // matches an applicationType set in the FormattedId config
    }
});  // outputs something like A-A-72-DH 
```

Note, config can be passed to the constructor on initialisation or you can call the `setConfig` method.

Some more examples of possible formats are as follows: -

```
format: 'LLLNNNLLL  // outputs something like PLW682LMV
```

This will create an id composed by 3 letters, 3 numbers, 3 letters.
You can use separators in the format, that will be conserved.

```
format: 'LLL-NNN-LLL  // outputs something like PLW-682-LMV
```

## How it works

In the folder `initialisers` you'll find pre-made modules that can be added to your config. Each module needs to exports
two things: `method` and `identifier`.

``` javascript
module.exports = {
    method: mapYear,
    identifier: 'Y'
};
```

The method is what outputs your result; the identifier is the letter that gets used in the config to identify strings made
out of that component. So, in the example above, `mapYear` maps the years to alphabet letters, and therefore adding Y's to
the config will create sequences of the mapped letter. For example: -

```
format: 'LLLNNNLLL-Y  // outputs something like PLW682LMV-A
```

Conversely, you can pass arguments indexed by letters to the `generate` method -- they will be distributed to the correct
component.

``` javascript
var FormattedId = require('rtp-formatted-id');
var formattedId = new FormattedId();
//  pass 2016 as argument to the method identified by the letter Y, in this case mapYear
formattedId.generate({
   Y : 2016
});
```

All the components in the `initialisers` folder are loaded automatically. You can add your own as long as they have the
same interface and map to a letter unambiguosly.

 
## Using the demo

To provide you with a quick evaluation tool, you can use the script `demo.js`. Run it as a bash script after doing a 
`chmod +x` to make it executable, or do `npm install -g` and run `demo` in your terminal.

You must specify how many codes you want to generate and the format to use. For example: -

```
./demo.js 100 LL-NNN-YY  // 100 codes in format letter-letter-number-number-number-mapYear-mapYear
```
    
You can also use the options -a (pass a json string as arguments to `generate`, see above) and -o (show the output).

```
./demo.js 100 LL-NNN-YY -a '{ "Y": 2016 }' -o true   // pass 2016 to mapYear, show the codes
```

Please note that the generation may take a long time if you specify a very high number of codes, especially with `-o true` enabled.

## Caveats
 
This software doesn't guarantee the ids will be unique. A short config like `LL-NN` is likely to generate conflicts after 
a few hundred runs. Conversely, a longer config like `LLLLL-NNNNN` is unlikely to have one conflict after one million runs. 
You can use the various initialisers to protect yourself even further, by adding deterministic parts to the generated id, 
until you reach a degree of risk that is either negligible or acceptable.

