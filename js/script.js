
// the Location function generates a ko observable from data.js item
var Location = function(data) {
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.state = ko.observable(data.state);
}


function mapViewModel() {
	var self = this;
	
	// generate an array of Location ko observables
	this.locationsList = ko.observableArray([]);
		places.forEach(function(item) {
		self.locationsList.push( new Location(item) );
	});

	// create array for all location markers
	this.locationsMarkers = [];

	// generate an array of states based on places for dropdown
	var states = ['(All)'];
	places.forEach(function(item) {
		if (states.includes(item.state)) {
		} else {
			states.push(item.state);
		}
	});
	states.sort();
	this.statesList = ko.observableArray(states);

	// populates the infowindow + marker, from google maps unit
	this.populateInfoWindow = function(marker, infowindow) {
		if (infowindow.marker != marker) {
			infowindow.setContent('');
			infowindow.marker = marker;			
			infowindow.setContent('<h6>'+marker.name+' National Park</h6>');
			infowindow.open(map, marker);
			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
			});
		}
	};

	// KO clicks call populateMarker for the filteredList links	
	this.populateMarker = function() {
        self.populateInfoWindow(this, self.largeInfoWindow);
        this.setAnimation(google.maps.Animation.DROP);
	};

	// renders the map + markers
	this.initMap = function() {
		var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: 47, lng: -116},
                styles: mapStyles
            });
		
		this.largeInfoWindow = new google.maps.InfoWindow();

		for (i=0; i<places.length; i++) {
			var iLat = places[i].lat*1;
			var iLng = -1*places[i].lng;
			this.placePosition = {lat: iLat, lng: iLng};
			this.locationMarker = new google.maps.Marker({
				map: map,
				position: this.placePosition,
				name: places[i].name,
				state: places[i].state,
				lat: iLat,
				lng: iLng,
				animation: google.maps.Animation.DROP
			});
			this.locationMarker.setMap(map);
			self.locationsMarkers.push(this.locationMarker);
			this.locationMarker.addListener('click', function() {
				self.populateInfoWindow(this, self.largeInfoWindow);
        		this.setAnimation(google.maps.Animation.DROP);
        	});
		}
	};
	this.initMap();


	// query data-binds to the search input
	self.query = ko.observable('');
	self.selectedState = ko.observable();

	// computed observable for the filtered list
	this.filteredList = ko.computed(function() {
		var result = ko.observableArray([]);

		for (i=0; i<self.locationsMarkers.length; i++) {
			var mLocation = self.locationsMarkers[i];
			// first check if the item matches states or all states
			if (mLocation.state == self.selectedState() || 
				'(All)' == self.selectedState()) {
				// then check if the search box matches the name
				if (mLocation.name.toLowerCase().includes(
					self.query().toLowerCase())) {
					result.push(mLocation);
					self.locationsMarkers[i].setVisible(true);
				} else {
					self.locationsMarkers[i].setVisible(false);
					}
			} else {
				self.locationsMarkers[i].setVisible(false);
			}
		}
		return result();
	}, this);

}

// google maps callback runs runApp
function runApp() {
	ko.applyBindings(new mapViewModel());
}

// hamburger icon in nav collapses sidebar
$(document).ready(function () {
    $('#hamburger-icon').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});
