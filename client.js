Monzo = {};

// Request Github credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Monzo.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'monzo'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }
  var credentialToken = Random.secret();

  var loginUrl =
    'https://auth.getmondo.co.uk' +
    '?client_id=' + config.clientId +
    '&redirect_uri=' + OAuth._redirectUri('monzo', config) +
    '&response_type=code' + 
    '&state=' + OAuth._stateParam('redirect', credentialToken, options && options.redirectUrl);;

  OAuth.launchLogin({
    loginService: "monzo",
    loginStyle: 'redirect',
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {width: 900, height: 450}
  });
};