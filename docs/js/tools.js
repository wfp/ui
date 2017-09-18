var forEach = function(array, callback, scope) {
  "use strict";
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

var bindEvent = function(element, type, handler) {
  "use strict";
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    element.attachEvent("on" + type, handler);
  }
};