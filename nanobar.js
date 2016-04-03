/* http://nanobar.micronube.com/  ||  https://github.com/jacoborus/nanobar/    MIT LICENSE */

(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    factory(exports)
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports'], factory)
  } else {
    // Browser globals
    factory(root)
  }
}(this, function (exports) {
  exports.Nanobar = (function () {
    'use strict'
    // container styles
    var cssCont = {
      width: '100%',
      height: '4px',
      zIndex: 9999,
      top: '0'
    }
    // bar styles
    var cssBar = {
      width: 0,
      height: '100%',
      clear: 'both',
      transition: 'height .3s'
    }

    // add `css` to `el` element
    function addCss (el, css) {
      var i
      for (i in css) {
        el.style[i] = css[i]
      }
      el.style.float = 'left'
    }

    // animation loop
    function move (bar) {
      var dist = bar.width - bar.here

      if (dist < 0.1 && dist > -0.1) {
        place(bar, bar.here)
        bar.moving = false
        if (bar.width === 100) {
          bar.el.style.height = 0
          setTimeout(function () {
            bar.cont.el.removeChild(bar.el)
            bar.cont.bars.splice(bar.cont.bars.indexOf(bar), 1)
          }, 300)
        }
      } else {
        place(bar, bar.width - dist / 4)
        setTimeout(function () {
          bar.go()
        }, 16)
      }
    }

    // set bar width
    function place (bar, num) {
      bar.width = num
      bar.el.style.width = bar.width + '%'
    }

    function createBar (cont) {
      // create progress element
      var el = document.createElement('div')
      el.style.backgroundColor = cont.opts.bg
      addCss(el, cssBar)
      cont.el.appendChild(el)
      var bar = {
        el: el,
        width: 0,
        here: 0,
        moving: false,
        cont: cont,
        go: function (num) {
          if (num) {
            bar.here = num
            if (!bar.moving) {
              bar.moving = true
              move(bar)
            }
          } else if (bar.moving) {
            move(bar)
          }
        }
      }
      return bar
    }

    // create and insert bar in DOM and bars array
    function init (cont) {
      var bar = createBar(cont)
      cont.bars.unshift(bar)
    }

    function Nanobar (opts) {
      opts || (opts = {})
      // set options
      opts.bg = opts.bg || '#000'
      var bars = [],
          el = document.createElement('div')

      // create bar container
      if (opts.height && parseInt(opts.height, 10) > 0) {
        cssCont.height = opts.height
      }
      // append style
      addCss(el, cssCont)
      if (opts.id) {
        el.id = opts.id
      }
      // set CSS position
      el.style.position = !opts.target ? 'fixed' : 'relative'

      // insert container
      if (!opts.target) {
        document.getElementsByTagName('body')[0].appendChild(el)
      } else {
        opts.target.insertBefore(el, opts.target.firstChild)
      }

      var nanobar = {
        el: el,
        bars: bars,
        opts: opts,
        go: function (p) {
          // expand bar
          bars[0].go(p)
          // create new bar at progress end
          if (p === 100) {
            init(nanobar)
          }
        }
      }
      init(nanobar)
      return nanobar
    }

    return Nanobar
  })()
  return exports.Nanobar
}))
