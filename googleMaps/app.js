
function initMap() {
    initBaseMap();
    initDirectionMap();
    initMarkerMap();
    initCircleMarkMap();
    initHeatMap();
}

function initBaseMap() {
    var map = new google.maps.Map(document.getElementById('baseMap'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
}

function initDirectionMap() {
    var chicago = {lat: 41.85, lng: -87.65};
    var indianapolis = {lat: 39.79, lng: -86.14};

    var map = new google.maps.Map(document.getElementById('directionMap'), {
      center: chicago,
      zoom: 7
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    });

    // Set destination, origin and travel mode.
    var request = {
      destination: indianapolis,
      origin: chicago,
      travelMode: 'DRIVING'
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });
}

function initMarkerMap() {
    var myLatLng = {lat: -25.363, lng: 131.044};

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('markerMap'), {
      center: myLatLng,
      zoom: 4
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
      title: 'Hello World!'
    });
}

var circleMarkMap;
function initCircleMarkMap() {
    circleMarkMap = new google.maps.Map(document.getElementById('circleMarkMap'), {
      zoom: 2,
      center: {lat: -33.865427, lng: 151.196123},
      mapTypeId: 'terrain'
    });

    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');

    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    circleMarkMap.data.setStyle(function(feature) {
      var magnitude = feature.getProperty('mag');
      return {
        icon: getCircle(magnitude)
      };
    });
}

function getCircle(magnitude) {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'red',
      fillOpacity: .2,
      scale: Math.pow(2, magnitude) / 2,
      strokeColor: 'white',
      strokeWeight: .5
    };
}

var heatMap;
function initHeatMap() {
    heatMap = new google.maps.Map(document.getElementById('heatMap'), {
      zoom: 2,
      center: {lat: -33.865427, lng: 151.196123},
      mapTypeId: 'terrain'
    });

    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');

    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function eqfeed_callback(results) {
    circleMarkMap.data.addGeoJson(results);
    
    var heatmapData = [];
    for (var i = 0; i < results.features.length; i++) {
      var coords = results.features[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1], coords[0]);
      heatmapData.push(latLng);
    }
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      dissipating: false,
      map: heatMap
    });
}

