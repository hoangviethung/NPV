import YeuCauBaoGia from "./yeucaubaogia";
import RequestForm from "./request";

// Function thêm class lazyload vào các thẻ <img> có thuộc tính [data-src]
const addClassLazyload = () => {
	let imgList = document.querySelectorAll("img[data-src]")
	Array.prototype.forEach.call(imgList, function(el) {
		if (el.className.length > 0) {
			el.className = el.className + " lazyload"
		} else {
			el.className = "lazyload"
		}
	});
}

// CONTROL SVG
const SVG = () => {
	jQuery('img.svg').each(function() {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');
	});
}

Date.prototype.toDateInputValue = (function() {
	var local = new Date(this);
	local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
	return local.toJSON().slice(0, 10);
});

// Script cho tab
class Tab {
	selector;
	titleList;
	contentList;

	constructor(selector) {
		this.selector = document.querySelector(selector);
		if (this.selector) {
			this.titleList = this.selector.querySelectorAll("[toggle-for]")
			this.contentList = this.selector.querySelectorAll("[tab-id]")
			this.init();
		}
	}

	runTabWhenClicked() {
		Array.prototype.forEach.call(this.titleList, (element, index) => {
			element.addEventListener("click", e => {
				e.preventDefault();
				const tabTarget = element.attributes["toggle-for"].value;
				const targetDOM = this.selector.querySelector(`[tab-id='${tabTarget}']`);
				element.classList.add("active");
				Array.prototype.forEach.call(this.titleList, (eleClicked, eleClickedIndex) => {
					if (eleClickedIndex != index) {
						eleClicked.classList.remove("active")
					}
				});
				Array.prototype.forEach.call(this.contentList, (tabContentElement) => {
					if (tabContentElement.attributes["tab-id"].value != tabTarget) {
						tabContentElement.style.display = "none"
						tabContentElement.classList.remove("show")
					}
				});
				targetDOM.style.display = "block"
				setTimeout(() => {
					targetDOM.classList.add("show")
				}, 50);
			})
		})
	}

	activeFirstTab() {
		this.titleList[0].click();
	}

	init() {
		this.runTabWhenClicked();
		this.activeFirstTab();
	}
}

function activeHeader() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 500) {
			$('header').addClass('active');
		} else {
			$('header').removeClass('active');
		}
	});
}

function sliderHomeLocator() {
	var swpier = new Swiper('.slider-HomeLocator', {
		slidesPerView: 4,
		speed: 1000,
		loop: true,
		simulateTouch: false,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {
			1024: {
				slidesPerView: 2,
			},
			480: {
				slidesPerView: 1,
			}
		},
		navigation: {
			nextEl: '.slider-HomeLocator .swiper-button-next',
			prevEl: '.slider-HomeLocator .swiper-button-prev',
		},
	});
}

function sliderHomeBanner() {
	var swpier = new Swiper('.slider-HomeBanner', {
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		centeredSlides: true,
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {},
		navigation: {
			nextEl: '.slider-HomeBanner .swiper-button-next',
			prevEl: '.slider-HomeBanner .swiper-button-prev',
		},
	});
}

function sliderMember() {
	var swpier = new Swiper('.slider-Member', {
		centeredSlides: true,
		slidesPerView: 3,
		speed: 1000,
		loop: true,
		autoplay: true,
		breakpoints: {
			768: {
				slidesPerView: 1,
				spaceBetween: 30,
			},
		},
		navigation: {
			nextEl: '.slider-Member .swiper-button-next',
			prevEl: '.slider-Member .swiper-button-prev',
		},
	});
}

function sliderCustomer() {
	var swpier = new Swiper('.slider-Customer', {
		centeredSlides: true,
		slidesPerView: 3,
		speed: 1000,
		loop: true,
		autoplay: true,
		breakpoints: {
			768: {
				slidesPerView: 1,
				spaceBetween: 30,
			},
		},
		navigation: {
			nextEl: '.slider-Customer .swiper-button-next',
			prevEl: '.slider-Customer .swiper-button-prev',
		},
	});

}

function showBackToTop() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 800) {
			$('#back-to-top').addClass('active');
		} else {
			$('#back-to-top').removeClass('active');
		}
	});

	$("#back-to-top").on("click", function(e) {
		e.preventDefault();
		$("html,body").animate({
			scrollTop: 0
		})
	})
}

function libraryImgVideo() {

	$('.library .img-item .d-none a').fancybox({
		animationEffect: "slide",
		transitionEffect: "circular",
		buttons: [
			'zoom',
			'thumbs',
			'close',
			'share',
			'fullscreen',
		],
		thumbs: {
			autoStart: true,
		}
	})

	$('.video[data-fancybox]').fancybox({
		animationEffect: "slide",
		transitionEffect: "circular",
		buttons: [
			'zoom',
			'close',
			'share',
			'fullscreen',
		],
	})

	$('.library .img-item').each(function() {
		let _this = $(this);
		_this.on('click', function() {
			$(this).find('.d-none a').eq(0).triggerHandler('click');
		})
	})
}

