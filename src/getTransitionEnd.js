/**
 * Transition-end mapping
 */

var map = {
  'WebkitTransition' : 'webkitTransitionEnd',
  'MozTransition' : 'transitionend',
  'OTransition' : 'oTransitionEnd',
  'msTransition' : 'MSTransitionEnd',
  'transition' : 'transitionend'
};

var EL;
var RESULT;

export default () => {
  if (!EL){
    EL = document.createElement('p')
  }

  if (RESULT){
    return RESULT;
  }

  for (var transition in map) {
    if (null != EL.style[transition]) {
      RESULT = map[transition];
      break;
    }
  }

  return RESULT;
}
