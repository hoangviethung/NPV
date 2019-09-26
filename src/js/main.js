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
		if ($(this).scrollTop() > 150) {
			$('header').addClass('active');
		} else {
			$('header').removeClass('active');
		}
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
		autoplay: true,
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
		breakpoints: {},
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
		breakpoints: {},
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
	$('[data-fancybox="images').fancybox({
		animationEffect: "rotate",
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

	$('[data-fancybox="videos').fancybox({
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
}

function showAlbumImg() {
	$('.library .item').on('click', function() {
		$(this).siblings('.d-none a').trigger('click');
	})
}

// function showToolBarNav() {
// 	$(window).scroll(function() {
// 		if ($(this).scrollTop() > 800) {
// 			$('#toolbar-nav').addClass('active');
// 		} else {
// 			$('#toolbar-nav').removeClass('active');
// 		}
// 	});
// }

function showList480() {
	$('.fix-item .see-more-mb').click(function() {
		var nameIcon = $(this).find('img').attr('src');
		if (nameIcon == "resources/images/arrow-topw.png") {
			$(this).find('img').attr('src', "resources/images/arrow-topd.png");
			$('.fix-item .item').show(300);
		} else {
			$(this).find('img').attr('src', "resources/images/arrow-topw.png");
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

$(document).ready(function() {
	objectFitImages("img.ofc");
	sliderHomeBanner();
	sliderMember();
	sliderCustomer();
	showBackToTop();
	// showToolBarNav();
	showListPC();
	showList480();
	tienIchTabTuDien();
	activeHeader();
	libraryImgVideo();
	showAlbumImg();
})

$(window).on("scroll", function() {
	// Scroll
})