var searchCity = $("#city-input");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#city-name");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUVindex= $("#uv-index");


$(document).ready(function(){
    
        $("#search-button").click(function(){

            var cityName = $("#city-input").val();

            var APIKey = "95487d5cbd29d0353364e1da4ff4703f";

            
            if (cityName != ""){

                var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

                $.ajax({

                    url:queryURL,
                    method: "GET",
                    type: "jsonp",
                    success: function (data) {
                        console.log(data);
                        currentWeather(data)
                    }
                });

            }else{
                $("#error").html("Please enter a city.");
            }
        });
    });
function currentWeather(response){
    console.log(currentTemperature)
    currentCity.text(response.name);
    currentTemperature.text("Temperature:" + response.main.temp);
    currentHumidty.text("Humidity:" + response.main.humidity);
    currentWindSpeed.text("Wind Speed:" + response.wind.speed);        
}
function forecastWeather(response)
    