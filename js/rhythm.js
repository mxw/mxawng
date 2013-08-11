/*
 * rhythm.js - Apply vertical rhythm to arbitrary DOM elements.
 *
 * Very loosely adapted from baseline.js by Ben Howdle.
 * https://github.com/daneden/Baseline.js/blob/master/baseline.js
 */

var rhythm = function() {
  return {
    adjust: function(selector, rhythm) {
      if (selector === undefined) return false;
      rhythm = rhythm || '1.25rem';

      var elements = document.querySelectorAll(selector);
      var readjust = this._pad.bind(this, elements, rhythm);

      readjust();
      this._listen(window, 'resize', readjust);
    },

    _listen: function(target, event, handler) {
      if (target.addEventListener) {
        target.addEventListener(event, handler, false);
      } else if (target.attachEvent) {
        target.attachEvent('on' + event, handler);
      }
    },

    _absolute: function(rhythm) {
      var div = document.createElement('div');
      div.style.position = 'fixed';
      div.style.visibility = 'hidden';
      div.style.margin = 0;
      div.style.padding = 0;
      div.style.border = 0;
      div.style.height = rhythm;

      document.body.appendChild(div);
      var lineheight = div.offsetHeight;
      document.body.removeChild(div);

      return lineheight;
    },

    _pad: function(elements, rhythm) {
      var lineheight = this._absolute(rhythm);

      for (var i = 0; i < elements.length; i++) {
        var elt = elements[i];

        var lines = Math.ceil(elt.offsetHeight / lineheight);
        var padding = lines * lineheight - elt.offsetHeight;

        elt.style.paddingTop = padding / 2 + 'px';
        elt.style.paddingBottom = padding / 2 + 'px';
        elt.style.maxHeight = 'none';
      }
    },
  };
}();

rhythm.adjust('figure');
