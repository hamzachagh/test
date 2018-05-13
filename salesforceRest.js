var nforce = require('nforce');


var org = nforce.createConnection({
  clientId: '3MVG9Rd3qC6oMalXcM8hVxjOJvhYFvfY_wIr99DZ23Y_nlfVWpJsw1bRzL_eKt6E31PskZRiL5sgdbXsYA3s.',
  clientSecret: '8971956947311806869',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: 'v42.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'single', // optional, 'single' or 'multi' user mode, multi default
  autoRefresh: true
});




// single-user mode
org.authenticate({ username: 'hamzachagh2@gmail.com', password: 'Hamza_SE2018'}, function(err, resp){
    // the oauth object was stored in the connection object
    //if(!err) console.log('Cached Token: ' + org.oauth.access_token)

    org.query({ query: 'SELECT Id, name FROM Lead limit 1 ' }, function(err, res) {
        if(err) return console.error(err);
        else 
         
        console.log(res.records);
        

      })
});



module.exports.org  = org;
