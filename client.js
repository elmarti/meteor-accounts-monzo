Monzo = {};

// Request Monzo credentials for the user
// @param options {optional}
Monzo.requestCredential = function(options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  const config = ServiceConfiguration.configurations.findOne({ service: 'monzo' });

  config.loginStyle = "redirect";
  const credentialToken = Random.secret();
  const redirectUrl = OAuth._redirectUri('monzo', config);
  const loginUrl =
    'https://auth.getmondo.co.uk?client_id=' + config.clientId +
    '&response_type=code' +
    '&state=' + OAuth._stateParam('redirect', credentialToken, options && options.redirectUrl) +
    '&redirect_uri=' + redirectUrl;

  OAuth.launchLogin({
    loginService: "monzo",
    loginStyle: 'redirect',
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken
  });
};
