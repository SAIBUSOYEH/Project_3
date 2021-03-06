var globalCountries;
// An array of cities and their locations
d3.csv("/data/Project3.csv").then(function(countries) {
  console.log(countries)
  globalCountries=countries;
  // An array which will be used to store created cityMarkers
  var countryMarkers = [];

  function markerSize(Year) {
    return Year*50;
  }

  function markerColor(Year) {
    if (Year<= 1) {
        return "rgb(255,191,0)";
    } else if (Year <= 5) {
        return "rgb(255,255,0)";
    } else if (Year <= 10) {
        return "rgb(191,255,0)";
    } else if (Year <= 20) {
        return "rgb(0,255,191)";
    } else if (Year <= 30) {
        return "rgb(0,191,200)";
    } else if (Year <= 40) {
        return "rgb(0,191,255)";
    } else if (Year <= 50) {
        return "rgb(255,128,191)";
    } else if (Year <= 60) {
        return "rgb(255,0,0)";
    } else if (Year <= 70) {
        return "rgb(38,0,230)";
    } else if (Year <= 80) {
        return "rgb(42,0,51)";
    } else if (Year <= 90) {
        return "rgb(25,25,255)";
    } else {
        return "rgb(255,0,128)";
    };
  }
// console.log(countries.Year_2017)
countryMax = d3.max(countries,x => x.Per_Population_2017)
var dotScale = d3.scaleSqrt().domain([0,countryMax]).range([0, 7])
console.log(dotScale(9000))


  for (var i = 0; i < countries.length; i++) {
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    countryMarkers.push(
      //L.marker([countries[i].lat,countries[i].lon]).bindPopup("<h1>" + countries[i].Country + "</h1>","<h1>" + countries[i].yr_2017 + "</h1>")
      L.circleMarker([countries[i].lat,countries[i].lon],
        {
          radius: dotScale(countries[i].Per_Population_2017) ,
          // radius: markerSize(countries[i].Year_2017),
          fillColor: markerColor(countries[i].Per_Population_2017),
          color: "color",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        } 
        )
      .bindPopup("<h1>" + countries[i].Country + "</h3><hr><p>Malaria reportedly recorded(2017): " + countries[i].Per_Population_2017 + "</p>")
    );
  }
  // Add all the countryMarkers to a new layer group.
  // Now we can handle them as one group instead of referencing each individually
  var countryLayer = L.layerGroup(countryMarkers);
  // Define variables for our tile layers
  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  // Only one base layer can be shown at a time
  var baseMaps = {
    Light: light,
    Dark: dark
  };
  // Overlays that may be toggled on or off
  var overlayMaps = {
    countries: countryLayer
  };
  // Create map object and set default layers
  var myMap = L.map("map", {
    center: [-3.9834587,12.6792357],
    zoom: 4,
    layers: [light, countryLayer]
  });
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);


  function getColor(Year) {
    return Year <= 1 ? 'rgb(255,191,0)' :
    Year <= 5  ? 'rgb(255,255,0)' :
    Year <= 10  ? 'rgb(191,255,0)' :
    Year <= 20  ? 'rgb(0,255,191)' :
    Year <= 30  ? 'rgb(0,191,200)' :
    Year <= 40  ? 'rgb(0,191,255)' :
    Year <= 50  ? 'rgb(255,128,191)' :
    Year <= 60  ? 'rgb(255,0,0)' :
    Year <= 70  ? 'rgb(38,0,230)' :
    Year <= 80  ? 'rgb(42,0,51)' :
    Year <= 90  ? 'rgb(25,25,255)' :
                      'rgb(255,0,128)';
  }

  // Create a legend to display information about our map
  var legend = L.control({position: 'bottomright'});
  
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    grades = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80,90],
    labels = [];
  
    div.innerHTML+='%of malaria reported/country population<br><hr>'
  
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 0.01) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  
  return div;
  };
  
  legend.addTo(myMap);
  
  });

