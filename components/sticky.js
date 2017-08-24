import _ from 'lodash'
import $ from 'jquery'

export default class sticky {
    
  constructor(options) {
    this.element = ''
    this.animClass = ''
    this.options = options
    this.selector = options.selector || arguments[0]
    this.direction = options.direction || arguments[1] || 'top'
    this.duration = options.duration || arguments[2] || '.9s'
    this.easing = options.easing || arguments[3] || 'ease-out'
    this.addon = options.addon || arguments[4] || ''
    this.window = window
    this.zanimate()
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  getProps() {
    var props = {
      '--animDuration': this.duration,
      '--animEase': this.easing,
    }
    return props
  }


  getAddon(name) {

  }

  zanimate() {
    const _this = this,
          element = document.getElementById(this.selector)

    var zanIn = function(time) {
      setTimeout(function() {
        var element = document.getElementById(_this.selector),
            props = _this.getProps() // Get custom CSS variable properties
        // Set all custom CSS properties
        Object.entries(props).forEach(([prop, animVal]) => {
          element.style.setProperty(prop, animVal)
        })
        element.classList.remove(_this.animClass + '_static')
        element.classList.remove(_this.animClass + '_out')
        element.classList.add(_this.animClass + '_in')
      }, time) 
    }

    var zanOut = function(time) {
      setTimeout(function() {
        var element = document.getElementById(_this.selector)
        element.classList.remove(_this.animClass + '_in')
        element.classList.add(_this.animClass + '_out')
        element.style.setProperty('--animDuration', _this.duration)
      }, time)
    }

    var zanStatic = function(time) {
      setTimeout(function() {
        var element = document.getElementById(_this.selector)
        element.classList.remove(_this.animClass + '_out')
        element.classList.add(_this.animClass + '_static')
      }, time)  
    }


    _this.window.addEventListener('scroll', _.throttle(() => {
      return requestAnimationFrame(() => {
        _this.animClass = 'sticky-' + _this.direction
        // Window Offsets
        if (_this.window.pageYOffset > 100) {
          // Animation arrays based on addons
          switch(_this.addon.name) {
            case 'dash' : 
              animationsIn = [_this.zanIn('dash'), _this.zanAddon('dashIn')]
              animationsOut = [_this.zanOut('dash'), _this.zanAddon('dashOut'), _this.zanStatic()] 
            break
            default :
              zanIn(0)
          }
        } else if (_this.window.pageYOffset === 0) {
           // Animation arrays based on addons
           switch(_this.addon.name) {
            case 'dash' : 
              animationsIn = [_this.zanIn('dash'), _this.zanAddon('dashIn')]
              animationsOut = [_this.zanOut('dash'), _this.zanAddon('dashOut'), _this.zanStatic()] 
            break
            default :
              zanOut(0)
              zanStatic(150)
          }
        }
      })
    }, 200))
  } 
}


// _this.window.addEventListener('scroll', _.throttle(() => {
//   return async function*() {
//     element = document.getElementById(_this.selector)
//     _this.animClass = 'sticky-' + _this.direction

//     if (_this.window.pageYOffset > 100) {
//       if (element.classList.contains(_this.animClass + '_static')) {
//         element.classList.replace(_this.animClass + '_static', _this.animClass + '_in')
//       } else {
//         element.classList.add(_this.animClass + '_in')
//       }
//    }  else if (_this.window.pageYOffset === 0) {
//         element.classList.replace(_this.animClass + '_in', _this.animClass + '_out')

        
//         return new Promise(function(resolve){
//           setTimeout(function() {
//             resolve(this.element.removeClass(this.animClass + '_out'))
//           }, 100)
//         })
//         .then(function() {
//           this.element.addClass(this.animClass + '_static')
//         })
//         .catch(function(error) {
//           console.log(error)
//         })
//    }
//   }  
// }, 200))