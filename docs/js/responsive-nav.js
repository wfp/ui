(function(document, window, index) {
  "use strict";
  var responsiveNav = function(el, options) {
    var computed = !!window.getComputedStyle;
    if (!computed) {
      window.getComputedStyle = function(el) {
        this.el = el;
        this.getPropertyValue = function(prop) {
          var re = /(\-([a-z]){1})/g;
          if (prop === "float") {
            prop = "styleFloat";
          }
          if (re.test(prop)) {
            prop = prop.replace(re, function() {
              return arguments[2].toUpperCase();
            });
          }
          return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        };
        return this;
      };
    }
    var addEvent = function(el, evt, fn, bubble) {
      if ("addEventListener" in el) {
        try {
          el.addEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.addEventListener(evt, function(e) {
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("attachEvent" in el) {
        if (typeof fn === "object" && fn.handleEvent) {
          el.attachEvent("on" + evt, function() {
            fn.handleEvent.call(fn);
          });
        } else {
          el.attachEvent("on" + evt, fn);
        }
      }
    }, removeEvent = function(el, evt, fn, bubble) {
      if ("removeEventListener" in el) {
        try {
          el.removeEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.removeEventListener(evt, function(e) {
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("detachEvent" in el) {
        if (typeof fn === "object" && fn.handleEvent) {
          el.detachEvent("on" + evt, function() {
            fn.handleEvent.call(fn);
          });
        } else {
          el.detachEvent("on" + evt, fn);
        }
      }
    }, getChildren = function(e) {
      if (e.children.length < 1) {
        throw new Error("The Nav container has no containing elements");
      }
      var children = [];
      for (var i = 0; i < e.children.length; i++) {
        if (e.children[i].nodeType === 1) {
          children.push(e.children[i]);
        }
      }
      return children;
    }, setAttributes = function(el, attrs) {
      for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    }, addClass = function(el, cls) {
      if (el.className.indexOf(cls) !== 0) {
        el.className += " " + cls;
        el.className = el.className.replace(/(^\s*)|(\s*$)/g, "");
      }
    }, removeClass = function(el, cls) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g, "");
    }, forEach = function(array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
      }
    };
    var nav, opts, navToggle, styleElement = document.createElement("style"), htmlEl = document.documentElement, hasAnimFinished, isMobile, navOpen;
    var ResponsiveNav = function(el, options) {
      var i;
      this.options = {
        animate: false,
        transition: 284,
        label: "Menu",
        insert: "before",
        customToggle: "",
        closeOnNavClick: false,
        openPos: "absolute",
        closedPos: "static",
        navClass: "nav-collapse",
        navActiveClass: "js-nav-active",
        jsClass: "js",
        init: function() {},
        open: function() {},
        close: function() {}
      };
      for (i in options) {
        this.options[i] = options[i];
      }
      addClass(htmlEl, this.options.jsClass);
      this.wrapperEl = el.replace("#", "");
      if (document.getElementById(this.wrapperEl)) {
        this.wrapper = document.getElementById(this.wrapperEl);
      } else if (document.querySelector(this.wrapperEl)) {
        this.wrapper = document.querySelector(this.wrapperEl);
      } else {
        throw new Error("The nav element you are trying to select doesn't exist");
      }
      this.wrapper.inner = getChildren(this.wrapper);
      opts = this.options;
      nav = this.wrapper;
      this._init(this);
    };
    ResponsiveNav.prototype = {
      destroy: function() {
        this._removeStyles();
        removeClass(nav, "closed");
        removeClass(nav, "opened");
        removeClass(nav, opts.navClass);
        removeClass(nav, opts.navClass + "-" + this.index);
        removeClass(htmlEl, opts.navActiveClass);
        nav.removeAttribute("style");
        nav.removeAttribute("aria-hidden");
        removeEvent(window, "resize", this, false);
        removeEvent(window, "focus", this, false);
        removeEvent(document.body, "touchmove", this, false);
        removeEvent(navToggle, "touchstart", this, false);
        removeEvent(navToggle, "touchend", this, false);
        removeEvent(navToggle, "mouseup", this, false);
        removeEvent(navToggle, "keyup", this, false);
        removeEvent(navToggle, "click", this, false);
        if (!opts.customToggle) {
          navToggle.parentNode.removeChild(navToggle);
        } else {
          navToggle.removeAttribute("aria-hidden");
        }
      },
      toggle: function() {
        if (hasAnimFinished === true) {
          if (!navOpen) {
            this.open();
          } else {
            this.close();
          }
        }
      },
      open: function() {
        if (!navOpen) {
          removeClass(nav, "closed");
          addClass(nav, "opened");
          addClass(htmlEl, opts.navActiveClass);
          addClass(navToggle, "active");
          nav.style.position = opts.openPos;
          setAttributes(nav, {
            "aria-hidden": "false"
          });
          navOpen = true;
          opts.open();
        }
      },
      close: function() {
        if (navOpen) {
          addClass(nav, "closed");
          removeClass(nav, "opened");
          removeClass(htmlEl, opts.navActiveClass);
          removeClass(navToggle, "active");
          setAttributes(nav, {
            "aria-hidden": "true"
          });
          if (opts.animate) {
            hasAnimFinished = false;
            setTimeout(function() {
              nav.style.position = opts.openPos;
              hasAnimFinished = true;
            }, opts.transition + 10);
          } else {
            nav.style.position = opts.openPos;
          }
          navOpen = false;
          opts.close();
        }
      },
      resize: function() {
        if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {
          isMobile = true;
          setAttributes(navToggle, {
            "aria-hidden": "false"
          });
          if (nav.className.match(/(^|\s)closed(\s|$)/)) {
            setAttributes(nav, {
              "aria-hidden": "true"
            });
            nav.style.position = opts.openPos;
          }
          this._createStyles();
          this._calcHeight();
        } else {
          isMobile = false;
          setAttributes(navToggle, {
            "aria-hidden": "true"
          });
          setAttributes(nav, {
            "aria-hidden": "false"
          });
          nav.style.position = opts.closedPos;
          this._removeStyles();
        }
      },
      handleEvent: function(e) {
        var evt = e || window.event;
        switch (evt.type) {
         case "touchstart":
          this._onTouchStart(evt);
          break;

         case "touchmove":
          this._onTouchMove(evt);
          break;

         case "touchend":
         case "mouseup":
          this._onTouchEnd(evt);
          break;

         case "click":
          this._preventDefault(evt);
          break;

         case "keyup":
          this._onKeyUp(evt);
          break;

         case "focus":
         case "resize":
          this.resize(evt);
          break;
        }
      },
      _init: function() {
        this.index = index++;
        removeClass(nav, "closed");
        addClass(nav, opts.navClass);
        addClass(nav, opts.navClass + "-" + this.index);
        addClass(nav, "closed");
        hasAnimFinished = true;
        navOpen = false;
        this._closeOnNavClick();
        this._createToggle();
        this._transitions();
        this.resize();
        var self = this;
        setTimeout(function() {
          self.resize();
        }, 20);
        addEvent(window, "resize", this, false);
        addEvent(window, "focus", this, false);
        addEvent(document.body, "touchmove", this, false);
        addEvent(navToggle, "touchstart", this, false);
        addEvent(navToggle, "touchend", this, false);
        addEvent(navToggle, "mouseup", this, false);
        addEvent(navToggle, "keyup", this, false);
        addEvent(navToggle, "click", this, false);
        opts.init();
      },
      _createStyles: function() {
        if (!styleElement.parentNode) {
          styleElement.type = "text/css";
          document.getElementsByTagName("head")[0].appendChild(styleElement);
        }
      },
      _removeStyles: function() {
        if (styleElement.parentNode) {
          styleElement.parentNode.removeChild(styleElement);
        }
      },
      _createToggle: function() {
        if (!opts.customToggle) {
          var toggle = document.createElement("a");
          toggle.innerHTML = opts.label;
          setAttributes(toggle, {
            href: "#",
            class: "nav-toggle"
          });
          if (opts.insert === "after") {
            nav.parentNode.insertBefore(toggle, nav.nextSibling);
          } else {
            nav.parentNode.insertBefore(toggle, nav);
          }
          navToggle = toggle;
        } else {
          var toggleEl = opts.customToggle.replace("#", "");
          if (document.getElementById(toggleEl)) {
            navToggle = document.getElementById(toggleEl);
          } else if (document.querySelector(toggleEl)) {
            navToggle = document.querySelector(toggleEl);
          } else {
            throw new Error("The custom nav toggle you are trying to select doesn't exist");
          }
        }
      },
      _closeOnNavClick: function() {
        if (opts.closeOnNavClick) {
          var links = nav.getElementsByTagName("a"), self = this;
          forEach(links, function(i, el) {
            addEvent(links[i], "click", function() {
              if (isMobile) {
                self.toggle();
              }
            }, false);
          });
        }
      },
      _preventDefault: function(e) {
        if (e.preventDefault) {
          if (e.stopImmediatePropagation) {
            e.stopImmediatePropagation();
          }
          e.preventDefault();
          e.stopPropagation();
          return false;
        } else {
          e.returnValue = false;
        }
      },
      _onTouchStart: function(e) {
        if (!Event.prototype.stopImmediatePropagation) {
          this._preventDefault(e);
        }
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.touchHasMoved = false;
        removeEvent(navToggle, "mouseup", this, false);
      },
      _onTouchMove: function(e) {
        if (Math.abs(e.touches[0].clientX - this.startX) > 10 || Math.abs(e.touches[0].clientY - this.startY) > 10) {
          this.touchHasMoved = true;
        }
      },
      _onTouchEnd: function(e) {
        this._preventDefault(e);
        if (!isMobile) {
          return;
        }
        if (!this.touchHasMoved) {
          if (e.type === "touchend") {
            this.toggle();
            return;
          } else {
            var evt = e || window.event;
            if (!(evt.which === 3 || evt.button === 2)) {
              this.toggle();
            }
          }
        }
      },
      _onKeyUp: function(e) {
        var evt = e || window.event;
        if (evt.keyCode === 13) {
          this.toggle();
        }
      },
      _transitions: function() {
        if (opts.animate) {
          var objStyle = nav.style, transition = "max-height " + opts.transition + "ms";
          objStyle.WebkitTransition = objStyle.MozTransition = objStyle.OTransition = objStyle.transition = transition;
        }
      },
      _calcHeight: function() {
        var savedHeight = 0;
        for (var i = 0; i < nav.inner.length; i++) {
          savedHeight += nav.inner[i].offsetHeight;
        }
        var innerStyles = "." + opts.jsClass + " ." + opts.navClass + "-" + this.index + ".opened{max-height:" + savedHeight + "px !important} ." + opts.jsClass + " ." + opts.navClass + "-" + this.index + ".opened.dropdown-active {max-height:9999px !important}";
        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = innerStyles;
        } else {
          styleElement.innerHTML = innerStyles;
        }
        innerStyles = "";
      }
    };
    return new ResponsiveNav(el, options);
  };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = responsiveNav;
  } else {
    window.responsiveNav = responsiveNav;
  }
})(document, window, 0);