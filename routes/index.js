var NotFound = require('../NotFound.js'),
    Instagram = require('../lib/instagram');

// Move this out of here

exports.index = function(req, res){
  var locals = {
    title: 'Morning Theft :: Home',
    description: 'Cyber home of the band Morning Theft',
    selectedLink: 'home'
  };

  res.render('home', locals);
};

exports.mailinglist = function(req, res) {
  var locals = {
    title: 'Morning Theft :: Mailing List Sign-up',
    description: 'Sign up for Morning Theft\'s mailing list to be the first to gain ' +
                 'access to exclusive music and news first.',
    selectedLink: 'mailing_list'
  };
  res.render('mailinglist', locals);
};

exports.press = function(req, res) {
  var locals = {
    title: 'Morning Theft :: Press',
    description: 'Read press about Morning Theft.',
    selectedLink: 'press'
  };
  res.render('press', locals);
};

exports.shows = function(req, res) {
  var locals = {
    title: 'Morning Theft :: Shows',
    description: 'Upcoming Morning Theft shows.',
    selectedLink: 'shows'
  };
  res.render('shows', locals);
};

exports.music = function(req, res) {
  var locals = {
    title: 'Morning Theft :: Music',
    description: 'Listen to music by the band Morning Theft.',
    selectedLink: 'music'
  };
  res.render('music', locals);
};

exports.photos = function(req, res, next) {

  // Get all the photos we are going to display,
  // let the instagram module handle all the logical bits
  Instagram.getAll(function(err, photos) {
    if (err) next(err);
    console.log('get All callback');
    console.log(photos);
  })

  var locals = {
    title: 'Morning Theft :: Photos',
    description: 'Check out photos of the band Morning Theft.',
    selectedLink: 'photos'
  };

  res.render('photos', locals);
};

exports.connect = function(req, res) {
  var locals = {
    title: 'Morning Theft :: Connect',
    description: 'Connect with the band Morning Theft on social networks like Facebook, ' +
                 'Twitter, and Instagram. Also join their mailing list.',
    selectedLink: 'connect'
  };
  res.render('connect', locals);
};

exports.handleNotFound = function(req, res, next){
    next(new NotFound());
};