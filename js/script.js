
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

	//generate an array of Location ko observables
	this.locationsList = ko.observableArray([]);
	this.locationsMarkers = [];
	
	places.forEach(function(item) {
		self.locationsList.push( new Location(item) );
	});

	//generate an array of states based on places for dropdown
	var states = ['(All)'];
	places.forEach(function(item) {
		if (states.includes(item.state)) {
		} else {
			states.push(item.state);
		}
	});
	states.sort();

	this.statesList = ko.observableArray(states);


	//query data-binds to the search input
	this.query = ko.observable('');
	this.selectedState = ko.observable();

	//computed observable for the filtered list
	this.filteredList = ko.computed(function() {
		var result = ko.observableArray([]);

		if (this.query() == '' && this.selectedState() == '(All)') {
			result = self.locationsList;
		} else {
			for (p in places) {
				if (this.selectedState() == '(All)') {
					if (places[p].name.toLowerCase().
					indexOf(this.query().toLowerCase()) >= 0) {
						result.push(places[p]);
					}
				} if (this.selectedState() == places[p].state) {
					if (places[p].name.toLowerCase().
					indexOf(this.query().toLowerCase()) >= 0) {
						result.push(places[p]);
					}
				}
			}
		}
		
		return result();
	}, this);

	// renders the map + markers
	this.initMap = function() {
		var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: 45, lng: -110}
            });
		
		for (i=0; i<places.length; i++) {
			var placePosition = {lat: places[i].lat*1, lng: -1*places[i].lng};
			console.log(placePosition);
			var locationMarker = new google.maps.Marker({
				map: map,
				position: placePosition,
				name: places[i].name,
			});
			self.locationsMarkers.push(locationMarker);
		};

	};

	this.initMap();
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

