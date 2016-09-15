// CPS 371 P1 Weather App 

'use strict'; 

var weatherApp = angular.module('weather', ['ionic', 'ngResource']);


var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY', 
    function($q, $resource, $http, FORECASTIO_KEY) {
  var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

  return {
      getCurrentWeather: function(lat, lng) {
    return $http.jsonp(url + lat + ',' + lng +
           '?callback=JSON_CALLBACK');
      }
  }
    }
];


weatherApp.constant('FORECASTIO_KEY', 'd7115d216c5a5c3f31214ea6223d867a');

weatherApp.controller('MainCtrl',
    function($scope,$state,WeatherData) {
  var latitude  = 42.589611;
  var longitude = -70.819806;
    
  //call getCurrentWeather method in factory
  WeatherData.getCurrentWeather(latitude,longitude).then(function(resp) {
      $scope.current = resp.data;
      //Set background image based on "icon" data from weather API
      var currentWeatherType = resp.data.currently.icon;
      var weatherOptions = ['clear-day', 'clear-night', 
      'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 
      'partly-cloudy-day', 'partly-cloudy-night'];
      var defaultNeeded = true;
      for (var i = 0; i < weatherOptions.length; i++) {
        if (weatherOptions[i] === currentWeatherType) {
          defaultNeeded = false;
        }
      }

      if (defaultNeeded === false) {
        console.log('We found the icon! File at: ' + currentWeatherType +'.jpg');
      }
      else {
        console.log('No icon for this type of weather. Use default instead.');
        currentWeatherType = 'default';
      }
      $scope.iconUrl = '/img/'+currentWeatherType+'.jpg';
      currentWeatherType = currentWeatherType.replace(/-/g,' ');
      $scope.iconName = currentWeatherType.charAt(0).toUpperCase() 
      + currentWeatherType.slice(1);

      console.log('GOT CURRENT', $scope.current);
  }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
  });
    }
);


weatherApp.factory('WeatherData', forecastioWeather);


