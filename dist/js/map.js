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
						<p><b>Điện thoại:</b> ${locationElement.phone}</p>
					</div>`
					);
					infowindow.open(map, marker);
				}
			})(marker, locationElement))

			listMarkerInViewPortHtml += `
				<div class="map-item" onclick="myClick(${index})">
					<h4>${locationElement.name}</h4>
					<p><b>Địa chỉ:</b> ${locationElement.address}</p>
					<p><b>Điện thoại:</b> ${locationElement.phone}</p>
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
								<div class="row">
									<div class="col-lg-4">
										<p>${marker.address}</p>
									</div>
									<div class="col-lg-4">
										<p><b>Tel: </b>${marker.phone}</p>
										<p><b>Fax: </b>${marker.fax}</p>
									</div>
									<div class="col-lg-4">
										<p><b>Email: </b>${marker.email}</p>
										<p><b>Website: </b>${marker.website}</p>
									</div>
								</div>
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

	console.log(1);

}