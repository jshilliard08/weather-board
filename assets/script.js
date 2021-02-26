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
    

   function currentUV(lon,lat){
    var lat = response.data.coord.lat; 
    var lon = response.data.coord.lon;
    //lets build the url for uvindex.
    var uvURL="https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
    $.ajax({
            url:uvURL,
            method:"GET"
            currentUV (response) {
                console.log(data);
                currentUVindex(data)
                currentUVindex.html.response.val
    }});
        
        
}
}

//function forecastWeather(response)
    