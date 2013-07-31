/*
 * image-wrap.js - Image tricks from
 * http://webdesignerwall.com/tutorials/css3-image-styles
 */

$(window).load(function() {
  $('.img-inner').each(function() {
    $(this).wrap(function() {
      image = $(this);
      wrapper = $(document.createElement('span'));

      wrapper.addClass('img-wrapper');
      wrapper.addClass(image.attr('class'));
      wrapper.removeClass('img-inner');

      wrapper.css('background', 'url(' + image.attr('src') + ') no-repeat center center');
      wrapper.css('width', image.width() + 'px');
      wrapper.css('height', image.height() + 'px');

      return wrapper;
    });
    $(this).css('opacity', '0');
  });
});
