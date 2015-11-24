$(document).ready(function(){
	//On aura quelques variables:
	// Un tableau vide pour les messages
	var messages = [];
	// On a besoin du socket
	var socket = io.connect('http://localhost:3000');

	//On récupère les données du form pour tchatter
		// Le textarea du  tchat
		var texteDuChat= $('#texteDuChat');
		//Le form du tchat
		var formulaireDeChat= $('#formulaireDeChat');
		//La zone de tchat
		var fenetreDeChat= $('#fenetreDeChat');
	//On récupère les données du form pour l'ajout utilisateur
		//Le form d'ajout utilisateur
		var formAjoutUtilisateur= $('#formAjoutUtilisateur');
		// le input pour le nom d'utilisateur
		var pseudo= $('#pseudo');
		// le input pour l'avatar
		var urlAvatarTag= $('#urlAvatar');
		//La liste d'utilisateurs
		var utilisateurs = $('#utilisateurs');
	//Pour afficher des erreurs
	var erreurs = $('#erreurs');

	//Si l'utilisateur veux son propre avatar
	// Au click sur l'input avec l'attribut name égal à "choixImgPerso"
	$('input[name="choixImgPerso"]').on('click', function() {
		//Si cet attribut a la valeur 'oui'
		if ($(this).val() === 'oui') {
			// On active le input pour insérer un lien
			$('#urlAvatar').removeAttr("disabled");
			// On enlève l'attribut required pour le input 'urlImageDefaut'
			$('input[name="urlImageDefaut"]').removeAttr("required");
		}
		else {
			//Si l'attribut a la valeur 'non'
			// On garde le input pour l'url de l'avatar désactivé
			$('#urlAvatar').prop("disabled", "disabled");
			// On indique que une des quatres images est requise
			$('input[name="urlImageDefaut"]').prop("required", "required");
		}
	});


	//Envoyer le formulaire utilisateur
	formAjoutUtilisateur.submit(function(e){
		//Si le input 'choixImgPerso' a comme valeur 'oui'
		if($('input[name="choixImgPerso"]:checked').val() === 'oui'){
			//On prend la variable urlAvatarTag (voir plus haut) et on donne son contenu à la variable 'imagePredefinie'
			var imagePredefinie =urlAvatarTag.val();
		}
		else{
			//Si le input a comme valeur 'non'
			// La variable 'imagePredefinie' prendra la valeur d'une des quatres images prédefinies
			var imagePredefinie = $('input[name="urlImageDefaut"]:checked').val();
		}
		// On désactive le comportement par défaut du formulaire
		e.preventDefault();
		//Envoyer au serveur 'definir utilisateur'(voir ligne 21 de app.js) avec la valeur de pseudo et urlAvatar
		socket.emit('definir utilisateur', {
				utilisateur: pseudo.val(),
				urlAvatar:	imagePredefinie},
			//Le callback
			function(data){
				//Si le serveur renvoie des data
				if(data) {
					//On cache le champs pour ajouter des utilisateurs
					$('#formAjoutUtilisateur').hide();
					//on montre la partie de tchat
					$('.chat').show(1400, function() {
					});
					$('.chat-header').append('<div class="chat-header clearfix">' +
						'<img alt="avatar" src="'+imagePredefinie+'">' +
						'<div class="chat-about"><div class="chat-with">'+pseudo.val()+'</div><div class="chat-num-messages">Les messages</div>' +
						'</div></div>')
				}else{
					erreurs.html('Pseudo déjà utilisé');
					alert('dd')
				}
		});
	});


	//Evenement JQUERY
	formulaireDeChat.submit(function(e){
		// On désactive le comportement par défaut du formulaire
		e.preventDefault();
		//On emet un evenement 'send messsage' et on y passe le contenu de texteDuChat
		socket.emit('envoyer message',texteDuChat.val())
		texteDuChat.val('');
	});



	socket.on('montrer message',function(data){
				fenetreDeChat.prepend('' +
					'<li class="clearfix"><div class="message-data align-right"><span class="message-data-time">'+data.temps+'</span>' +
					'<span class="message-data-name">'+data.utilisateur+'</span>&nbsp;&nbsp;<img class="imgDansChat" src="'+data.urlAvatar+'" alt=""></div>' +
					'<div class="message other-message float-right">'+data.message+'</div></li>');

	});

	//Afficher les utilisateurs
	socket.on('utilisateurs',function(data){
		//On défini une variable html à laquelle on attachera le contenu du loop plus bas
		var html='';
		//Pour toutes les data/ pour chaque utilisateurs
		for(var i=0; i < data.length;i++){
			//On ajoute un li avec le nom de l'user et son avatar
			html += '<li class="clearfix">' +
						'<img alt="avatar" src="'+data[i].urlAvatar+'">' +
				  		'<div class="about">' +
							'<div class="name">'+data[i].utilisateur+'</div>' +
							'<div class="status">' +
								'<i class="fa fa-circle online"></i> online' +
							'</div>' +
						'</div>' +
					'</li>';
		}
		// La liste utilisateurs sera remplie avec la variable html plus haut
		utilisateurs.html(html);
	});


});

