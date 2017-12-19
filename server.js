Monzo = {};

OAuth.registerService('monzo', 2, null, function(query) {

  var response = getAccessToken(query);
  var accessToken = response.access_token;
  var expiresAt = (+new Date) + (1000 * response.expires_in);
  var identity = getIdentity(accessToken);

  return {
    serviceData: {
      id: identity.user_id,
      accessToken: accessToken,
      expiresAt: expiresAt
    },
    options: {profile: {name: identity.name}}
  };
});

var getAccessToken = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'monzo'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var response;
  try {
  
  
    response = HTTP.post(
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

var getIdentity = function (accessToken) {
  try {
    var response = HTTP.get(
      "https://api.monzo.com/ping/whoami",
      {params: {access_token: accessToken}});
    return response.data.results && response.data.results[0];
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Monzo. " + err.message),
                   {response: err.response});
  }
};


Monzo.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};