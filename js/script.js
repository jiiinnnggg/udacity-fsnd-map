
var Location = function(data) {
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.state = ko.observable(data.state);
}

var State = function(data) {
	this.name = ko.observable(data.name);
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

	// populates the infowindow for a marker
	this.populateInfoWindow = function(marker, infowindow) {
		if (infowindow.marker != marker) {
			infowindow.setContent('');
			infowindow.marker = marker;
			infowindow.setContent('<div>'+marker.name+'</div>');
			infowindow.addListener('closeclick', function() {
				infowindow.setMarker(null);
			});
			infowindow.open(map, marker);
		}
	};

	// populates a marker for the click listener
	this.populateMarker = function() {
        self.populateInfoWindow(this, self.largeInfoWindow);
	};

	// renders the map + markers
	this.initMap = function() {
		var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: 47, lng: -116}
            });
		
		this.largeInfoWindow = new google.maps.InfoWindow();

		for (i=0; i<places.length; i++) {
			this.placePosition = {lat: places[i].lat*1, lng: -1*places[i].lng};
			this.locationMarker = new google.maps.Marker({
				map: map,
				position: this.placePosition,
				name: places[i].name,
			});
			this.locationMarker.setMap(map);
			self.locationsMarkers.push(this.locationMarker);
			this.locationMarker.addListener('click', self.populateMarker);
		};
	};
	this.initMap();

	// query data-binds to the search input
	this.query = ko.observable('');
	this.selectedState = ko.observable();

	// computed observable for the filtered list
	this.filteredList = ko.computed(function() {
		var result = ko.observableArray([]);

		for (i=0; i<places.length; i++) {
			// first check if the item matches states or all states
			if (places[i].state == self.selectedState() || 
				'(All)' == self.selectedState()) {
				// then check if the search box matches the name
				if (places[i].name.toLowerCase().includes(
					this.query().toLowerCase())) {
					result.push(places[i]);
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
};


function runApp() {
	ko.applyBindings(new mapViewModel());
};


// hamburger icon in nav collapses sidebar
$(document).ready(function () {
            $('#hamburger-icon').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });

