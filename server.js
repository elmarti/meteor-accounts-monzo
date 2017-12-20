Monzo = {};

OAuth.registerService('monzo', '2', null, function(query) {
  var response = getAccessToken(query);
  var accessToken = response.access_token;
  
  var expiresAt = (+new Date) + (1000 * response.expires_in);

  return {
    serviceData: {
      accessToken: accessToken,
      expiresAt: expiresAt
    },
     options: { profile: { name: response.user_id } }
  };
});

var getAccessToken = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'monzo'});
  if (!config){
    throw new ServiceConfiguration.ConfigError();
  }
  if(config.loginStyle === undefined){
    config.loginStyle = "redirect";
  }
  try {
  
    var response = HTTP.post(
      "https://api.monzo.com/oauth2/token", {headers: {Accept: 'application/json'}, params: {
        code: query.code,
        client_id: config.clientId,
        client_secret: OAuth.openSecret(config.secret),
        grant_type: 'authorization_code',
        redirect_uri: OAuth._redirectUri('monzo', config)
      }});
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Monzo. " + err.message),
                   {response: err.response});
  }

  if (response.data.error) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with Monzo. " + response.data.error);
  } else {
    return response.data;
  }
};


Monzo.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};