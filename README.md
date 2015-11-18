## Testé sur ##
- Windows v10.10240
- nodeJS v4.2.2
- npm v3.3.12
- bower v1.6.5

## Executer et tester ##
1. npm install
2. node app.js

## Etapes ##

1. On commence par créer un package.json pour définir les dépendances de l'app
    {
      "name": "chat_socket_io",
      "version": "1.0.0",
      "description": "",
      "dependencies": {
    "bower": "^1.6.5",
    "express": "*",
    "jade": "*",
    "socket.io": "*"
      },
      "author": "poma",
      "license": "ISC"
    }

2. `npm install` Aura pour effet d'installer les dépendances
3. Créer un fichier d'entrée "app.js"
4. Créer un dossier "views"
5. Créer un dossier "public"
6. Si bower n'est pas installé globalement(-g) sur votre machine 
	1. npm install -g bower
7. Si il est installé
	1. $ bower install bootstrap
	- Créera un dossier "lib" dans le dossier public et y installera bootsrap mais pas seulement car vu que bootstrap à besoin(pas vraiment...) de jquery, bower se chargera d'injecter cette dépendance dans le dossier "lib"


## Infos ##
*Utilisation de MarkdownPad 2 pour creer des "*.md"

*Utilisation du site http://html2jade.org/ pour convertir des template html en jade.*

**Questions?** [Via twitter](https://twitter.com/Marcpowo) ou mieux [Créer un rapport](https://github.com/powolnymarcel/siteExpressReparationPC/issues)
