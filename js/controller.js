angular.module('IMDB.controllers', [])

.controller('HomeCtrl', ['$scope','$state','$http',function ($scope,$state,$http) {
   $scope.types=["General Search","By ID","By Title"];
   $scope.selectedType=$scope.types[0];

   $scope.dropboxitemselected = function (item) {
        $scope.selectedType = item;
    }

   $scope.submit_search=function(){

        var basic_url="http://www.omdbapi.com/?apikey=be508df7&r=json";
        var movie_obj=null;

        // console.log($scope.selectedType);
        // console.log($scope.movie_input);
        var type=null
        if ($scope.selectedType=="By Title") {
          type='t';
          $http.get(basic_url+"&"+type+"="+$scope.movie_input).success(function (response) {
            movie_obj=response;
            console.log(movie_obj.imdbID);
            // console.log(movie_obj.Title);
            $state.go('movie',{movie_object:movie_obj});
        });
        }
        else if($scope.selectedType=="By ID"){
          type='i';
          $http.get(basic_url+"&"+type+"="+$scope.movie_input).success(function (response) {
            console.log(response);
            movie_obj=response;
            console.log(movie_obj.imdbID);
            // console.log(movie_obj.Title);
            $state.go('movie',{movie_object:movie_obj});
          });
        }
        else if($scope.selectedType=="General Search"){
          type='s';
          $http.get(basic_url+"&"+type+"="+$scope.movie_input).success(function (response) {
            console.log(response);
            movie_obj=response.Search;
            console.log(movie_obj[0].imdbID);
            // console.log(movie_obj.Title);
            $state.go('search_result',{movie_list:movie_obj});
          });

        }       
    }

}])

.controller('AboutCtrl', ['$scope','$http',function ($scope) {
   $scope.test=function(){
    console.log("hello");
   }
}])

.controller('search_resultCtrl', ['$scope','$http','$stateParams','$state',function ($scope,$http,$stateParams,$state) {
   var movie_list=$stateParams.movie_list;
   // console.log(movie_list);
   $scope.movieList=movie_list;
   // console.log($scope.movieList);
   var basic_url="http://www.omdbapi.com/?apikey=be508df7&r=json";
   var movie_obj=null;
   $scope.submit=function(imdb_id){
          console.log(imdb_id);
          $http.get(basic_url+"&"+"i"+"="+imdb_id).success(function (response) {
            console.log(response);
            movie_obj=response;
            console.log(movie_obj.imdbID);
            // console.log(movie_obj.Title);
            $state.go('movie',{movie_object:movie_obj});
          });
   }
}])



.controller('MovieCtrl', ['$scope','$http','$stateParams',function ($scope,$http,$stateParams) {
    var movie_info=$stateParams.movie_object;
    console.log(movie_info);
    // console.log("show all");
    $scope.poster_url=movie_info.Poster;
    $scope.title=movie_info.Title;
    $scope.director=movie_info.Director;
    $scope.boxoffice=movie_info.BoxOffice;
    $scope.country=movie_info.Country;
    //
    $scope.genre=movie_info.Genre;
    $scope.language=movie_info.Language;
    $scope.plot=movie_info.Plot;
    $scope.production=movie_info.Production;
    $scope.releaseDate=movie_info.Released;
    $scope.runtime=movie_info.Runtime;
    $scope.website=movie_info.Website;
    $scope.writer=movie_info.Writer;
    $scope.imdbRating=movie_info.imdbRating;
    $scope.imdbVotes=movie_info.imdbVotes;
    $scope.website=movie_info.Website;
    



  //  $scope.get_movie_info = function () {
  //     // console.log($stateParams.movieID);
  //     // console.log($stateParams.movieTitle);
  //     // console.log($stateParams.searchType);
  //     // // console.log("Request sent successfully");
  //     // var basic_url="http://www.omdbapi.com/?apikey=be508df7&r=json";
  //     // var input=null;
  //     // if($stateParams.movieTitle==null){
  //     //   input=$stateParams.movieID;
  //     // }
  //     // else if($stateParams.movieID==null){
  //     //   input=$stateParams.movieTitle;
  //     // }

  //     // $http.get(basic_url+"&"+$stateParams.searchType+"="+input).success(function (response) {
  //     // // console.log(response);
  //     // // var responseData=JSON.parse(response);
  //     // // console.log(responseData);
  //     // console.log(response);
  //     // });

      
  // };

 

}])



.controller('TestCtrl', function ($scope) {
   $scope.test=function(){
    console.log("hello");
   }
});


