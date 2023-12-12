/*
 * rhythm.js - apply vertical rhythm to arbitrary DOM elements.
 *
 * very loosely adapted from baseline.js by Ben Howdle.
 * https://github.com/daneden/Baseline.js/blob/master/baseline.js
 */

const rhythm = function() {
  return {
    adjust: function(selector, rhythm) {
      if (selector === undefined) return false;
      rhythm = rhythm ?? '1.25rem';

      const elements = document.querySelectorAll(selector);
      const readjust = this._pad.bind(this, elements, rhythm);

      readjust();
      this._listen(window, 'resize', readjust);
      this._listen(document, 'load', readjust);
    },

    _listen: function(target, event, handler) {
      if (target.addEventListener) {
        target.addEventListener(event, handler, false);
      } else if (target.attachEvent) {
        target.attachEvent('on' + event, handler);
      }
    },

    _absolute: function(rhythm) {
      const div = document.createElement('div');
      div.style.position = 'fixed';
      div.style.visibility = 'hidden';
      div.style.margin = 0;
      div.style.padding = 0;
      div.style.border = 0;
      div.style.height = rhythm;

      document.body.appendChild(div);
      const lineheight = div.offsetHeight;
      document.body.removeChild(div);

      return lineheight;
    },

    _pad: function(elements, rhythm) {
      const lineheight = this._absolute(rhythm);

      for (var i = 0; i < elements.length; i++) {
        const elt = elements[i];
        if (elt.classList.contains('norhythm')) continue;

        const accent = elt.classList.contains('noaccent') ? 0 : 10;
        const height = elt.offsetHeight + accent;

        const lines = Math.ceil(height / lineheight);
        const padding = lines * lineheight - height;

        const padding_top = parseInt(elt.style.paddingTop || 0);
        const padding_bot = parseInt(elt.style.paddingBottom || 0);

        elt.style.paddingTop    = (padding_top + (padding / 2)) + 'px';
        elt.style.paddingBottom = (padding_bot + (padding / 2)) + 'px';
        elt.style.maxHeight = 'none';
      }
    },
  };
}();

document.addEventListener('DOMContentLoaded', ev => rhythm.adjust('figure'));
window.addEventListener('load', ev => rhythm.adjust('figure'));
