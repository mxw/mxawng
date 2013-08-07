/*
 * rhythm.js - Apply vertical rhythm to arbitrary DOM elements.
 *
 * Loosely adapted from baseline.js by Ben Howdle (http://twostepmedia.co.uk).
 * https://github.com/daneden/Baseline.js/blob/master/baseline.js
 */

var rhythm = function() {
  return {
    adjust: function(selector, rhythm) {
      if (selector === undefined || rhythm === undefined) return false;

      var elements = document.querySelectorAll(selector);
      var readjust = this._setmargins.bind(this, elements, rhythm);

      if (window.addEventListener) {
        window.addEventListener('resize', readjust, false);
      } else if (window.attachEvent) {
        window.attachEvent('onresize', readjust);
      }
      readjust();
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

    _setmargins: function(elements, rhythm) {
      var lineheight = this._absolute(rhythm);

      for (var i = 0; i < elements.length; i++) {
        var elt = elements[i];

        var lines = Math.ceil(elt.offsetHeight / lineheight);
        var margin = lines * lineheight - elt.offsetHeight;

        elt.style.marginTop = margin / 2 + 'px';
        elt.style.marginBottom = margin / 2 + 'px';
        elt.style.maxHeight = 'none';
      }
    }
  };
}();

rhythm.adjust('canvas', '1.25rem');
