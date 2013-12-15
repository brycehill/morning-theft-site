var MT = MT || {};

MT.Photos = (function() {
  $win = $(window);

  function openInstagramWindow(e) {
    var target = $(e.target),
        link = target.data('link'),
        width = 550,
        left = ($win.width() / 2) - (width / 2),
        top = 50,
        opts = 'toolbar=no,menubar=no,tabbar=no,height=650,width=' + width + ',dialog=yes,' +
               'resizable=yes,left=' + left + ',top=' + top,
        newWin;

    newWin = window.open(link, 'title', opts);

    return false;
  }

  function showTab(type) {
    $('#'+type+'-photos').show();
  }

  function toggle(e) {
    $('.gallery').hide();
    showTab($(e.target).data('type'));
  }

  return {
    openInstagramWindow: openInstagramWindow,
    toggle: toggle
  };

}());