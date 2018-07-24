
var locations = [
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

	locations.forEach(function (locationItem){
		console.log(locationItem.name+' '+locationItem.address);
		self.locationsList.push( new Location(locationItem) );
	});
};

ko.applyBindings(new mapViewModel());
