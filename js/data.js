// source: https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States

var places = [
    {
        name: "Acadia",
        lat: 44.35,
        lng: 68.21,
        state: "Maine"
    },
    {
        name: "American Samoa",
        lat: 14.25,
        lng: 170.68,
        state: "American Samoa"
    },
    {
        name: "Arches",
        lat: 38.68,
        lng: 109.57,
        state: "Utah"
    },
    {
        name: "Badlands",
        lat: 43.75,
        lng: 102.5,
        state: "South Dakota"
    },
    {
        name: "Big Bend",
        lat: 29.25,
        lng: 103.25,
        state: "Texas"
    },
    {
        name: "Biscayne",
        lat: 25.48,
        lng: 80.21,
        state: "Florida"
    },
    {
        name: "Black Canyon of the Gunnison",
        lat: 38.57,
        lng: 107.72,
        state: "Colorado"
    },
    {
        name: "Bryce Canyon",
        lat: 37.57,
        lng: 112.18,
        state: "Utah"
    },
    {
        name: "Canyonlands",
        lat: 38.2,
        lng: 109.93,
        state: "Utah"
    },
    {
        name: "Capitol Reef",
        lat: 38.2,
        lng: 111.17,
        state: "Utah"
    },
    {
        name: "Carlsbad Caverns",
        lat: 32.17,
        lng: 104.44,
        state: "New Mexico"
    },
    {
        name: "Channel Islands",
        lat: 34.01,
        lng: 119.42,
        state: "California"
    },
    {
        name: "Congaree",
        lat: 33.78,
        lng: 80.78,
        state: "South Carolina"
    },
    {
        name: "Crater Lake",
        lat: 42.94,
        lng: 122.1,
        state: "Oregon"
    },
    {
        name: "Cuyahoga Valley",
        lat: 41.24,
        lng: 81.55,
        state: "Ohio"
    },
    {
        name: "Death Valley",
        lat: 36.24,
        lng: 116.82,
        state: "California"
    },
    {
        name: "Denali",
        lat: 63.33,
        lng: 150.5,
        state: "Alaska"
    },
    {
        name: "Dry Tortugas",
        lat: 24.63,
        lng: 82.87,
        state: "Florida"
    },
    {
        name: "Everglades",
        lat: 25.32,
        lng: 80.93,
        state: "Florida"
    },
    {
        name: "Gates of the Arctic",
        lat: 67.78,
        lng: 153.3,
        state: "Alaska"
    },
    {
        name: "Gateway Arch",
        lat: 38.63,
        lng: 90.19,
        state: "Missouri"
    },
    {
        name: "Glacier",
        lat: 48.8,
        lng: 114,
        state: "Montana"
    },
    {
        name: "Glacier Bay",
        lat: 58.5,
        lng: 137,
        state: "Alaska"
    },
    {
        name: "Grand Canyon",
        lat: 36.06,
        lng: 112.14,
        state: "Arizona"
    },
    {
        name: "Grand Teton",
        lat: 43.73,
        lng: 110.8,
        state: "Wyoming"
    },
    {
        name: "Great Basin",
        lat: 38.98,
        lng: 114.3,
        state: "Nevada"
    },
    {
        name: "Great Sand Dunes",
        lat: 37.73,
        lng: 105.51,
        state: "Colorado"
    },
    {
        name: "Great Smoky Mountains",
        lat: 35.68,
        lng: 83.53,
        state: "Tennessee"
    },
    {
        name: "Guadalupe Mountains",
        lat: 31.92,
        lng: 104.87,
        state: "Texas"
    },
    {
        name: "Haleakalā",
        lat: 20.72,
        lng: 156.17,
        state: "Hawaii"
    },
    {
        name: "Hawaiʻi Volcanoes",
        lat: 19.38,
        lng: 155.2,
        state: "Hawaii"
    },
    {
        name: "Hot Springs",
        lat: 34.51,
        lng: 93.05,
        state: "Arkansas"
    },
    {
        name: "Isle Royale",
        lat: 48.1,
        lng: 88.55,
        state: "Michigan"
    },
    {
        name: "Joshua Tree",
        lat: 33.79,
        lng: 115.9,
        state: "California"
    },
    {
        name: "Katmai",
        lat: 58.5,
        lng: 155,
        state: "Alaska"
    },
    {
        name: "Kenai Fjords",
        lat: 59.92,
        lng: 149.65,
        state: "Alaska"
    },
    {
        name: "Kings Canyon",
        lat: 36.8,
        lng: 118.55,
        state: "California"
    },
    {
        name: "Kobuk Valley",
        lat: 67.55,
        lng: 159.28,
        state: "Alaska"
    },
    {
        name: "Lake Clark",
        lat: 60.97,
        lng: 153.42,
        state: "Alaska"
    },
    {
        name: "Lassen Volcanic",
        lat: 40.49,
        lng: 121.51,
        state: "California"
    },
    {
        name: "Mammoth Cave",
        lat: 37.18,
        lng: 86.1,
        state: "Kentucky"
    },
    {
        name: "Mesa Verde",
        lat: 37.18,
        lng: 108.49,
        state: "Colorado"
    },
    {
        name: "Mount Rainier",
        lat: 46.85,
        lng: 121.75,
        state: "Washington"
    },
    {
        name: "North Cascades",
        lat: 48.7,
        lng: 121.2,
        state: "Washington"
    },
    {
        name: "Olympic",
        lat: 47.97,
        lng: 123.5,
        state: "Washington"
    },
    {
        name: "Petrified Forest",
        lat: 35.07,
        lng: 109.78,
        state: "Arizona"
    },
    {
        name: "Pinnacles",
        lat: 36.48,
        lng: 121.16,
        state: "California"
    },
    {
        name: "Redwood",
        lat: 41.3,
        lng: 124,
        state: "California"
    },
    {
        name: "Rocky Mountain",
        lat: 40.4,
        lng: 105.58,
        state: "Colorado"
    },
    {
        name: "Saguaro",
        lat: 32.25,
        lng: 110.5,
        state: "Arizona"
    },
    {
        name: "Sequoia",
        lat: 36.43,
        lng: 118.68,
        state: "California"
    },
    {
        name: "Shenandoah",
        lat: 38.53,
        lng: 78.35,
        state: "Virginia"
    },
    {
        name: "Theodore Roosevelt",
        lat: 46.97,
        lng: 103.45,
        state: "North Dakota"
    },
    {
        name: "Virgin Islands",
        lat: 18.33,
        lng: 64.73,
        state: "U.S. Virgin Islands"
    },
    {
        name: "Voyageurs",
        lat: 48.5,
        lng: 92.88,
        state: "Minnesota"
    },
    {
        name: "Wind Cave",
        lat: 43.57,
        lng: 103.48,
        state: "South Dakota"
    },
    {
        name: "Wrangell–St. Elias",
        lat: 61,
        lng: 142,
        state: "Alaska"
    },
    {
        name: "Yellowstone",
        lat: 44.6,
        lng: 110.5,
        state: "Wyoming"
    },
    {
        name: "Yosemite",
        lat: 37.83,
        lng: 119.5,
        state: "California"
    },
    {
        name: "Zion",
        lat: 37.3,
        lng: 113.05,
        state: "Utah"
    }
];