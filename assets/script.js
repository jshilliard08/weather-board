var searchCity = $("#city-input");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#city-name");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUVindex= $("#UV-index");
var APIKey = "95487d5cbd29d0353364e1da4ff4703f"

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

function forecastWeather(){
    console.log()

    var forecastURL = ""
}
forecastWeather()
//function forecastWeather(response)
    