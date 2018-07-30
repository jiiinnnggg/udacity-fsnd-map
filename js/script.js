
// hamburger icon in nav collapses sidebar
$(document).ready(function () {
    $('#hamburger-icon').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

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

			// wikipedia API search + timeout
			var searchName = marker.name+' National Park';
			var wikiRequestTimeout = setTimeout(function() {
		        console.log("Failed to get wikipedia resources prior to timeout.");
		    }, 5000);

			// wikipedia ajax request, generates wiki links
			$.ajax({
		        url: "https://en.wikipedia.org/w/api.php",
		        data: {
		            "action": "opensearch",            
		            "format": "json",
		            "search": searchName,
		            "rvprop": "content"
		        },
		        dataType: 'jsonp',
		        type: 'POST',
		        headers: { 'Api-User-Agent': 'Example/1.0' },
		        success: function( jsondata ) {
		        	var wikiBlurb = jsondata[2][0];
		        	self.wikiContent += '<hr><div>'+wikiBlurb+'</div>'+
		        		'<div><hr><strong>Wikipedia Links:</strong></div><ol>';

		            for (j=0; j< jsondata[1].length; j++) {
		                var wikiTitle = jsondata[1][j];
		             	var wikiUrl = jsondata[3][j];
		                self.wikiContent += '<li class="wiki">'+
		                    '<a target="_blank" href="'+wikiUrl+'">'+wikiTitle+'</a>'+
		                    '</li>';
		        	};
		        	self.wikiContent +='</ol>';
		        	infowindow.setContent(self.infowindowTitle + self.wikiContent);		           
		        	clearTimeout(wikiRequestTimeout);
		        }
		    }).fail(function() {
		    	infowindow.setContent(self.infowindowTitle);
                alert("Failed to get wikipedia resources prior to timeout.");
			});
			this.infowindowTitle = '<h6>'+searchName+'</h6>';
			this.wikiContent = '';

			infowindow.open(map, marker);
			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
			});
		}
	};

	// KO clicks call makeMarker for the filteredList links	
	this.makeMarker = function() {
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
		
		this.largeInfoWindow = new google.maps.InfoWindow({
			maxWidth: 240
		});

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

// google maps error
function googMapsError() {
    alert('Google Maps could not load properly. Please check the API request URL and parameters.');
}

// google maps callback runs runApp
function runApp() {
	ko.applyBindings(new mapViewModel());
}
