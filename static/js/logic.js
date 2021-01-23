// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
 });

// Create the map object with options
var map = L.map("map", {
  center: [36, -119],
  zoom: 2
 });
lightmap.addTo(map);

// URL to earthquake json data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(data) {

  function geojsonMarkerOptions(feature) { 
    return {
      radius: markerSize(feature.properties.mag),
      fillColor: markerColor(feature.geometry.coordinates[2]),
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }
  };

  // function to return the color based on magnitude
  function markerColor(depth) {
  console.log(depth)

    if (depth > 80) {
      return 'red'
    } else if (depth > 60) {
      return 'orange'
    } else if (depth > 40) {
      return 'yellow'
    } else {
      return 'green'
    }
  }

  // function to determine marker size based on magnitude
  function markerSize(magnitude) {
    return magnitude * 5;
  }

  console.log(data);
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    }, style: geojsonMarkerOptions
  }).addTo(map);
  // updateLegend(updatedAt, stationCount);
});

// // Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, stationCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//     "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
//     "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//     "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//     "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//   ].join("");
// }
