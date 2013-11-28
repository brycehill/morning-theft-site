var NotFound = require('../NotFound.js');


exports.index = function(req, res){
  var locals = {
    title: 'Morning Theft :: Home',
    description: 'Cyber home of the band Morning Theft'
  };

  res.render('home', locals);
};

exports.mailinglist = function(req, res) {
  var locals = {
    title: 'Morning Theft :: Mailing List Sign-up',
    description: 'Sign up for Morning Theft\'s mailing list to be the first to gain ' +
                 'access to exclusive music and news first.'
  };
  res.render('mailinglist', locals);
};

exports.press = function(req, res) {
  var locals = {
    title: 'Morning Theft :: Press',
    description: 'Read press about Morning Theft.'
  };
  res.render('press', locals);
};

exports.shows = function(req, res) {
  var locals = {
    title: 'Morning Theft :: Shows',
    description: 'Upcoming Morning Theft shows.'
  };
  res.render('shows', locals);
};

exports.handleNotFound = function(req, res, next){
    next(new NotFound());
};