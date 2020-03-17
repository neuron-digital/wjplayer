(function() {

  function getQueryParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  window.getQueryParam = getQueryParam;

  if (getQueryParam('ads')) {
    var adTagUrl = getQueryParam('adTagUrl');
    window.ads = {
      debug: true,
      adLabel: 'Test Advertisement',
      contribAdsSettings: {
        prerollTimeout: 500
      },
      adTagUrl: adTagUrl
        ? adTagUrl
        : 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpost&cmsid=496&vid=short_onecue&correlator='
    };
  }

})();
