var Subnav = function(element, nav) {
  "use strict";
  var owner = this;
  owner.lgScreen = window.matchMedia("(min-width: 1024px)");
  owner.containers = element.querySelectorAll(".menu--item");
  owner._eventHandlers = {};
  owner._timer = 0;
  owner._nav = nav;
  if (typeof element === "string") {
    owner.element = document.querySelector(element);
  } else {
    owner.element = typeof element.length !== "undefined" && element.length > 0 ? element[0] : element;
  }
  if (!owner.element) {
    throw new Error("[subnav.js] Please check if the element is correct");
  }
  owner.init();
};

Subnav.prototype = {
  init: function() {
    "use strict";
    var owner = this;
    owner.lgScreen.addListener(function(MQListEvent) {
      owner._nav.close();
      owner.processEventBindings();
    });
    owner.processEventBindings();
  },
  addNewListener: function(node, event, handler, capture) {
    "use strict";
    var owner = this;
    if (!(node in owner._eventHandlers)) {
      owner._eventHandlers[node] = {};
    }
    if (!(event in owner._eventHandlers[node])) {
      owner._eventHandlers[node][event] = [];
    }
    owner._eventHandlers[node][event].push([ handler, capture ]);
    node.addEventListener(event, handler, capture);
  },
  removeAllListeners: function(node, event) {
    "use strict";
    var owner = this;
    if (node in owner._eventHandlers) {
      var handlers = owner._eventHandlers[node];
      if (event in handlers) {
        var eventHandlers = handlers[event];
        for (var i = eventHandlers.length; i--; ) {
          var handler = eventHandlers[i];
          node.removeEventListener(event, handler[0], handler[1]);
        }
      }
    }
  },
  hideSubmenu: function(currentItem) {
    "use strict";
    var owner = this;
    forEach(owner.containers, function(key, el) {
      var submenu = el.querySelector(".menu--submenu");
      if (currentItem) {
        if (submenu && submenu !== currentItem && !submenu.classList.contains("dn")) {
          submenu.classList.add("dn");
        }
      } else if (submenu) {
        submenu.classList.add("dn");
      }
    });
  },
  processEventBindings: function() {
    "use strict";
    var owner = this;
    forEach(owner.containers, function(key, el) {
      var activator = el.querySelector(".menu--link");
      var submenu = el.querySelector(".menu--submenu");
      if (submenu) {
        if (owner.lgScreen.matches) {
          owner.removeAllListeners(activator, "click");
          owner.addNewListener(activator, "mouseenter", function(event) {
            clearTimeout(owner._timer);
            owner.hideSubmenu(submenu);
            submenu.classList.remove("dn");
          });
          owner.addNewListener(activator, "mouseleave", function(event) {
            owner._timer = setTimeout(function() {
              owner.hideSubmenu();
            }, 750);
          });
          owner.addNewListener(submenu, "mouseenter", function(event) {
            clearTimeout(owner._timer);
          });
          owner.addNewListener(submenu, "mouseleave", function(event) {
            owner._timer = setTimeout(function() {
              owner.hideSubmenu();
            }, 750);
          });
        } else {
          owner.removeAllListeners(activator, "mouseenter");
          owner.removeAllListeners(activator, "mouseleave");
          owner.removeAllListeners(submenu, "mouseenter");
          owner.removeAllListeners(submenu, "mouseleave");
          owner.addNewListener(activator, "click", function(event) {
            owner.hideSubmenu(submenu);
            submenu.classList.toggle("dn");
            event.preventDefault();
          });
        }
      }
    });
  }
};