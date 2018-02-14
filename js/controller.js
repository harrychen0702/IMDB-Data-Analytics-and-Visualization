angular.module('IMDB.controllers', ['ngTable','chart.js'])

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

   $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
   $scope.series = ['Series A', 'Series B'];

   $scope.data = [
     [65, 59, 80, 81, 56, 55, 40],
     [28, 48, 40, 19, 86, 27, 1000]
   ];

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
    $scope.actors=movie_info.Actors;
    $scope.awards=movie_info.Awards;
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

    $scope.movieID=null;
    $scope.show=false;  //预告片
    $scope.url=" ";


    $scope.show_d=false; //director
    $scope.show_a=false; //actor
    $scope.show_p=false; //production

    $scope.getTrailer=function(){
      var youtube_url="https://www.googleapis.com/youtube/v3/search?key=AIzaSyAXiqxAIiKt00YPN5l7raddnlMIlaITXsE";
      var name=" "+$scope.title;
      $http.get(youtube_url+"&"+'type'+"="+"video"+"&"+"part"+"="+"snippet"+"&"+"q"+'='+name+"trailer").success(function (response) {
            console.log(response.items[0].id.videoId);
            $scope.movieID=response.items[0].id.videoId;
            $scope.show=true;
            $scope.show_d=false; //director
            $scope.show_a=false; //actor
            $scope.show_p=false; //production
            $scope.url="https://www.youtube.com/embed/"+$scope.movieID;
            console.log($scope.url);
      });
    }

    $scope.backend_url="http://127.0.0.1:8000/";
    $scope.director_rate=null;
    $scope.director_gross=null;
    $scope.production_detail=null;
    $scope.actor_rdetail=null;
    $scope.actor_gdetail=null;

    $scope.getdata=function(){
       var backend_url="http://127.0.0.1:8000/";

       //get director_rate
       $http.get(backend_url+"director_r/"+$scope.director).success(function (response) {
            $scope.director_rate=response;
            console.log($scope.director_rate);
       }).error(function(data,status){  // handle the 404 case,
          $scope.director_rate=null;
          console.log("error returns"+status);
       });

       // get director_rgross
       $http.get(backend_url+"director_g/"+$scope.director).success(function (response) {
            $scope.director_gross=response;
            console.log($scope.director_gross);
       }).error(function(data,status){  // handle the 404 case,
          $scope.director_gross=null;
          console.log("error returns"+status);
       });

       // get production company details
       $http.get(backend_url+"production/"+movie_info.Production).success(function (response) {
            $scope.production_detail=response;
            console.log($scope.production_detail);
       }).error(function(data,status){  // handle the 404 case,
          $scope.production_detail=null;
          console.log("error returns"+status);
       }).finally(function(){
          // console.log($scope.production_detail);
       });

       // get actor details by rating
       var actor_array = $scope.actors.split(',');
       $http.get(backend_url+"actor_by_rating/"+actor_array[0]).success(function (response) {
            $scope.actor_rdetail=response;
            console.log($scope.actor_rdetail);
       }).error(function(data,status){  // handle the 404 case,
          $scope.actor_rdetail=null;
          console.log("error returns"+status);
       });

       $http.get(backend_url+"actor_by_gross/"+actor_array[0]).success(function (response) {
            $scope.actor_gdetail=response;
            console.log($scope.actor_gdetail);
       }).error(function(data,status){  // handle the 404 case,
          $scope.actor_gdetail=null;
          console.log("error returns"+status);
       });



    }  // End of get data function

    $scope.show_director=function(){
      $scope.show_d=true;
      $scope.show=false;
      $scope.show_a=false; //actor
      $scope.show_p=false;
    }

    $scope.show_production=function(){
      $scope.show_d=false;
      $scope.show=false;
      $scope.show_a=false; //actor
      $scope.show_p=true;
    }

    $scope.show_actor=function(){
      $scope.show_d=false;
      $scope.show=false;
      $scope.show_a=true; //actor
      $scope.show_p=false;
    }



  

 

}])

.controller('CountryCtrl', ['$scope','$http','NgTableParams',function ($scope,$http,NgTableParams) {
   var country_list_url="http://127.0.0.1:8000/country_list";
   $scope.get_country_list=function(){
       $http.get(country_list_url).success(function (response) {
            console.log(response); 
            $scope.data=response;  
            $scope.tableParams=new NgTableParams({page: 1,            // show first page
            count: 25},{counts:[25,50],dataset: $scope.data}); 
      });
   };

}])

.controller('ActorCtrl', ['$scope','$http','NgTableParams',function ($scope,$http,NgTableParams) {
   var actor_list_url="http://127.0.0.1:8000/actor_list";
   $scope.get_actor_list=function(){
       $http.get(actor_list_url).success(function (response) {
            console.log(response); 
            $scope.data=response;  
            $scope.tableParams=new NgTableParams({page: 1,            // show first page
            count: 25},{counts:[25,50],dataset: $scope.data}); 
      });
   };

}])

.controller('LanguageCtrl', ['$scope','$http','NgTableParams',function ($scope,$http,NgTableParams) {
   var language_list_url="http://127.0.0.1:8000/language_list";
   $scope.get_language_list=function(){
       $http.get(language_list_url).success(function (response) {
            console.log(response); 
            $scope.data=response;  
            $scope.tableParams= new NgTableParams({page: 1,            // show first page
            count: 25},{counts:[25,50],dataset: $scope.data}); 
      });
   };

}])


.controller('DirectorCtrl', ['$scope','$http','NgTableParams',function ($scope,$http,NgTableParams) {
   var director_list_url="http://127.0.0.1:8000/director_list";
   $scope.get_director_list=function(){
       $http.get(director_list_url).success(function (response) {
            console.log(response); 
            $scope.data=response;  
            $scope.tableParams= new NgTableParams({page: 1,            // show first page
            count: 25},{counts:[25,50],dataset: $scope.data}); 
      });
   };

}]) 


// For testing purpose only
.controller('TestCtrl', ['$scope','$http',function ($scope,$http) {
   var local_url="http://127.0.0.1:8000/language_list";
   $scope.list=null;
   $scope.test=function(){
       $http.get(local_url).success(function (response) {
            console.log(response);   
            $scope.list=response;     
      });
   }
}]);


