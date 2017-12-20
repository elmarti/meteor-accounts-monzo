//jshint esversion: 6
Package.describe({
    name: 'elmarti:accounts-monzo',
    version: '1.0.0',
    summary: 'OAuth login for the Monzo API',
    git: 'https://github.com/elmarti/meteor-accounts-monzo',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.use('ecmascript');
    api.use('accounts-base', ['client', 'server']);
    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base', ['client', 'server']);

    api.use('http');
    api.use('accounts-oauth', ['client', 'server']);
    api.imply('accounts-oauth', ['client', 'server']);
    api.use('oauth2', ['client', 'server']);
    api.use('oauth', ['client', 'server']);
    api.use('service-configuration', ['server', 'client']);
    api.use('random');
    api.addFiles('server.js', 'server');
    api.addFiles(['index.js']);
    api.addFiles('client.js', 'client');
});
