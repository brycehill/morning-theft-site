var MT = MT || {};


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