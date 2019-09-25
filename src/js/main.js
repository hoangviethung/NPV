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

var markers = [];

var mapOptions = {
	zoom: 12,
	center: new google.maps.LatLng(16.061979, 108.215886),
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	styles: [{
			"featureType": "administrative",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#444444"
			}]
		},
		{
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [{
				"color": "#f2f2f2"
			}]
		},
		{
			"featureType": "poi",
			"elementType": "all",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"featureType": "road",
			"elementType": "all",
			"stylers": [{
					"saturation": -100
				},
				{
					"lightness": 45
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "all",
			"stylers": [{
				"visibility": "simplified"
			}]
		},
		{
			"featureType": "road.arterial",
			"elementType": "labels.icon",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"featureType": "water",
			"elementType": "all",
			"stylers": [{
					"color": "#164195"
				},
				{
					"visibility": "on"
				}
			]
		}
	]
}

var locations;
var listMarkerInViewPortHtml = "";

function getLocationInViewPort(map, markers, locations) {
	var bounds = map.getBounds();
	var markerInViewPort = [];

	Array.prototype.forEach.call(markers, (marker, index) => {
		if (bounds.contains(marker.getPosition()) === true) {
			markerInViewPort.push(locations[index])
		}
	})

	return markerInViewPort;
}

function initialize() {
	if (document.getElementById("map")) {
		locations = inputLocations;
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);
		var infowindow = new google.maps.InfoWindow();
		var bounds = new google.maps.LatLngBounds();
		var listMarkerInViewPort
		var marker;

		var myoverlay = new google.maps.OverlayView();
		myoverlay.draw = function() {
			this.getPanes().markerLayer.id = 'markerLayer';
		};
		myoverlay.setMap(map);

		google.maps.event.addListener(map, 'click', function() {
			infowindow.close();
		});

		Array.prototype.forEach.call(locations, (locationElement, index) => {
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locationElement.lat, locationElement.lng),
				map: map,
				animation: google.maps.Animation.DROP,
				icon: locationElement.icon,
			});

			bounds.extend(marker.position);

			google.maps.event.addListener(marker, "click", ((marker, locationElement) => {
				return () => {
					map.setCenter(marker.getPosition());
					infowindow.setContent(
						`<div class="maker-info" style="width:100%">
						<h4>${locationElement.name}</h4>
						<p><b>Địa chỉ:</b> ${locationElement.address}</p>
						<p><b>Điện thoại:</b>  ${locationElement.phone}</p>
					</div>`
					);
					infowindow.open(map, marker);
				}
			})(marker, locationElement))

			listMarkerInViewPortHtml += `
				<div class="map-item" onclick="myClick(${index})">
					<h4>${locationElement.name}</h4>
					<p><b>Địa chỉ:</b> ${locationElement.address}</p>
					<p><b>Điện thoại:</b>  ${locationElement.phone}</p>
				</div>
			`;

			if (document.getElementById("map-list")) {
				document.getElementById("map-list").innerHTML = listMarkerInViewPortHtml
				markers.push(marker);
			}
		})

		if (document.getElementById("map-list")) {
			google.maps.event.addListener(map, "idle", function() {

				listMarkerInViewPortHtml = "";
				locations = getLocationInViewPort(map, markers, locations);

				console.log(locations);
				if (locations.length > 0) {
					Array.prototype.forEach.call(locations, (marker, index) => {
						console.log(marker);
						listMarkerInViewPortHtml += `
							<div class="map-item" onclick="myClick(${index})">
								<h4>${marker.name}</h4>
								<p><b>Địa chỉ:</b> ${marker.address}</p>
								<p><b>Điện thoại:</b>  ${marker.phone}</p>
							</div>
						`;
						document.getElementById("map-list").innerHTML = listMarkerInViewPortHtml
					})
				} else {
					listMarkerInViewPortHtml = "";
				}
			})
		}

		map.fitBounds(bounds);

		var listener = google.maps.event.addListener(map, "idle", function() {
			if (map.getZoom() > 12) {
				map.setZoom(12);
			}
			google.maps.event.removeListener(listener);
		});
	}
}

google.maps.event.addDomListener(window, 'load', initialize);

function myClick(id) {
	google.maps.event.trigger(markers[id], 'click');
	// $("html,body").animate({
	// 	scrollTop: $("#map").offset().top - 70
	// }, 1200)
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
})

$(window).on("scroll", function() {
	// Scroll
})