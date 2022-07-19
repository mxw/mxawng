function disqus_config() {
  this.callbacks.onReady = [function() {
    if (location.hash == '#disqus_thread') {
      $('html, body').animate({
        scrollTop: $('#disqus_thread').offset().top
      }, 400);
      return false;
    }
  }];
}
