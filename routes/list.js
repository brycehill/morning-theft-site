var MC = require('mailchimp-api').Mailchimp,
    config = require('../config'),
    errors = require('../errorHandler');

// TODO move this into a config object.
var mc = new MC(config.mailchimp.key);

function validateInput(input, cb) {
    var email = input.email,
        name = input.name,
        emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        nameRegex = /[a-zA-Z\s]+/;

    // TODO fix this:
    if (!email) return cb(new Error('Please provide an email address'));
    if (!name) return cb(new Error('Please enter your name'));
    if (!emailRegex.test(email)) return cb(new Error('Please provide a valid email address'));
    if (!nameRegex.test(name)) return cb(new Error('Please provide a valid name'));

    name = capitalize(name).trim();

    return cb(null, { email: email, name: name });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


var subscribeSuccess = function(userData) {
    res.send(200, userData);
};

// err includes status, code, name, error message
var subscribeError = function(err) {
  console.log('errro');
  console.log(arguments);
    // check for already subscribed
  switch (err.name) {
  case 'List_AlreadySubscribed':
    errors.clientError(new Error('Looks like you already signed up for this list. Thanks!'));
    break;
  default:
    errors.clientError(new Error('Uh-oh something broke. Please try again.'));
  }
};

/**
 * Adds the email addr
 * @return {[type]}     [description]
 */
exports.post = function(req, res) {
  var input = {
        email: req.body.email,
        name: req.body.name
      };

  validateInput(input, function(err, data) {
    console.log(err);
    if (err) errors.clientError(err);
console.log('validated');
console.log(data);
    // TODO add this to a config
    mc.lists.subscribe({
        id: config.mailchimp.list.id,
        email: { email: data.email },
        merge_vars: { FNAME: data.name }
      }, subscribeSuccess, subscribeError);
  });
};