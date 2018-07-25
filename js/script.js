
var places = [
	{
		name: 'Location 1',
		address: 'ABC'
	},
	{
		name: 'Location 2',
		address: 'EFG'
	},
	{
		name: 'Location 3',
		address: 'HIJ'
	},
	{
		name: 'Location 4',
		address: 'KLM'
	}
];


var Location = function(data) {
	this.name = ko.observable(data.name);
	this.address = ko.observable(data.address);
}


function mapViewModel() {
	var self = this;

	this.locationsList = ko.observableArray([]);

	//query data-binds to the search input
	this.query = ko.observable('');

	places.forEach(function(item) {
		self.locationsList.push( new Location(item) );
	});

	//computed observable for the filtered list
	this.filteredList = ko.computed(function() {
		var result = ko.observableArray([]);

		if (this.query() == '') {
			result = self.locationsList;
		} else {
			for (p in places) {
				//if query (not case sensitive) is in p.name
				if (places[p].name.toLowerCase().
					indexOf(this.query().toLowerCase()) >= 0) {
					result.push(places[p]);
				}
			}
		}

		return result();
	}, this);

};

ko.applyBindings(new mapViewModel());
