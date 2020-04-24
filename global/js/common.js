$(document).ready(function () {
	$('#btn_mobile_login').focus();
	$('body').on('keydown', '.number-only', function () {
		if (event.which >= 37 && event.which <= 40) return;
		this.value = this.value.replace(/\D/g, '')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	});

	$('body').on('keyup', '.numeric', function () {
		this.value = this.value.replace(/\D/g,'');
	});

	$('body').on('keydown', '.characters', function (e) {
		if (e.shiftKey || e.ctrlKey || e.altKey) {
            e.preventDefault();
		} else {
			var key = e.keyCode;
			if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
			  e.preventDefault();
			}
		}
	});

	$('body').on('keyup', '.number-account', function () {
		if (event.which >= 37 && event.which <= 40) return;
		this.value = this.value.replace(/\D/g, '');
	});

	$('body').on('keyup', '.no-white-space', function (e) {
		this.value = this.value.replace(/\s/g, '');
	});

	$('body').on('keyup', '.zero-start-disable', function (e) {
		if (this.value.length == 0 && e.which == 48 ){
	       return false;
	    }
	});

	$('.desktop-game #btn_oz').hover(
		function() {
			$('#casino_oz').show();
		}, function() {
			$('#casino_oz').hide();
		}
	);

	$('.desktop-game #btn_midas').hover(
		function() {
			$('#casino_midas').show();
		}, function() {
			$('#casino_midas').hide();
		}
	);

	$('.desktop-game #btn_88').hover(
		function() {
			$('#casino_88').show();
		}, function() {
			$('#casino_88').hide();
		}
	);

	$('body').on('click', '.container-game-content > .game-content > .container-casino-logo > div > button', function (e) {
		var btn_game = $(this);
		if(btn_game.hasClass('active')){
			btn_game.removeClass('active');
			$(this).parent().find('.off').show();
			$(this).parent().find('.on').hide();
		}
		else{
			btn_game.addClass('active');
			$('.container-game-content > .game-content > .container-casino-logo > div > button').not(this).removeClass('active');
			$(this).parent().find('.on').show();
			$(this).parent().find('.off').hide();
		}
	});



	// $(document).click(function () {
	// 	// $('.ul-select-history').fadeOut(300);
	// 	var option_history = $('.ul-select-history').css('display');
	// 	var option_translate = $('.ul-select-lang').css('display');
	// 	var mobile_modal_money = $('.tab-money-modal').css('display');
	// 	var mobile_modal_support = $('.tab-support-modal').css('display');
	// 	var option_provider_balance = $('.ul-game-provider-balance').css('display');
	// 	if (option_history == "block" || option_translate == "block" || option_provider_balance == "block" || mobile_modal_money == "block" || mobile_modal_support == "block") {
	// 		$('.ul-select-history').hide("slide", {
	// 			direction: "up"
	// 		}, 300);
	// 		$('.ul-select-lang').hide("slide", {
	// 			direction: "up"
	// 		}, 300);
	// 		$('.ul-game-provider-balance').hide("slide", {
	// 			direction: "up"
	// 		}, 300);
	// 		$('.tab-money-modal-mobile').hide("slide", {
	// 			direction: "up"
	// 		}, 300);
	// 		$('.tab-support-modal-mobile').hide("slide", {
	// 			direction: "up"
	// 		}, 300);
	// 	}
	// });

	$('body').on('click', '.game-target', function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () {
				window.location.hash = hash;
			});
		}
	});

	// $('body').on('click', '.btn-iframe-maximize', function () {
	// 	if($('#game_iframe').hasClass('maximize-iframe')){
	// 		$('#game_iframe').removeClass('maximize-iframe',{duration:500});
	// 	}
	// 	else{
	// 		$('#game_iframe').addClass('maximize-iframe',{duration:500});
	// 	}
	// });

	var isiOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
	var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;

	if (isiOS === true || isMacLike === true) {

		// Store -webkit-tap-highlight-color as this gets set to rgba(0, 0, 0, 0) in the next part of the code
		var tempCSS = $('a').css('-webkit-tap-highlight-color');
		var tempCSS_button = $('button').css('-webkit-tap-highlight-color');

		$('body').css('cursor', 'pointer') // Make iOS honour the click event on body
			.css('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)'); // Stops content flashing when body is clicked

		// Re-apply cached CSS
		$('a').css('-webkit-tap-highlight-color', tempCSS);
		$('button').css('-webkit-tap-highlight-color', tempCSS_button);

		$('.page-casino .content-game:last-child').css('marginBottom', '300px');

	}
});

