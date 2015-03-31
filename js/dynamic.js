$(document).ready(function() {
	$('.slider, .special > div').slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: 'fade',
		fadeSpeed: 500,
		crossfade: true,
		//slideEasing: 'easeInOutQuad',
		play: 0,
		pause: 1000
	});
	$('.slider, .special > div').bind('swiperight', function() {
		$(this).find('.prev').trigger('click');
	});
	$('.slider, .special > div').bind('swipeleft', function() {
		$(this).find('.next').trigger('click');
	});
	$('.slider .container > div > div, .special > div .container > div > div').each(function() {
		$(this).css({
			'width': $('.wrapper').width()+'px',
			'background': 'url("'+$(this).find('img.big').attr('src')+'") no-repeat center top',
			'-webkit-background-size': 'cover',
			'-moz-background-size': 'cover',
			'-o-background-size': 'cover',
			'background-size': 'cover'
		});
	});
	$('.slider .pagination li').each(function() {
		$(this).find('a').css({
			'background': 'url("'+$('.slider .container > div > div:nth-child('+eval($(this).index()+1)+') img.preview').attr('src')+'") no-repeat center top',
			'-webkit-background-size': 'cover',
			'-moz-background-size': 'cover',
			'-o-background-size': 'cover',
			'background-size': 'cover'
		});
	});
	$('.special > div .pagination li').each(function() {
		$(this).find('a').css({
			'background': 'url("'+$('.special > div .container > div > div:nth-child('+eval($(this).index()+1)+') img.preview').attr('src')+'") no-repeat center top',
			'-webkit-background-size': 'cover',
			'-moz-background-size': 'cover',
			'-o-background-size': 'cover',
			'background-size': 'cover'
		});
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('.panel .drop').bind('click', function(e) {
		$('.panel .menu').slideToggle(0);
		e.stopPropagation();
	});
	$('html, body').click(function() {
		if ( $('.wrapper').width() <= 943 ) {
			$('.panel .menu').hide();
		}
	});
	$('.panel .menu, .fade').click(function(e) {
		e.stopPropagation();
	});
	if ( $(window).width() < 480 ) {
		$('.wrapper, .footer, .modal').css({
			'zoom': $(window).width()/480
		});
	}
	else {
		$('.wrapper, .footer, .modal').css({
			'zoom': '1'
		});
	}
	var scroll = $('.modal.gallery .preview > div').jScrollPane({
		horizontalDragMinWidth: 18,
		horizontalDragMaxWidth: 18,
		autoReinitialise: true,
		animateScroll: true
	});
	var api = scroll.data('jsp');
	scroll.bind('mousewheel', function (event, delta, deltaX, deltaY) {
		api.scrollByX(-delta*50);
		return false;
	});
	$('[data-target="gallery"], [data-target="carte"]').bind('click', function() {
		var fh = $('.wrapper').height();
		if ( $(window).width() < 480 ) {
			fh = fh*$(window).width()/480
		}
		$('.fade').css({
			'height': fh+'px'
		}).stop(true,true).fadeIn(250);
		if ( $('.modal.'+$(this).attr('data-target')).outerHeight() > $(window).height() ) {
			var mt = $(document).scrollTop();
		}
		else {
			var mt = $(document).scrollTop()+($(window).height()-$('.modal.'+$(this).attr('data-target')).outerHeight())/2
		}
		if ( mt > $('.wrapper').height()-$('.modal.'+$(this).attr('data-target')).outerHeight() ) {
			mt = $('.wrapper').height()-$('.modal.'+$(this).attr('data-target')).outerHeight();
			$('body, html').animate({
				scrollTop: mt+'px'
			});
		}
		if ( $(window).width() < 480 ) {
			mt = mt/($(window).width()/480)
		}
		$('.modal.'+$(this).attr('data-target')).css({
			'top': mt+'px'
		}).stop(true,true).fadeIn(250);
		return false;
	});
	$('[data-target="reserve"]').bind('click', function() {
		var fh = $('.wrapper').height();
		if ( $(window).width() < 480 ) {
			fh = fh*$(window).width()/480
		}
		$('.fade').css({
			'height': fh+'px'
		}).stop(true,true).fadeIn(250);
		if ( $('.popup').outerHeight() > $(window).height() ) {
			var mt = $(document).scrollTop();
		}
		else {
			var mt = $(document).scrollTop()+($(window).height()-$('.popup').outerHeight())/2
		}
		if ( mt > $('.wrapper').height()-$('.popup').outerHeight() ) {
			mt = $('.wrapper').height()-$('.popup').outerHeight();
			$('body, html').animate({
				scrollTop: mt+'px'
			});
		}
		var popupZoom = 1;
		if ( $(window).width() < 795 ) {
			mt = mt/($(window).width()/480);
			popupZoom = $(window).width()/$('.popup').outerWidth();
		}
		$('.popup').css({
			'top': mt+'px',
			'zoom': popupZoom
		}).stop(true,true).fadeIn(250);
		return false;
	});
	$('.modal .close, .popup .close, .fade').bind('click', function(e) {
		$('.fade, .modal, .popup').stop(true,true).fadeOut(250);
		e.stopPropagation();
	});
	if ( $('.wrapper').width() <= 943 ) {
		$('.menu').hide();
	}
	else {
		$('.menu').show();
	}
	if ( $('.content .rate').length > 0 ) {
		$('.content .rate').prev('h1').css({
			'box-shadow': '0 1px 21px rgba(0,0,0,0.47)',
			'-webkit-box-shadow': '0 1px 21px rgba(0,0,0,0.47)',
			'-moz-box-shadow': '0 1px 21px rgba(0,0,0,0.47)'
		});
	}
	$('.gallery > ul li a').bind('click', function() {
		$(this).parents('.gallery').children('div.'+$(this).attr('href')).show().siblings('div').hide();
		$(this).parent().addClass('active').siblings().removeClass('active');
		return false;
	}).filter(':first').click();
	$('.modal.gallery .preview ul li').bind('click', function() {
		$(this).parents('.modal').find('.big div img.'+$(this).attr('data-img')).addClass('current').siblings().removeClass('current');
		$(this).addClass('active').siblings().removeClass('active');
		api.scrollTo($(this).position().left-($(this).parents('.modal').outerWidth()/2-40-31), 0);
		return false;
	}).filter(':first').click();
	$('.modal.gallery .big .next').bind('click', function() {
		var current = $(this).parent().find('img.current');
		if ( current.next().length > 0 ) {
			$(this).parents('.modal').find('.preview ul li[data-img="'+current.next().attr('class')+'"]').addClass('active').siblings().removeClass('active');
			api.scrollTo($(this).parents('.modal').find('.preview ul li[data-img="'+current.next().attr('class')+'"]').position().left-($(this).parents('.modal').outerWidth()/2-40-31), 0);
			current.next().addClass('current').siblings().removeClass('current');
		}
		else {
			$(this).parents('.modal').find('.preview ul li:first-child').addClass('active').siblings().removeClass('active');
			api.scrollTo($(this).parents('.modal').find('.preview ul li:first-child').position().left-($(this).parents('.modal').outerWidth()/2-40-31), 0);
			$(this).parent().find('img:first-child').addClass('current').siblings().removeClass('current');
		}
		return false;
	});
	$('.modal.gallery .big .prev').bind('click', function() {
		var current = $(this).parent().find('img.current');
		if ( current.prev().length > 0 ) {
			$(this).parents('.modal').find('.preview ul li[data-img="'+current.prev().attr('class')+'"]').addClass('active').siblings().removeClass('active');
			api.scrollTo($(this).parents('.modal').find('.preview ul li[data-img="'+current.prev().attr('class')+'"]').position().left-($(this).parents('.modal').outerWidth()/2-40-31), 0);
			current.prev().addClass('current').siblings().removeClass('current');
		}
		else {
			$(this).parents('.modal').find('.preview ul li:last-child').addClass('active').siblings().removeClass('active');
			api.scrollTo($(this).parents('.modal').find('.preview ul li:last-child').position().left-($(this).parents('.modal').outerWidth()/2-40-31), 0);
			$(this).parent().find('img:last-child').addClass('current').siblings().removeClass('current');
		}
		return false;
	});
});
$(window).on('orientationchange', function(event) {
	setTimeout(function() {
		if ( $(window).width() < 480 ) {
			$('.wrapper, .footer, .modal, .popup').css({
				'zoom': $(window).width()/480
			});
		}
		else {
			$('.wrapper, .footer, .modal, .popup').css({
				'zoom': '1'
			});
		}
		var fh = $('.wrapper').height();
		if ( $(window).width() < 480 ) {
			fh = fh*$(window).width()/480
		}
		$('.fade').css({
			'height': fh+'px'
		});
		if ( $('.wrapper').width() <= 943 ) {
			$('.menu').hide();
		}
		else {
			$('.menu').show();
		}
		$('.slider, .slider .container, .slider .container > div > div, .special > div, .special > div .container, .special > div .container > div > div').width($('.wrapper').width());
    }, 200);
});
$(window).resize(function() {
	if ( $('.wrapper').width() <= 943 ) {
		$('.menu').hide();
	}
	else {
		$('.menu').show();
	}
	$('.slider, .slider .container, .slider .container > div > div, .special > div, .special > div .container, .special > div .container > div > div').width($('.wrapper').width());
});
$(window).load(function() {
	if ( $('.wrapper').width() <= 943 ) {
		$('.menu').hide();
	}
	else {
		$('.menu').show();
	}
	$('.slider, .slider .container, .slider .container > div > div, .special > div, .special > div .container, .special > div .container > div > div').width($('.wrapper').width());
});