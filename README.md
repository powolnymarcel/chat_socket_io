## Testé sur ##
- Windows v10.10240
- nodeJS v4.2.2
- npm v3.3.12
- bower v1.6.5

## Executer et tester ##
1. npm install
2. node app.js

## Etapes - bootstraping de l'app ##

1. On commence par créer un package.json pour définir les dépendances de l'app
	- express
	- jade
	- socket.io
2. `npm install` Aura pour effet d'installer les dépendances
3. Créer un fichier d'entrée "app.js"
4. Créer un dossier "views"
5. Créer un dossier "public"
6. Si bower n'est pas installé globalement(-g) sur votre machine 
	1. npm install -g bower
7. Si il est installé
	1. $ bower install bootstrap
	- Créera un dossier "lib" dans le dossier public et y installera bootsrap mais pas seulement car vu que bootstrap à besoin(pas vraiment...) de jquery, bower se chargera d'injecter cette dépendance dans le dossier "lib"

On passe maintenant dans le fichier "app.js"
1. Tout d'abord on appelle tous les packages/fichiers dont on aura besoin
	 `var express = require('express');`
	 `var app = express();`
	 `var path = require('path');`
	 `var serveur = require('http').createServer(app);`
	 `var io = require('socket.io').listen(serveur);`
	 `var utilisateurs = [];`

En 2-3 mots:
La variable "express" est le framework dont on a besoin pour ses outils API
La variable "app" instancie express
La variable "path" permet de gerer les chemins de fichiers sera principalement utilisé dans "app.js"
La variable "server" sera le serveur, on y attache le module "http" et on appelle "createServer" auquel on pass "app" en argument.
La variable "io" instancie socket.io, "io" écoute tout se qui se passe sur le serveur avec .listen(server)
La variable "utilisateurs" gèrera tous les utilisateurs qui seront sur le site, un stockage dans un array....



Modifier + main.js :

// Definition du moteur de vue

application.set('views', __dirname + '/vues');
application.set('view engine','jade');
application.engine('jade', require('jade').__express);

// Definition un chemin statique
application.use(express.static(path.join(__dirname, 'public')));

//Connexion au socket, tout ce qui sera fait sur le coté serveur tournera dasn cette fn
io.sockets.on('connection',function(socket){
	socket.on('definir utilisateur', function(data,callback){
		if(utilisateurs.indexOf('marta') != -1){

			// . utilisateur ??????



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













## Infos ##
*Utilisation de MarkdownPad 2 pour creer des "*.md"

*Utilisation du site http://html2jade.org/ pour convertir des template html en jade.*

**Questions?** [Via twitter](https://twitter.com/Marcpowo) ou mieux [Créer un rapport](https://github.com/powolnymarcel/siteExpressReparationPC/issues)
