var MT = MT || {};


MT = (function() {

  var Events = MT.Events;

  function bindEvents() {
    var form = $('form');

    form.on('submit', Events.submitForm);
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