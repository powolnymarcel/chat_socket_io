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

## On entre maintenant dans le fichier "app.js" ##
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

----------



- Définir le moteur de vues, avec express on peut utiliser différents moteur de vues, ici on utilise celui par defaut JADE.

On défini le dossier ou seront placées les vues, Le dossier utilisé sera 'vues'

    application.set('views', __dirname + '/vues');

On défini le moteur JADE

    application.set('view engine','jade');
    application.engine('jade', require('jade').__express);


On défini un chemin statique pour les images, css, JS public,... Le dossier utilisé sera 'public'

    application.use(express.static(path.join(__dirname, 'public')));

----------
Definition des routes 
le 'render' va aller chercher la vue index.jade

    application.get('/', function(req,res){
    	res.render('index');
    });

----------

- Demarrage du serveur sur le port par défaut ou sur le port 3000
var port = process.env.PORT || 3000;

- Le serveur écoute sur le port
serveur.listen(port);

- 3 consoles log pour afficher dans l'invite de commande un message
console.log('************************************************************');
console.log('Le serveur est execute, rendez-vous sur : localhost:' + port);
console.log('************************************************************');

----------
Voir index.jade pour le front

----------


# Les fonctionnalités #
2 fichiers seront nécessaires, le fichier coté serveur 'app.js' et le fichier coté client 'main.js' qui sera utilisé avec Jquery pour émettre des evenements via les sockets.

app.js:

Voir les commentaires inline:

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

----------

On va travailler le fichier main.js















## Infos ##
*Utilisation de MarkdownPad 2 pour creer des "*.md"

*Utilisation du site http://html2jade.org/ pour convertir des template html en jade.*

**Questions?** [Via twitter](https://twitter.com/Marcpowo) ou mieux [Créer un rapport](https://github.com/powolnymarcel/siteExpressReparationPC/issues)
