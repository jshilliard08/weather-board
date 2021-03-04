var searchCity = $("#city-input");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#city-name");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUVindex= $("#UV-index");
var APIKey = "95487d5cbd29d0353364e1da4ff4703f";

for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}

var keyCount = 0;

$(document).ready(function(){
    
        $("#search-button").click(function(){

            var cityName = $("#city-input").val();

            if (cityName != ""){

                var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

                $.ajax({

                    url:queryURL,
                    method: "GET",
                    type: "jsonp",
                    success: function (data) {
                        console.log(data);
                        currentWeather(data)
                        var lat = data.coord.lat
                        var lon = data.coord.lon
                        UVIndex(lat,lon)
                        forecastWeather(lat,lon)
                        var cityName = $(".list-group").addClass("list-group-item");
                        cityName.append("<li>" + data.name + "</li>");
                        // Local storage
                        var local = localStorage.setItem(keyCount, data.name);
                        keyCount = keyCount + 1;
                        
                    }
                });

            }else{
                $("#error").html("Please enter a city.");
            }
        });
    });
function currentWeather(response){
    console.log(currentTemperature)
    console.log(response);
    //Get weather icon from data and creating a url 
    var weathericon= response.weather[0].icon;
    var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
    //Used a date method found on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    var date=new Date(response.dt*1000).toLocaleDateString();
    //Displaying the city's name, the date and an cloud icon
    $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
    //Converting the temperature into Fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    //Displaying temperature in Fahrenheit
    $(currentTemperature).html("Temperature: " + (tempF).toFixed(2)+"&#8457");
    //Displaying the Humidity
    $(currentHumidty).html("Humidity: " + response.main.humidity+"%");
    //Converting to MPH
    var ws=response.wind.speed;
    var windsmph=(ws*2.237).toFixed(1);
    //Displaying windspeed in MPH
    $(currentWindSpeed).html("Wind Speed: " + windsmph+"MPH"); 
}
function UVIndex(lat,lon) {
    //passing lat and lon data from current weather URL
    console.log(lat)
    console.log(lon)
//Getting data from UV index URL
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon="+ lon + "&appid=" + APIKey 

    $.ajax({

        url:uvURL,
        method: "GET",
        success: function(data){
            console.log(data)
        $(currentUVindex).html("UV Index: " + data.value)
        }
    


        })

}
//function forecastWeather(response)
function forecastWeather(lat, lon){

    var forecastWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
    console.log(forecastWeatherURL)
    $.ajax({
        url:forecastWeatherURL,
        method:"GET",
        success: function(data){
            console.log(data)
            const forecastEls = document.querySelectorAll(".forecast");
            for (i=0; i<5; i++) {
                forecastEls[i].innerHTML = "";
                const forecastIndex = i;
                const forecastDate = new Date(data.daily[forecastIndex].dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();
                const forecastDateEl = document.createElement("p");
                forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecastEls[i].append(forecastDateEl);
                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[forecastIndex].weather[0].icon + "@2x.png");
                forecastWeatherEl.setAttribute("alt",data.daily[forecastIndex].weather[0].description);
                forecastEls[i].append(forecastWeatherEl);
                const forecastTempEl = document.createElement("p");
                forecastTempEl.innerHTML = "Temp: " + (data.daily[forecastIndex].temp.day) + " &#176F";
                forecastEls[i].append(forecastTempEl);
                const forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.innerHTML = "Humidity: " + data.daily[forecastIndex].humidity + "%";
                forecastEls[i].append(forecastHumidityEl);
                const forecastWindSpeedEl = document.createElement("p");
                forecastWindSpeedEl.innerHTML ="Wind Speed: " + data.daily[forecastIndex].wind_speed + "MPH";
                forecastEls[i].append(forecastWindSpeedEl);
                }
        }
    })
}
$("#clear-history").click(function() {
    console.log();
    localStorage.clear();
    $(".list-group").html = ("");
})