Accounts.oauth.registerService('monzo');

if (Meteor.isClient) {
  const loginWithMonzo = function(options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Monzo.requestCredential(options, credentialRequestCompleteCallback);
  };
  Accounts.registerClientLoginFunction('monzo', loginWithMonzo);
  Meteor.loginWithMonzo = function () {
    return Accounts.applyLoginFunction('monzo', arguments);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.monzo'],
    forOtherUsers: ['services.monzo.id']
  });
}