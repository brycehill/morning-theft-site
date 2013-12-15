var MT = MT || {};

MT = (function() {

  var form = MT.Forms,
      photos = MT.Photos;

  function bindEvents() {
    $('form').on('submit', form.submit);
    $('input[name=email]').on('blur', form.validateEmail);
    $('input[name=name]').on('blur', form.validateName);

    $('.gallery img').on('click', photos.openInstagramWindow);
    $('#instagram-button').on('click', photos.toggle);
    $('#live-button').on('click', photos.toggle);
    $('body#photos').on('load', function(){
      // console.log('photos page loaded')
    })
  }

  function init() {
    bindEvents();
  }

  return {
    init: init
  };

})();