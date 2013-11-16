var MT = MT || {};

MT.Events = (function() {


    function submitForm(e) {
      var form = $(this);

      $.ajax({
        url: form.attr('action'),
        method: form.attr('method'),
        data: form.serialize()
      }).then(signupComplete, formError);

      e.preventDefault();
    }


    function formError() {
        console.log('err');
        console.log(arguments);
    }

    function signupComplete() {
        console.log('success');
        console.log(arguments);
    }

    return {
      submitForm: submitForm
    };

}());;var MT = MT || {};


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