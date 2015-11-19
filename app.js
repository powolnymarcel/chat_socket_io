var express = require('express');
var application = express();
var path = require('path');
var serveur = require('http').createServer(application);
var io = require('socket.io').listen(serveur);
var utilisateurs = [];
//var open = require('open');

// Definition du moteur de vue

application.set('views', __dirname + '/vues');
application.set('view engine','jade');
application.engine('jade', require('jade').__express);

// Definition un chemin statique
application.use(express.static(path.join(__dirname, 'public')));

//Connexion au socket, tout ce qui sera fait sur le coté serveur tournera dasn cette fn
io.sockets.on('connection',function(socket){
	socket.on('definir utilisateur', function(data,callback){
		if(utilisateurs.indexOf(data) != -1){
			callback(false)
		}else{
			callback(true);
			socket.utilisateur = data.utilisateur;
			socket.urlAvatar = data.urlAvatar;
			utilisateurs.push({
				utilisateur: data.utilisateur,
				urlAvatar : data.urlAvatar
			});
			mettreAjourUtilisateurs();
		}
	});

	function mettreAjourUtilisateurs(){
		io.sockets.emit('utilisateurs',utilisateurs);
		console.log(utilisateurs);
		console.log('*************');
	}
});


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
//open('http://localhost:' + port);
