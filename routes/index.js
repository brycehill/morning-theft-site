exports.index = function(req, res){
  res.redirect('mailinglist');
};

exports.mailinglist = function(req, res) {
  var locals = {
    title: 'Morning Theft :: Mailing List Sign-up'
  };
  res.render('mailinglist.jade', locals);
};