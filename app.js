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
	// Quand on enverra le form au niveau du front end c'est cette action que cela déclenchera
	socket.on('definir utilisateur', function(data,callback){
		//Etant donné qu'on a un tableau d'objet on doit itérer dans ce tableau pour trouver l'utilisateur.
		//Définition d'une variable
		var dejaEnligne = false;
		//Pour tous les utilisateurs
		for(var i = 0; i < utilisateurs.length; i++) {
			//Si utilisateur[n ou i, n car bien que nul en math, c'est comme ça qu'on nomme un nombre non ?]
			//Je disais: Si utilisateur[n] est égal à un utilisateur en ligne
			if (utilisateurs[i].utilisateur == data.utilisateur) {
				// On set la variable à true
				dejaEnligne = true;
				// Et on arrete tout ici!
				break;
			}
		}
		// Si la variable dejaEnligne est à true on affiche un message d'erreur sur la console du serveur
		// Afaire: Inserer un flash pour indiquer que le pseudo est déjà pris, easy! Je crois....
		if(dejaEnligne){
			console.log('Pseudo déjà utilisé');
			//On renvoie false
			return false;
		}else{
			callback(true);
			//Le socket utilisateur courant prendra la valeur de ce qui sera envoyé par le form
			socket.utilisateur = data.utilisateur;
			socket.urlAvatar = data.urlAvatar;
			//On push pour l'ajouter au tableau (array)
			utilisateurs.push({
				utilisateur: data.utilisateur,
				urlAvatar : data.urlAvatar
			});
			//On appelle la fn mettreAjourUtilisateurs qui mettra à jour la liste de users
			mettreAjourUtilisateurs();
		}
	});

	function mettreAjourUtilisateurs(){
		//Emission de la liste d'utilisateurs
		io.sockets.emit('utilisateurs',utilisateurs);
		console.log(utilisateurs);
		console.log('*************');
	}

	socket.on('disconnect',function(data){
		if(!socket.utilisateur)return;
		//splice pour remover une valeur ou un index, hors d'un array
		utilisateurs.splice(utilisateurs.indexOf(socket.utilisateur),1);
		mettreAjourUtilisateurs();


	})
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
