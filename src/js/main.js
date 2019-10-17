// Function thêm class lazyload vào các thẻ <img> có thuộc tính [data-src]
const addClassLazyload = () => {
	let imgList = document.querySelectorAll("img[data-src]")
	Array.prototype.forEach.call(imgList, function (el) {
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
	if ($(window) > 1024) {
		$(this).scroll(function () {
			if ($(this).scrollTop() > 150) {
				$('header').addClass('active');
			} else {
				$('header').removeClass('active');
			}
		});
	}
}

function sliderHomeLocator() {
	var swpier = new Swiper('.slider-HomeLocator', {
		slidesPerView: 4,
		speed: 1000,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {
			1024: {
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
	$(window).scroll(function () {
		if ($(this).scrollTop() > 800) {
			$('#back-to-top').addClass('active');
		} else {
			$('#back-to-top').removeClass('active');
		}
	});

	$("#back-to-top").on("click", function (e) {
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
}

function showAlbumImg() {
	$('.library .item').on('click', function () {
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
	$('.fix-item .see-more-mb').click(function () {
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
	$('.see-more-pc').click(function () {
		if (!$('.see-more-pc').hasClass('see-more-show')) {
			$(this).addClass('see-more-show');
			$('.fix-item').show(300);
		} else {
			$(this).removeClass('see-more-show');
			$('.fix-item').hide();
		}
	});
}

function addBlockTableForm() {

	let i = 0;

	$('body').on('click', '.tac-vu .add', function () {

		// Giá trị Type Container
		let TypeContainer = $('.tableForm').eq(0).find('.TypeContainer option:selected').val();
		let nameTypeContainer = 'containers[' + i + '].TypeContainer';

		// Giá trị ContainerNo
		let ContainerNo = $('.tableForm').eq(0).find('.ContainerNo input').val();
		let nameContainerNo = 'containers[' + i + '].ContainerNo';

		// Giá trị SealNo
		let SealNo = $('.tableForm').eq(0).find('.SealNo input').val();
		let nameSealNo = 'containers[' + i + '].SealNo';

		// Giá trị GW
		let GW = $('.tableForm').eq(0).find('.GW input').val();
		let nameGW = 'containers[' + i + '].GW';

		// Giá trị CBM
		let CBM = $('.tableForm').eq(0).find('.CBM input').val();
		let nameCBM = 'containers[' + i + '].CBM';

		// Giá trị NumberOfPackage
		let NumberOfPackage = $('.tableForm').eq(0).find('.NumberOfPackage input').val();
		let nameNumberOfPackage = 'containers[' + i + '].NumberOfPackage';

		// Giá trị Unit
		let Unit = $('.tableForm').eq(0).find('.Unit option:selected').val();
		let nameUnit = 'containers[' + i + '].Unit';

		// Khi nhập vào nút thêm sẽ copy ra thêm 1 table
		var item_news = $(this).parents('.tableForm');
		item_news.parent().append(item_news.prop('outerHTML'));

		// Giá trị thứ i của containers[i] tăng lên sau mỗi lần click
		i++;

		// Tạo thành Array
		let rowList = Array.from($('.tableForm'));

		// Quăng value đã chọn vào đối tượng mới
		$(rowList[rowList.length - 1]).find('.TypeContainer select').val(TypeContainer);
		$(rowList[rowList.length - 1]).find('.ContainerNo input').val(ContainerNo);
		$(rowList[rowList.length - 1]).find('.SealNo input').val(SealNo);
		$(rowList[rowList.length - 1]).find('.GW input').val(GW);
		$(rowList[rowList.length - 1]).find('.CBM input').val(CBM);
		$(rowList[rowList.length - 1]).find('.NumberOfPackage input').val(NumberOfPackage);
		$(rowList[rowList.length - 1]).find('.Unit select').val(Unit);
		// Thêm Name cho các trường
		$(rowList[rowList.length - 1]).find('.TypeContainer select').attr('name', nameTypeContainer);
		$(rowList[rowList.length - 1]).find('.ContainerNo input').attr('name', nameContainerNo);
		$(rowList[rowList.length - 1]).find('.SealNo input').attr('name', nameSealNo);
		$(rowList[rowList.length - 1]).find('.GW input').attr('name', nameGW);
		$(rowList[rowList.length - 1]).find('.CBM input').attr('name', nameCBM);
		$(rowList[rowList.length - 1]).find('.NumberOfPackage input').attr('name', nameNumberOfPackage);
		$(rowList[rowList.length - 1]).find('.Unit select').attr('name', nameUnit);
	});

	// XÓA ĐỐI TƯỚNG KHI CLICK VÀO
	$('body').on('click', '.tac-vu .delete', function () {
		var item_delete = $(this).parents('.tableForm');
		item_delete.remove();
	});
}

const tienIchTabTuDien = () => {
	return new Tab('.tienich-tudien .tab-container');
}

// GET THUMBNAIL YOUTUBE
function _getThumbnailYoutube() {
	$(".library .item.video").each(function () {
		var src = $(this).attr("href");
		var youtube_video_id = src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
		if (youtube_video_id.length == 11) {
			$(this).find("img").attr("src", "https://img.youtube.com/vi/" + youtube_video_id + "/mqdefault.jpg");
		}
	})
}

function showFAQ() {
	$('.FAQ .item-group .question').click(function (e) {
		e.preventDefault();

		$(this).find('.arrow-icon').toggleClass('active');
		$(this).siblings('.answer').slideToggle();
	});
}

function showMenuMobile() {
	$('.toggle-menu-mobile').click(function (e) {
		e.preventDefault();
		$(this).siblings('.search-mobile').find('.search').removeClass('active');
		$(this).siblings('.search-mobile').find('.close').removeClass('active');

		$('.top-header').removeClass('active');
		$('.bottom-header').toggleClass('active');
	});
}

function showSearchMobile() {
	$('.search-mobile').click(function (e) {
		e.preventDefault();
		$(this).find('.search').toggleClass('active');
		$(this).find('.close').toggleClass('active');

		$('.bottom-header').removeClass('active');
		$('.top-header').toggleClass('active');
	});
}

function showSubMenu() {
	if ($(window).width() < 1024) {
		$('header .bottom-header .nav-item').click(function (e) {
			$(this).siblings('.nav-item').children('.sub-menu').slideUp();
			$('header .bottom-header .nav-item').not(this).find('img').removeClass('active');

			$(this).find('img').toggleClass('active');
			$(this).children('.sub-menu').slideToggle();
		});
	}
}

function getNameFile() {
	$('input[type="file"]').change(function (e) {
		var fileName = e.target.files[0].name;
		$(this).siblings('p').html(fileName);
	});
}

function activeMenuByUrl() {
	var url = window.location.href.split('/').pop();

	let listNavItem = $('.bottom-header .nav-list .nav-item a');
	listNavItem.each(function () {
		let hung = $(this).attr('href');
		if (url.includes(hung)) {
			$(this).parents('.nav-item').addClass('active');
		}
	})

}

function TableYeuCauBaoGia() {

	$('.table-input').on('keyup change', function (e) {
		e.preventDefault();

		let textDai = $('input.dai').val();
		let textRong = $('input.rong').val();
		let textCao = $('input.cao').val();
		// CÁC THÔNG SỐ NGƯỜI DÙNG NHẬP VÀO
		let dai = Number($('input.dai').val());
		let rong = Number($('input.rong').val());
		let cao = Number($('input.cao').val());
		let trongluong = Number($('input.trongluong').val());
		let soluong = Number($('input.soluong').val());

		// CÁC CÔNG THỨC TÍNH
		let tongthetich = (dai * rong * cao) / 1000000 * soluong;
		let tongtrongluong = trongluong * soluong;
		let tongtrongluongAIR = (dai * rong * cao) / 6000 * soluong;
		let tongtrongluongCourier = (dai * rong * cao) / 5000 * soluong;


		// IN CÁC KẾT QUẢ RA NGOÀI MÀN HÌNH
		$('input.tongthetich').val(tongthetich);
		$('input.tongtrongluong').val(tongtrongluong);
		$('input.tongtrongluongAIR').val(tongtrongluongAIR);
		$('input.tongtrongluongCourier').val(tongtrongluongCourier);
		$('textarea.box-hiden-dai-rong-cao').val(textDai + "x" + textRong + "x" + textCao);
	});
}

$(document).ready(function () {
	objectFitImages("img.ofc");
	sliderHomeBanner();
	sliderHomeLocator();
	sliderMember();
	sliderCustomer();
	showBackToTop();
	activeMenuByUrl();
	// showToolBarNav();
	showListPC();
	showList480();
	tienIchTabTuDien();
	activeHeader();
	libraryImgVideo();
	showAlbumImg();
	addBlockTableForm();
	getNameFile();
	showFAQ();
	showMenuMobile();
	showSearchMobile();
	showSubMenu();
	_getThumbnailYoutube();
	TableYeuCauBaoGia();
	new WOW().init();
})

$(window).on("scroll", function () {
	// Scroll
})
