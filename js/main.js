/**
 * @author Harry Chen <harrychen0702@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var IMDB = angular.module('IMDB', [
  'IMDB.controllers','ui.router',
]);

/**
 * Configure the Routes
 */
// app.config(['$routeProvider', function ($routeProvider) {
//   $routeProvider
//     // Home
//     .when("/", {templateUrl: "partials/home.html", controller: "HomeCtrl"})
//     // Pages
//     .when("/about", {templateUrl: "partials/about.html", controller: "AboutCtrl"})

//     .when("/movie",{templateUrl:"partials/movie.html", controller: "MovieCtrl"})
    
//     .otherwise("/404", {templateUrl: "partials/404.html", controller: "TestCtrl"});
// }]);
IMDB.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

IMDB.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller:'HomeCtrl'
        })

        .state('movie',{
        	url:'/movie',
        	templateUrl:'partials/movie.html',
            params:{movie_object:null},
        	controller:'MovieCtrl'
        })

        .state('search_result',{
            url:'/search_result',
            templateUrl:'partials/search_result.html',
            params:{movie_list:null},
            controller:'search_resultCtrl'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url:'/about',
            templateUrl:'partials/about.html',
            controller:'AboutCtrl'      
        });



});


