$(document).ready(function () {
    {
        $("#search-button").click(function () {

            var cityName = $("#search-city").val();

            const APIKey = "95487d5cbd29d0353364e1da4ff4703f";

            if (cityName != ""){

                $.ajax({

                    url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + APIKey,
                    type: "GET",
                    dataType: "jsonp",
                    success: function (data) {
                        console.log(data);
                    }
                });

            }else{
                $("#error").html("Please enter a city.");
            }
        });
    });
