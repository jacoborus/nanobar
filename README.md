![nanobar](https://raw.githubusercontent.com/jacoborus/nanobar/master/brand/nanobar.png 'nanobar logo')
=======================================================================================================

Very lightweight progress bars (~699 bytes gzipped).

Compatibility: iE7+ and the rest of the world

[![npm version](https://badge.fury.io/js/nanobar.svg)](https://www.npmjs.com/package/nanobar) [![Bower version](https://badge.fury.io/bo/nanobar.svg)](https://github.com/jacoborus/nanobar/releases)

## Demo

See [nanobar.jacoborus.codes](http://nanobar.jacoborus.codes)


## Installation

Download and extract the [latest release](https://github.com/jacoborus/nanobar/archive/master.zip) or install with package manager:

[Bower](http://bower.io/):

```
$ bower install nanobar
```

[npm](https://www.npmjs.org/package/nanobar):

```
$ npm install nanobar
```


## Usage

### Load

Link `nanobar.js` from your html file

```html
<script src="path/to/nanobar.min.js"></script>
```

or require it:

```js
var Nanobar = require('path/to/nanobar');
```

### Generate progressbar

```js
var nanobar = new Nanobar( options );
```

**options**

- `id` `<String>`: (optional) id for **nanobar** div
- `classname` `<String>`: (optional) class for **nanobar** div
- `target` `<DOM Element>`: (optional) Where to put the progress bar, **nanobar** will be fixed to top of document if no `target` is passed


### Move bar

Resize the bar with `nanobar.go(percentage)`

**arguments**

- `percentage` `<Number>` : percentage width of nanobar


## Example

Create bar

```js
var options = {
	classname: 'my-class',
  id: 'my-id',
	target: document.getElementById('myDivId')
};

var nanobar = new Nanobar( options );

//move bar
nanobar.go( 30 ); // size bar 30%
nanobar.go( 76 ); // size bar 76%

// size bar 100% and and finish
nanobar.go(100);
```

<br><br>

---

© 2016 [jacoborus](https://github.com/jacoborus) - Released under [MIT License](https://raw.github.com/jacoborus/nanobar/master/LICENSE)
