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

    // create and insert bar in DOM and this.bars array
    function init () {
      var bar = new Bar(this)
      this.bars.unshift(bar)
    }

    function Bar (cont) {
      // create progress element
      this.el = document.createElement('div')
      this.el.style.backgroundColor = cont.opts.bg
      this.width = 0
      this.here = 0
      this.moving = false
      this.cont = cont
      addCss(this.el, cssBar)
      cont.el.appendChild(this.el)
    }

    Bar.prototype.go = function (num) {
      if (num) {
        this.here = num
        if (!this.moving) {
          this.moving = true
          move(this)
        }
      } else if (this.moving) {
        move(this)
      }
    }

    function Nanobar (opt) {
      var opts = this.opts = opt || {},
          el

      // set options
      opts.bg = opts.bg || '#000'
      this.bars = []

      // create bar container
      el = this.el = document.createElement('div')
      if (opts.height && parseInt(opts.height, 10) > 0) {
        cssCont.height = opts.height
      }
      // append style
      addCss(this.el, cssCont)
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

      init.call(this)
    }

    Nanobar.prototype.go = function (p) {
      // expand bar
      this.bars[0].go(p)

      // create new bar at progress end
      if (p === 100) {
        init.call(this)
      }
    }

    return Nanobar
  })()
  return exports.Nanobar
}))
