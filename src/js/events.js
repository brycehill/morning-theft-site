var MT = MT || {};

MT.Events = (function() {

  var msg = $('.message-pane');

  function submitForm(e) {
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
      return false
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
      return false
    }

    msg.text(text);
    return true;
  }

  return {
    submitForm: submitForm,
    validateEmail: validateEmail,
    validateName: validateName
  };

}());