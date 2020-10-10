

moment().format('L');

function searchCity(cityname) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=f1ecd9ec5526a01556f7eaa323c1c11f";
    var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=f1ecd9ec5526a01556f7eaa323c1c11f";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
        $("#current").empty();
       var mainDate = moment().format('ddd l LT');
 

        var cityNameEl = $("<h2>").text(response.name);
        var displayMainDate = cityNameEl.append(" " + "-- " + mainDate);
        var tempEL = $("<p>").text("Tempraturer: " + Math.trunc(response.main.temp) + " \xB0F");
        var humEl = $("<p>").text("Humidity: " + response.main.humidity + " %");
        var windEl = $("<p>").text("Wind Speed: " + Math.trunc(response.wind.speed) + " mph");
        var currentweather = response.weather[0].main;

        if (currentweather === "Rain") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        } else if (currentweather === "Clouds") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        } else if (currentweather === "Clear") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        } else if (currentweather === "Drizzle") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        } else if (currentweather === "Snow") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        }
        var newDiv = $('<div>');

        newDiv.append(displayMainDate, currentIcon, tempEL, humEl, windEl);

        $("#current").html(newDiv);
        
//--------------------------------------------- UV section ---------------------------------------//

var lat = response.coord.lat;
var lon = response.coord.lon;
var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=f1ecd9ec5526a01556f7eaa323c1c11f&lat=" + lat  + "&lon=" + lon;

        $.ajax({
            url: queryURLUV,
            method: 'GET'
        }).then(function (response) {
            $('#uvl-display').empty();
            var uvlresults = response.value;
            var uvlEl = $("<button class='btn bg-success'>").text("UV Index: " + response.value);
      
            $('#uvl-display').html(uvlEl);
    
        });
    });

