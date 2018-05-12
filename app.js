'use strict';
// Module Dependencies
// -------------------
var express     = require('express');


var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');
var salesforceRest = require('./salesforceRest.js');
var app = express();

// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.raw({type: 'application/jwt'}));
//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// HubExchange Routes
app.get('/', routes.index );
app.post('/login', routes.login );
app.post('/logout', routes.logout );

app.get('/testing', (req , res) => {



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
        res.send('hellooooo '+ res.records);

      })
});


  
});

// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save );
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
app.post('/journeybuilder/execute/', activity.execute );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});