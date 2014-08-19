![nanobar](https://raw.githubusercontent.com/jacoborus/nanobar/master/brand/nanobar.png 'nanobar logo')
=======================================================================================================

Very lightweight progress bars (~630 bytes gzipped). No jQuery needed.

Compatibility: iE7+ and the rest of the world

## Demo

See [nanobar.micronube.com](http://nanobar.micronube.com)

## Installation

Download and extract the last release from [here](https://github.com/jacoborus/nanobar/archive/master.zip) or install with package manager:

[component(1)](http://component.io):

```
$ component install jacoborus/nanobar
```

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

or require it with [Browserify](http://browserify.org/) or [Component](http://component.io):

```js
var Nanobar = require('path/to/nanobar');
```

### Generate progressbar

```js
var nanobar = new Nanobar( options );
```

**options**

- `bg` `<String>`: (optional) background css property, '#000' by default
- `id` `<String>`: (optional) id for **nanobar** div
- `target` `<DOM Element>`: (optional) Where to put the progress bar, **nanobar** will be fixed to top of document if `target` is `null`


### Move bar

Resize the bar with `nanobar.go(percentage)`

**arguments**

- `percentage` `<Number>` : percentage width of nanobar


### Increase bar

Increase the bar with `nanobar.increase(percentage)`

**arguments**

- `percentage` `<Number>` : percentage to increase the nanobar


## Example

Create bar

```js
var options = {
	bg: '#acf',
	// leave target blank for global nanobar
	target: document.getElementById('myDivId'),
	// id for new nanobar
	id: 'mynano'
};

var nanobar = new Nanobar( options );

//move bar
nanobar.go( 30 ); // size bar 30%

//increase bar
nanobar.increase( 10 ); // increase bar by 10%

// Finish progress bar
nanobar.go(100);
```

<br><br>

---

© 2014 [jacoborus](https://github.com/jacoborus) - Released under [MIT License](https://raw.github.com/jacoborus/nanobar/master/LICENSE)
