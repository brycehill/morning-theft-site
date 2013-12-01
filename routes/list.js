var MC = require('mailchimp-api').Mailchimp,
    config = require('../config'),
    errors = require('../errorHandler'),
    mc = new MC(config.mailchimp.key),
    geoip = require('geoip-lite');

function validateInput(input, cb) {
  var email = input.email,
      name = input.name,
      emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      nameRegex = /[a-zA-Z\s]+/;

  if (!email || !emailRegex.test(email)) return cb(new Error('Make sure your email address is valid.'));
  if (!name || !nameRegex.test(name)) return cb(new Error('Please provide a valid name'));

  name = capitalize(name).trim();

  return cb(null, { email: email, name: name });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Adds the email address to the list - the only one we have!
 */
exports.post = function(req, res, next) {
  var input = {
        email: req.body.email,
        name: req.body.name
      },
      ip = req.headers['X-Forwarded-For'] || req.connection.remoteAddress,
      geo = geoip.lookup(ip),
      country = '',
      region = '',
      city = '';
console.log(req.headers);
console.log(req.connection);
console.log(ip);

  if (geo) {
    country = geo.country;
    region = geo.region;
    city = geo.city;
  }

  // Get Location of user.
  validateInput(input, function(err, data) {
    if (err) next(err);

    mc.lists.subscribe({
        id: config.mailchimp.list.id,
        email: { email: data.email },
        merge_vars: {
          FNAME: data.name,
          COUNTRY: country,
          REGION: region,
          CITY: city }
      }, function(userData) {
        res.send(200);
      }, function(err) {
        // err is an object that includes status, code, name, error message
        if (err.name === 'List_AlreadySubscribed') {
          next(new Error('Looks like you already signed up for our list. Thanks!'));
        } else {
          console.log(err);
          next(new Error('Uh-oh something broke. Please try again.'));
        }
    });
  });
};