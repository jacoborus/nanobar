/* http://nanobar.micronube.com/  ||  https://github.com/jacoborus/nanobar/    MIT LICENSE */
(function (root) {
  'use strict'
  // container styles
  var css = '.nanobar{width:100%;height:4px;z-index:9999;top:0}.bar{width:0;height:100%;transition:height .3s;background:#000}'

  // add required css in head div
  function addCss () {
    var s = document.getElementById('nanobarcss')

    // check whether style tag is already inserted
    if (s === null) {
      s = document.createElement('style')
      s.type = 'text/css'
      s.id = 'nanobarcss'
      document.head.insertBefore(s, document.head.firstChild)
      // the world
      if (!s.styleSheet) return s.appendChild(document.createTextNode(css))
      // IE
      s.styleSheet.cssText = css
    }
  }

  function addClass (el, cls) {
    if (el.classList) el.classList.add(cls)
    else el.className += ' ' + cls
  }

  // create a progress bar
  // this will be destroyed after reaching 100% progress
  function createBar (rm) {
    // create progress element
    var el = document.createElement('div'),
        interval,
        width = 0,
        here = 0,
        on = 0,
        bar = {
          el: el,
          go: go,
          start: start,
          stop: stop
        }

    addClass(el, 'bar')

    function getNewRandomWidth () {
      return here + Math.round(Math.random() * 10)
    }

    // animation loop
    function move () {
      var dist = width - here

      if (dist < 0.1 && dist > -0.1) {
        place(here)
        on = 0
        if (width >= 100) {
          el.style.height = 0
          setTimeout(function () {
            rm(el)
          }, 300)
        }
      } else {
        place(width - dist / 4)
        setTimeout(go, 16)
      }
    }

    // set bar width
    function place (num) {
      width = num
      el.style.width = width + '%'
    }

    function go (num) {
      if (num >= 0) {
        here = num
        if (!on) {
          on = 1
          move()
        }
      } else if (on) {
        move()
      }
    }

    function start (done) {
      clearInterval(interval)

      interval = setInterval(function () {
        if (here >= 100) {
          clearInterval(interval)

          done()
        } else {
          var newWidth = getNewRandomWidth()

          if (newWidth >= 100) {
            go(100)
          } else {
            go(newWidth)
          }
        }
      }, 500)

      go(getNewRandomWidth())
    }

    function stop () {
      clearInterval(interval)
    }

    return bar
  }

  function Nanobar (opts) {
    opts = opts || {}
    // set options
    var el = document.createElement('div'),
        bar,
        nanobar = {
          el: el,
          start: function () {
            bar.start(function () {
              init()
            })
          },
          stop: function () {
            bar.stop()
          },
          finish: function () {
            nanobar.go(100)
          },
          go: function (p) {
            // expand bar
            bar.go(p)
            // create new bar when progress reaches 100%
            if (p >= 100) {
              init()
            }
          }
        }

    // remove element from nanobar container
    function rm (child) {
      el.removeChild(child)
    }

    // create and insert progress var in nanobar container
    function init () {
      bar = createBar(rm)
      el.appendChild(bar.el)
    }

    addCss()

    addClass(el, 'nanobar')
    if (opts.id) el.id = opts.id
    if (opts.classname) addClass(el, opts.classname)

    // insert container
    if (opts.target) {
      // inside a div
      el.style.position = 'relative'
      opts.target.insertBefore(el, opts.target.firstChild)
    } else {
      // on top of the page
      el.style.position = 'fixed'
      document.getElementsByTagName('body')[0].appendChild(el)
    }

    init()
    return nanobar
  }

  if (typeof exports === 'object') {
    // CommonJS
    module.exports = Nanobar
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () { return Nanobar })
  } else {
    // Browser globals
    root.Nanobar = Nanobar
  }
}(this))
