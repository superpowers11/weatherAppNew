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
      currentWeatherType = currentWeatherType.replace('-',' ');
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


// // Ionic Starter App

// // angular.module is a global place for creating, registering and retrieving Angular modules
// // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// // the 2nd parameter is an array of 'requires'
// // 'starter.services' is found in services.js
// // 'starter.controllers' is found in controllers.js
// angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//     // for form inputs)
//     if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//       cordova.plugins.Keyboard.disableScroll(true);

//     }
//     if (window.StatusBar) {
//       // org.apache.cordova.statusbar required
//       StatusBar.styleDefault();
//     }
//   });
// })

// .config(function($stateProvider, $urlRouterProvider) {

//   // Ionic uses AngularUI Router which uses the concept of states
//   // Learn more here: https://github.com/angular-ui/ui-router
//   // Set up the various states which the app can be in.
//   // Each state's controller can be found in controllers.js
//   $stateProvider

//   // setup an abstract state for the tabs directive
//     .state('tab', {
//     url: '/tab',
//     abstract: true,
//     templateUrl: 'templates/tabs.html'
//   })

//   // Each tab has its own nav history stack:

//   .state('tab.dash', {
//     url: '/dash',
//     views: {
//       'tab-dash': {
//         templateUrl: 'templates/tab-dash.html',
//         controller: 'DashCtrl'
//       }
//     }
//   })

//   .state('tab.chats', {
//       url: '/chats',
//       views: {
//         'tab-chats': {
//           templateUrl: 'templates/tab-chats.html',
//           controller: 'ChatsCtrl'
//         }
//       }
//     })
//     .state('tab.chat-detail', {
//       url: '/chats/:chatId',
//       views: {
//         'tab-chats': {
//           templateUrl: 'templates/chat-detail.html',
//           controller: 'ChatDetailCtrl'
//         }
//       }
//     })

//   .state('tab.account', {
//     url: '/account',
//     views: {
//       'tab-account': {
//         templateUrl: 'templates/tab-account.html',
//         controller: 'AccountCtrl'
//       }
//     }
//   });

//   // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/tab/dash');

// });
