/*
 * image-wrap.js - Image tricks from
 * http://webdesignerwall.com/tutorials/css3-image-styles-part-2
 */

$(document).ready(function() {
  $('img.image-wrap').each(function() {
    $(this).wrap(function() {
      return $(document.createElement('span'))
        .addClass($(this).attr('class'))
        .css('width', 'auto')
        .css('height', 'auto');
    });
    $(this).removeAttr('class');
  });
});
