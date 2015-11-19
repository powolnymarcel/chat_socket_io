$(document).ready(function(){
	var messages = [];
	var socket = io.connect('http://localhost:3000');
	var texteDuChat= $('#texteDuChat');
	var formulaireDeChat= $('#formulaireDeChat');
	var fenetreDeChat= $('#fenetreDeChat');
	var formAjoutUtilisateur= $('#formAjoutUtilisateur');
	var pseudo= $('#pseudo');
	var urlAvatarTag= $('#urlAvatar');
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

