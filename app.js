var express = require('express');
var application = express();
var path = require('path');
var serveur = require('http').createServer(application);
var io = require('socket.io').listen(serveur);
var utilisateurs = [];
var open = require('open');

// Definition du moteur de vue

application.set('views', __dirname + '/vues');
application.set('view engine','jade');
application.engine('jade', require('jade').__express);

// Definition un chemin statique
application.use(express.static(path.join(__dirname, 'public')));

//On défini les routes
application.get('/', function(req,res){
	res.render('index');
});

// Demarrage du serveur
var port = process.env.PORT || 3000;
serveur.listen(port);
console.log('************************************************************');
console.log('Le serveur est execute, rendez-vous sur : localhost:' + port);
console.log('************************************************************');
open('http://localhost:' + port);
