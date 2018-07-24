
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
	this.query = ko.observable('');

	places.forEach(function(item) {
		self.locationsList.push( new Location(item) );

	});


};

ko.applyBindings(new mapViewModel());
