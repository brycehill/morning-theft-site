var MT = MT || {};


MT = (function() {

  var Events = MT.Events;

  function bindEvents() {
    var form = $('form');

    form.on('submit', Events.submitForm);
    $('input[name=email]').on('blur', Events.validateEmail);
    $('input[name=name]').on('blur', Events.validateName);
  }

  function init() {
    bindEvents();
  }

  return {
    init: init
  };

})();