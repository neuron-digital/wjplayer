(function() {

  window.getQueryParam = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  if (!!getQueryParam('ads')) {
    var adTagUrl = getQueryParam('adTagUrl');
    window.ads = {
      debug: true,
      adLabel: 'Test Advertisement',
      contribAdsSettings: {
        timeout: 1000
      },
      adTagUrl: adTagUrl ? adTagUrl : 'https://data.videonow.ru/?profile_id=1&format=vast&container=postroll&vpaid=js'
    };
  }

})();
