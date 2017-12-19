# Accounts Monzo
This package allows you to SSO (Single Sign on) into Monzo using OAuth2.


### Limitations
At the time of writing, the Monzo API is restricted to users who are explicitly whitelisted [See the blog post](https://monzo.com/blog/2017/05/11/api-update/)

The Monzo API also only supports redirect style login and requires users to click a link in their email.

### Getting started
Like most Meteor OAuth packages, this uses the `ServiceConfiguration` class to manage secure credentials, so get your Monzo ID and secret and do the following on the server side

```JavaScript
Meteor.startup(() => {
    ServiceConfiguration.configurations.upsert(
      { service: "monzo" },
      { $set: { clientId: "client", secret: "secret" } }
    ); 
});

```
Now you can call
```JavaScript
Meteor.loginWithMonzo(function(error){
    if(error){
        
    }
});

``` 
OR

```JavaScript
Meteor.loginWithMonzo(options, function(error){
    if(error){
        
    }
})

```

### Further Info
At the time of writing I can't fully vouch for the stability of this package, if you find anything that could be improved, please create an issue or even drop a PR :)