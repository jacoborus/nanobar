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
  function createBar (rm, autoRun) {
    // create progress element
    var el = document.createElement('div'),
        width = 0,
        here = 0,
        on = 0,
        autoRunId = null,
        bar = {
          el: el,
          go: go
        }

    addClass(el, 'bar')

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
    
    function periodic () {
      // exit if progress has surpassed 100
      if (here >= 100) {
        clearInterval(autoRunId)
        autoRunId = null
        return
      }
      go(here + ((.05 * Math.pow(1-Math.sqrt(here / 100), 2)) * 100))
    }
    
    // automatically increment bar (never reaching 100%) if autoRun is `true`
    if (autoRun) {
      autoRunId = setInterval(periodic, 16)
    }
    return bar
  }

  function Nanobar (opts) {
    opts = opts || {}
    // set options
    var el = document.createElement('div'),
        applyGo,
        nanobar = {
          el: el,
          go: function (p) {
            // expand bar
            applyGo(p)
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
    function init (autoRun) {
      var bar = createBar(rm, autoRun)
      el.appendChild(bar.el)
      applyGo = bar.go
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

    init(opts.autoRun)
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
