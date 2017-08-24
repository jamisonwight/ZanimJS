//import audio from './components/audio.js'
import sticky from './components/sticky.js';

var zanim = function (type, selector, direction, timing, easing) {
    // var fps = 60,
    //     interval = Math.ceil(1000/fps)
    switch (type) {

        case 'sticky':
            return new sticky();
            break;

        default:
            return new sticky();
    }
};