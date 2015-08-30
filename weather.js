$(function() { // jQuery
  var units ;
  // position IP
  //locationIP();
  function locationIP() {

    $.get("http://ipinfo.io", function(location) {

      console.log("IP pos " + location.loc);
      console.log(location.city);
      console.log(location.country);

      weatherByPos(location.loc, " IP position", units);
    }, "json");


  }
  // position navigator
  getLocation();

  function getLocation() {
    console.log("units " + units);
    if (navigator.geolocation) {
      //  navigator.geolocation.watchPosition(showPosition, showError); getCurrentPosition
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      $('#city').text("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    $('#city').text("Latitude: " + position.coords.latitude +
      "  Longitude: " + position.coords.longitude);
    console.log("gpsPosition");
    weatherByPos(position.coords.latitude + "," + position.coords.longitude, " GPS position", units);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        $('#city').text("User denied the request for Geolocation. Position IP is used.");
        locationIP();

        break;
      case error.POSITION_UNAVAILABLE:
        $('#city').text("Location information is unavailable.");

        break;
      case error.TIMEOUT:
        $('#city').text("The request to get user location timed out.");

        break;
      case error.UNKNOWN_ERROR:
        $('#city').text("An unknown error occurred.");

        break;
    }
  }
  // &APPID=ba7b81140fa7455096e194fe94222d86
  // weather city
  //weatherByCity();
  function weatherByCity() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Bratislava&units=metric&APPID=ba7b81140fa7455096e194fe94222d86", function(pocasie) {
      console.log(pocasie);
      console.log(pocasie.name);
      console.log(pocasie.main.temp);
      $('#mesto').text("mesto : " + pocasie.name);
      $('#teplota').text("teplota : " + pocasie.main.temp);
      $('#pocasie').text("pocasie : " + pocasie.weather[0].description);
      $('#cas').text("cas : " + new Date(pocasie.dt * 1000).toLocaleDateString("sk-sk", options3)); // milisec to sec
      $('#cas2').text("cas2 : " + localDate(pocasie.dt * 1000));
    })



    var options3 = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      ur12: false
    }
  }
  function localDate(d) {
    var dateobj = new Date(d);
    function pad(n) {
      return n < 10 ? "0" + n : n;
    }

    var result = pad(dateobj.getDate()) + "/" + pad(dateobj.getMonth() + 1) + "/" + dateobj.getFullYear();
    return result;
  }
  // weather lat lon

  //  weatherByPos();
  function weatherByPos(pos, status, units) {

    var lat = 48;
    var lon = 17;
    var latlon = pos.split(",");
    lat = latlon[0];
    lon = latlon[1];

    //  var units = "metric";
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&APPID=ba7b81140fa7455096e194fe94222d86";
    $.getJSON(url, function(w) {
      //  console.log(w);
      console.log(status + " " + w.name);
      console.log(status + " " + w.main.temp);
      $('#temp').text(w.main.temp);
      $('#city').text(w.name);
      $('#icon').find("img:first-child").remove();
      $('#icon')
        .prepend("<img src='http://openweathermap.org/img/w/" + w.weather[0].icon + ".png'>");
      if (units === "metric") {
        $('#temp').append(" C");
      } else {
        $('#temp').append(" F");
      }
      $('#temp').prepend("Temp : ");
      $('#city').prepend("City : ");
    });
  }
  // farenhait to celsius convert or reverse
  $('#fc').click(function() {
    console.log("1" + units);
    if (units === "metric") {
      units = "imperial";
      getLocation();
      console.log("2" + units);
    } else {
      units = "metric";
      getLocation();
      console.log("2" + units);
    }
  })
}) // jQuery end
