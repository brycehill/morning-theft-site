var NotFound = require('../NotFound.js');


exports.index = function(req, res){
  var locals = {
    title: 'Morning Theft :: Home'
  };

  res.render('home');
};

exports.mailinglist = function(req, res) {
  var locals = {
    title: 'Morning Theft :: Mailing List Sign-up'
  };
  res.render('mailinglist.jade', locals);
};

exports.handleNotFound = function(req, res, next){
    next(new NotFound());
}