var MT = MT || {};

MT.Events = (function() {

  var msg = $('.message-pane');

  function submitForm(e) {
    var form = $(this),
        loader = $('<img>').attr('src', 'images/loader.gif');

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
       .text('Thanks! Keep an eye out for your confirmation email to finalize your subscription.');
  }

  function validateForm() {
    var form = $(this);
        email = $('input[name=email]').val(),
        name = $('input[name=name]');

    // if (!email)
  }

  function validateEmail() {
    var email = $(this).val(),
        emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        text = '';

    if (!emailRegex.test(email)) text = 'Make sure your email address is valid.';

    msg.show().text(text);
  }

  function validateName() {
    var name = $(this).val(),
        nameRegex = /[a-zA-Z\s]+/;
        text = '';

    if (!nameRegex.test(name)) text = 'Please provide a valid name';

    msg.show().text(text);
  }

  return {
    submitForm: submitForm,
    validateForm: validateForm,
    validateEmail: validateEmail,
    validateName: validateName
  };

}());;var MT = MT || {};


MT = (function() {

  var Events = MT.Events;

  function bindEvents() {
    var form = $('form');

    form.on('submit', Events.submitForm);
    form.on('blur', Events.validateForm);
    $('input[name=email]').on('blur', Events.validateEmail);
    $('input[name=name]').on('blur', Events.validateName);
  }

  function init() {
    console.log('initing');
    bindEvents();
  }



  function initPlugins() {

  }

  return {
    init: init
  };

})();