function showList480() {
	$('.fix-item .see-more-mb').click(function() {
		var nameIcon = $(this).find('img').attr('src');
		if (nameIcon == "img/icons/arrow-topw.png") {
			$(this).find('img').attr('src', "img/icons/arrow-topd.png");
			$('.fix-item .item').show(300);
		} else {
			$(this).find('img').attr('src', "img/icons/arrow-topw.png");
			$('.fix-item .item').hide(300);
		}
	});
}

function showListPC() {
	$('.see-more-pc').click(function() {
		if (!$('.see-more-pc').hasClass('see-more-show')) {
			$(this).addClass('see-more-show');
			$('.fix-item').show(300);
		} else {
			$(this).removeClass('see-more-show');
			$('.fix-item').hide();
		}
	});
}

const tienIchTabTuDien = () => {
	return new Tab('.tienich-tudien .tab-container');
}

// GET THUMBNAIL YOUTUBE
function _getThumbnailYoutube() {
	$(".library .item.video").each(function() {
		var src = $(this).attr("href");
		var youtube_video_id = src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
		if (youtube_video_id.length == 11) {
			$(this).find("img").attr("src", "https://img.youtube.com/vi/" + youtube_video_id + "/mqdefault.jpg");
		}
	})
}

function showFAQ() {
	$('.FAQ .item-group .question').click(function(e) {
		e.preventDefault();

		$(this).find('.arrow-icon').toggleClass('active');
		$(this).siblings('.answer').slideToggle();
	});
}

function showMenuMobile() {
	$('.toggle-menu-mobile').click(function(e) {
		e.preventDefault();
		$(this).siblings('.search-mobile').find('.search').removeClass('active');
		$(this).siblings('.search-mobile').find('.close').removeClass('active');

		$(this).find('.show-menu').toggleClass('active');
		$(this).find('.close').toggleClass('active');

		$('body').toggleClass('disabled');
		$('.overlay').toggleClass('active');

		$('.top-header').removeClass('active');
		$('.bottom-header').toggleClass('active');
	});
}

function showSearchMobile() {
	$('.search-mobile').click(function(e) {
		e.preventDefault();
		$(this).siblings('.toggle-menu-mobile').find('.show-menu').removeClass('active');
		$(this).siblings('.toggle-menu-mobile').find('.close').removeClass('active');

		$(this).find('.search').toggleClass('active');
		$(this).find('.close').toggleClass('active');

		$('.overlay').removeClass('active');
		$('body').removeClass('disabled');

		$('.bottom-header').removeClass('active');
		$('.top-header').toggleClass('active');
	});
}

function showSubMenu() {
	if ($(window).width() < 1024) {
		$('header .bottom-header .nav-item').click(function(e) {

			$(this).siblings('.nav-item').children('.sub-menu').slideUp();
			$('header .bottom-header .nav-item').not(this).find('img').removeClass('active');

			$(this).find('img').toggleClass('active');
			$(this).children('.sub-menu').slideToggle();
		});
	}
}

function getNameFile() {
	$('input[type="file"]').change(function(e) {
		var fileName = e.target.files[0].name;
		$(this).siblings('p').html(fileName);
	});
}

function activeMenuByUrl() {
	var url = '/' + window.location.href.split(' / ').pop();
	let listNavItem = $('.bottom-header .nav-list .nav-item a');
	listNavItem.each(function() {

		if ($(this).attr('href') === "") {
			$(this).attr('href', "#");
		}

		if (url.includes($(this).attr('href'))) {
			$(this).parents('.nav-item').addClass('active');
		}
	})
}

function showTypeOfMove() {
	$('#type_Of_Move').change(function(e) {
		e.preventDefault();

		let selected = $(this).val();

		$('.LCL').removeClass('hidden');
		$('.AIR').removeClass('hidden');
		$('.FCL').removeClass('hidden');

		if (selected == 'FCL') {
			$('.LCL').addClass('hidden');
			$('.AIR').addClass('hidden');
		} else if (selected == 'LCL') {
			$('.FCL').addClass('hidden');
			$('.AIR').addClass('hidden');
		} else {
			$('.FCL').addClass('hidden');
			$('.LCL').addClass('hidden');
		}
	});
}

function setDateDefault() {
	let today = new Date().toDateInputValue();

	$($('input[type=date]')).val(today);

	$($('input[type=date]')).attr('min', today)
}

$(document).ready(function() {
	objectFitImages("img.ofc");
	SVG();
	sliderHomeBanner();
	sliderHomeLocator();
	sliderMember();
	sliderCustomer();
	showBackToTop();
	activeMenuByUrl();
	showListPC();
	showList480();
	tienIchTabTuDien();
	activeHeader();
	libraryImgVideo();
	getNameFile();
	showFAQ();
	showMenuMobile();
	showSearchMobile();
	showSubMenu();
	_getThumbnailYoutube();
	showTypeOfMove();
	setDateDefault();
	// Yeu Cau Bao Gia
	YeuCauBaoGia();
	RequestForm();
	new WOW().init();
})

$(window).on("scroll", function() {
	// Scroll
})