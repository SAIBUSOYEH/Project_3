<<<<<<< HEAD
var globalCountries;
// An array of cities and their locations
d3.csv("/data/Project3.csv").then(function(countries) {
  console.log(countries)
  globalCountries=countries;
  // An array which will be used to store created cityMarkers
  var countryMarkers = [];

  function markerSize(Year) {
    return Year*.00000075;
  }

  function markerColor(Year) {
    if (Year<= 100) {
        return "rgb(255,191,0)";
    } else if (Year <= 1000) {
        return "rgb(255,255,0)";
    } else if (Year <= 10000) {
        return "rgb(191,255,0)";
    } else if (Year <= 100000) {
        return "rgb(0,255,191)";
    } else if (Year <= 1000000) {
        return "rgb(0,191,200)";
    } else if (Year <= 10000000) {
        return "rgb(0,191,255)";
    } else {
        return "rgb(255,0,128)";
    };
  }
// console.log(countries.Year_2017)
countryMax = d3.max(countries,x => x.Year_2017)
var dotScale = d3.scaleSqrt().domain([0,countryMax]).range([0, 1])
console.log(dotScale(9000))


  for (var i = 0; i < countries.length; i++) {
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    countryMarkers.push(
      //L.marker([countries[i].lat,countries[i].lon]).bindPopup("<h1>" + countries[i].Country + "</h1>","<h1>" + countries[i].yr_2017 + "</h1>")
      L.circleMarker([countries[i].lat,countries[i].lon],
        {
          radius: dotScale(countries[i].Year_2017) ,
          // radius: markerSize(countries[i].Year_2017),
          fillColor: markerColor(countries[i].Year_2017),
          color: "color",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        } 
        )
      .bindPopup("<h1>" + countries[i].Country + "</h3><hr><p>Malaria reportedly recorded(2017): " + countries[i].Year_2017 + "</p>"+"</h3><hr><p>Malaria reportedly recorded(2016): " + countries[i].Year_2016 + "</p>" +"</h3><hr><p>Malaria reportedly recorded(2015): " + countries[i].Year_2015 + "</p>" +"</h3><hr><p>Malaria reportedly recorded(2014): " + countries[i].Year_2014 + "</p>" +"</h3><hr><p>Malaria reportedly recorded(2013): " + countries[i].Year_2013 + "</p>" +"</h3><hr><p>Malaria reportedly recorded(2012): " + countries[i].Year_2012 + "</p>" +"</h3><hr><p>Malaria reportedly recorded(2011): " + countries[i].Year_2011 + "</p>" +"</h3><hr><p>Malaria reportedly recorded(2010): " + countries[i].Year_2010 + "</p>")
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
    center: [23.37, 58.36],
    zoom: 4,
    layers: [light, countryLayer]
  });
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);


  function getColor(Year) {
    return Year <= 99 ? 'rgb(255,191,0)' :
    Year <= 999  ? 'rgb(255,255,0)' :
    Year <= 9999  ? 'rgb(191,255,0)' :
    Year <= 99999  ? 'rgb(0,255,191)' :
    Year <= 999999  ? 'rgb(0,191,200)' :
    Year <= 9999999  ? 'rgb(0,191,255)' :
                      'rgb(255,0,128)';
  }
  
  // Create a legend to display information about our map
  var legend = L.control({position: 'bottomright'});
  
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    grades = [100, 1000, 10000, 100000, 1000000, 10000000],
    labels = [];
  
    div.innerHTML+='Malaria data Reported<br><hr>'
  
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

=======
var globalCountries;
// An array of cities and their locations
d3.csv("data/Project3.csv").then(function(countries) {
  console.log(countries)
  globalCountries=countries;
  // An array which will be used to store created cityMarkers
  var countryMarkers = [];

  function markerSize(Year) {
    return Year*.00000075;
  }

  function markerColor(Year) {
    if (Year<= 100) {
        return "rgb(255,191,0)";
    } else if (Year <= 1000) {
        return "rgb(255,255,0)";
    } else if (Year <= 10000) {
        return "rgb(191,255,0)";
    } else if (Year <= 100000) {
        return "rgb(0,255,191)";
    } else if (Year <= 1000000) {
        return "rgb(0,191,200)";
    } else if (Year <= 10000000) {
        return "rgb(0,191,255)";
    } else {
        return "rgb(255,0,128)";
    };
  }
// console.log(countries.Year_2017)
countryMax = d3.max(countries,x => x.Year_2017)
var dotScale = d3.scaleSqrt().domain([0,countryMax]).range([0, 1])
console.log(dotScale(9000))


  for (var i = 0; i < countries.length; i++) {
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    countryMarkers.push(
      //L.marker([countries[i].lat,countries[i].lon]).bindPopup("<h1>" + countries[i].Country + "</h1>","<h1>" + countries[i].yr_2017 + "</h1>")
      L.circleMarker([countries[i].lat,countries[i].lon],
        {
          radius: dotScale(countries[i].Year_2017) ,
          // radius: markerSize(countries[i].Year_2017),
          fillColor: markerColor(countries[i].Year_2017),
          color: "color",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        } 
        )
      .bindPopup("<h1>" + countries[i].Country + "</h3><hr><p>Malaria reportedly recorded(2017): " + countries[i].Year_2017 + "</p>")
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
    center: [23.37, 58.36],
    zoom: 4,
    layers: [light, countryLayer]
  });
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);


  function getColor(Year) {
    return Year <= 99 ? 'rgb(255,191,0)' :
    Year <= 999  ? 'rgb(255,255,0)' :
    Year <= 9999  ? 'rgb(191,255,0)' :
    Year <= 99999  ? 'rgb(0,255,191)' :
    Year <= 999999  ? 'rgb(0,191,200)' :
    Year <= 9999999  ? 'rgb(0,191,255)' :
                      'rgb(255,0,128)';
  }
  
  // Create a legend to display information about our map
  var legend = L.control({position: 'bottomright'});
  
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    grades = [100, 1000, 10000, 100000, 1000000, 10000000],
    labels = [];
  
    div.innerHTML+='Malaria data Reported<br><hr>'
  
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

>>>>>>> 5dea447289fc05f9b6757664a419a6469efb2472
