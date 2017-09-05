import {throttle} from 'lodash'
import {capitalize, 
        replaceClass,
        removeClass,
        removeMultiClass,
        addClass,
        showElements,
        hideElements,
        setKeyframeIn,
        setKeyframe,
        removeKeyframe} from './utility.js'

export default class sticky {
    
  constructor(options) {
    this.element = ''
    this.animClass = ''
    this.options = options
    this.selector = options.selector || arguments[0]
    this.direction = options.direction || arguments[1] || 'top'
    this.durationIn = options.durationIn || arguments[2] || '.7s'
    this.durationOut = options.durationOut || '.15s'
    this.durationStatic = options.durationStatic || '.7s'
    this.easeIn = options.easeIn || arguments[3] || 'ease-out'
    this.easeOut = options.easeOut || 'ease-out'
    this.easeStatic = options.easeStatic || 'ease-in'
    this.keyframeIn = options.keyframeIn || 'stickyIn'
    this.keyframeOut = options.keyframeOut || 'stickyOut'
    this.keyframeStatic = options.keyframeStatic || 'stickyStatic'
    this.delayIn = options.delayIn || ''
    this.delayOut = options.delayOut || ''
    this.delayStatic = options.delayStatic || 150
    this.selectorWidth = options.width || '100%'
    this.selectorHeight = options.height || '5rem'
    this.selectorBg = options.bgColor || 'rgb(255,226,138)'
    this.selectorZIndex = options.zIndex || '30'
    this.directionClassIn = 'sticky' + capitalize(this.direction) + '_in'
    this.directionClassOut = 'sticky' + capitalize(this.direction) + '_out'
    this.addon = options.addon || arguments[4] || ''
    this.setAnimations = '' 
    this.window = window
    this.didScroll = false
    this.zanimate()
  }

  getProps() {
    var props = {
      '--stickyInDuration': this.durationIn,
      '--stickyOutDuration': this.durationOut,
      '--stickyStaticDuration': this.durationStatic,
      '--stickyInEase': this.easeIn,
      '--stickyOutEase': this.easeOut,
      '--stickyStaticEase': this.easeStatic,
      '--stickyInKeyframe': this.keyframeIn + capitalize(this.direction),
      '--stickyOutKeyframe': this.keyframeOut + capitalize(this.direction),
      '--stickyStaticKeyframe': this.keyframeStatic,
      '--stickyWidth': this.selectorWidth,
      '--stickyHeight': this.selectorHeight,
      '--stickyZIndex': this.selectorZIndex,
      '--stickyBg': this.selectorBg,
    }
    return props
  }

  setProps(element) {
    // Set custom CSS properties
    Object.entries(this.getProps()).forEach(([prop, animVal]) => {
      element.style.setProperty(prop, animVal)
    })
  }

  zanimate() {
    var _this = this,
        element = document.getElementById(this.selector)

    var zanIn = function(time) {
      setTimeout(function() {
        let element = document.getElementById(_this.selector)
        removeClass('sticky_static', element)
        replaceClass(element, 'sticky_out', 'sticky_in')
        replaceClass(element, _this.directionClassOut, _this.directionClassIn)
        // Set css properties
        _this.setProps(element)
      }, time) 
    }

    var zanOut = function(time) {
      setTimeout(function() {
        var element = document.getElementById(_this.selector),
            dashCon = document.getElementById('dash-con'),
            logo = document.getElementById('logo'),
            menu = document.getElementById('menu')
        replaceClass(element, 'sticky_in', 'sticky_out')
        replaceClass(element, _this.directionClassIn, _this.directionClassOut)
        // hide menu and logo
        hideElements('sticky_hide', dashCon, logo, menu)
      }, time)
    }

    var zanStatic = function(time) {
      setTimeout(function() {
        var element = document.getElementById(_this.selector),
            dashCon = document.getElementById('dash-con'),
            logo = document.getElementById('logo'),
            menu = document.getElementById('menu')

        // element.addEventListener("animationend", () => {
        //   setTimeout(() => {
        //     removeClass('stickyDash_dashcon', dashCon)
        //     removeMultiClass('sticky_show', dashCon, menu, logo)
        //     addMultiClass('sticky_hide', dashCon, menu, logo)
        //   }, 0)
        // }, {once: true})
        removeMultiClass(element, _this.directionClassIn, _this.directionClassOut, 'sticky_out')
        addClass('sticky_static', element)
      }, time)  
    }

    var getAddon = function(name) {
      switch(name) {
        // DASH IN
        case 'dashIn':
          let element = document.getElementById(_this.selector),
              dashCon = document.getElementById('dash-con'),
              logo = document.getElementById('logo'),
              menu = document.getElementById('menu')
  
          setKeyframeIn(0, dashCon, menu, logo)
          setKeyframe(200, dashCon)
          setKeyframe(600, logo)
          setKeyframe(1500, menu)
        break
        // DASH OUT
        case 'dashOut':
          var element = document.getElementById(_this.selector),
              dashCon = document.getElementById('dash-con'),
              logo = document.getElementById('logo'),
              menu = document.getElementById('menu')

          removeKeyframe(10, dashCon)
          removeKeyframe(20, logo)
          removeKeyframe(30, menu)
        break
      }
    }

    // Attach a function that sets a variable to true on scroll
    window.onscroll = setScroll
    function setScroll() {
        _this.didScroll = true;
    }
    
    setInterval(function() {
      if(_this.didScroll) {
            // Window Offsets
        if (_this.window.pageYOffset > 200) {
          // Animation arrays based on addons
          switch(_this.addon) {
            case 'dash' : 
              getAddon('dashIn')
            break
            default :
            zanIn()
          }
        } else if (_this.window.pageYOffset <= 700) {
            // Animation arrays based on addons
            switch(_this.addon) {
              case 'dash' : 
                getAddon('dashOut')
              break
              default :
                zanOut(10)
                zanStatic(150)
          }
        } 
      }
    }, 100);
  } 
}
