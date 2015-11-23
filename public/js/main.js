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
	var erreurs = $('erreurs');

	$('input[name="choixImgPerso"]').on('click', function() {
		if ($(this).val() === 'oui') {
			$('#urlAvatar').removeAttr("disabled");
			$('input[name="urlImageDefaut"]').removeAttr("required");
		}
		else {
			$('#urlAvatar').prop("disabled", "disabled");
			$('input[name="urlImageDefaut"]').prop("required", "required");
		}
	});


	//Envoyer le formulaire utilisateur
	formAjoutUtilisateur.submit(function(e){
		if($('input[name="choixImgPerso"]:checked').val() === 'oui'){
			var imagePredefinie =urlAvatarTag.val();
		}
		else{
			var imagePredefinie = $('input[name="urlImageDefaut"]:checked').val();
		}

		e.preventDefault();
		//Envoyer au serveur 'definir utilisateur' avec la valeur de pseudo
		socket.emit('definir utilisateur', {
				utilisateur: pseudo.val(),
				urlAvatar:	imagePredefinie},
			function(data){
				if(data) {
					$('#formAjoutUtilisateur').hide();
					$('.chat').show(1400, function() {

					});
				}else{
					erreurs.html('Pseudo déjà utilisé')
				}
		});
	});

	//Afficher les utilisateurs
	socket.on('utilisateurs',function(data){
		var html='';
		for(var i=0; i < data.length;i++){
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
		utilisateurs.html(html);
	});


});

