var MT = MT || {};

MT.Forms = (function() {

  var msg = $('.message-pane'),
      $win = $(window);

  function submit(e) {
    var form = $(this),
        loader = $('<img>').attr('src', 'images/loader.gif');

    if (!validateForm(form)) return false;

    msg.show().html(loader);

    $.ajax({
      url: form.attr('action'),
      method: form.attr('method'),
      data: form.serialize()
    }).then(signupComplete, formError);

    e.preventDefault();
  }

  function formError(jqXHR) {
    var data;

    if (jqXHR.responseJSON) {
      data = jqXHR.responseJSON;
    }

    msg.show().text(data.error);
  }

  function signupComplete(data) {
    msg.show()
       .removeClass('error-message')
       .text('Thanks! Keep an eye out for your confirmation email to finalize your subscription.');
  }

  function validateForm(form) {
    if (validateEmail() && validateName()) {
      return true;
    }

    return false;
  }

  function validateEmail() {
    var email = $('input[name=email]').val(),
        emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        text = '';

    if (!emailRegex.test(email)) {
      text = 'Make sure your email address is valid.';
      msg.show().addClass('error-message').text(text);
      return false;
    }

    msg.text(text);
    return true;
  }

  function validateName() {
    var name = $('input[name=name]').val(),
        nameRegex = /[a-zA-Z\s]+/,
        text = '';

    if (!nameRegex.test(name)) {
      text = 'Please provide a valid name';
      msg.show().addClass('error-message').text(text);
      return false;
    }

    msg.text(text);
    return true;
  }

  return {
    submit: submit,
    validateEmail: validateEmail,
    validateName: validateName
  };

}());;var MT = MT || {};

MT.Photos = (function() {
  $win = $(window);

  function openInstagramWindow(e) {
    var target = $(e.target),
        link = target.data('link'),
        width = 550,
        left = ($win.width() / 2) - (width / 2),
        top = 50,
        opts = 'toolbar=no,menubar=no,tabbar=no,height=650,width=' + width + ',dialog=yes,' +
               'resizable=yes,left=' + left + ',top=' + top,
        newWin;

    newWin = window.open(link, 'title', opts);

    return false;
  }

  function showTab(type) {
    $('#'+type+'-photos').show();
  }

  function toggle(e) {
    $('.gallery').hide();
    showTab($(e.target).data('type'));
  }

  return {
    openInstagramWindow: openInstagramWindow,
    toggle: toggle
  };

}());;var MT = MT || {};

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