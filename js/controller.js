angular.module('IMDB.controllers', ['ngTable','chart.js','angular-maps','IMDB.services'])

.controller('HomeCtrl', ['$scope','$state','$http','CountryIso','IO2_to_IO3','country_helper',function ($scope,$state,$http,CountryIso,IO2_to_IO3,country_helper) {
   $scope.types=["General Search","By ID","By Title"];
   $scope.selectedType=$scope.types[0];
   // console.log(IO2_to_IO3(CountryIso("China")));


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
    }  // End of submit_search()


    // Deal with genre_occurences csv file
    $scope.processData = function(allText) {
        // split content based on new line
        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];

        for ( var i = 0; i < allTextLines.length; i++) {
              // split content based on comma
              var data = allTextLines[i].split(',');
              if (data.length == headers.length) {
                 var tarr = [];
                 for ( var j = 0; j < headers.length; j++) {
                     tarr.push(data[j]);
                 }
                 lines.push(tarr);
              }
        }

        $scope.genre_occurence = lines;

        console.log($scope.genre_occurence);
    };

    $scope.readCSV = function(year) {
        // http get request to read CSV file content
        var path="../Cache_data/genre_csv/"+year+".csv";
        console.log(year);
        $http.get(path).success($scope.processData);    
    };



    var local_host="http://127.0.0.1:8000/";
    // worddata

    $scope.helper=function(array){
        var worldData11=[];
        array.forEach(function(country1){
             var json_data={};
             if(country1.country=="UK"){
                 json_data["countryCode"]="GBR";
             }
             else if(country1.country=="Australia"){
                 json_data["countryCode"]="AUS";
             }
            
             else if(country1.country=="Russia"){
                 json_data["countryCode"]="RUS";
             }

             else if(country1.country=="South Korea"){
                 json_data["countryCode"]="KOR";
             }

             else if (country1.country.length==2) {
                json_data["countryCode"]=IO2_to_IO3(country1.country);
             }
             else if(country1.country.length==3){
                json_data["countryCode"]=country1.country;
             }

             else{
               json_data["countryCode"]=IO2_to_IO3(CountryIso(country1.country));
             }
             json_data["value"]=country1.number;
             worldData11.push(json_data);
            })
            $scope.worldData1=[];
            for(var i=0;i<worldData11.length;i++){
              $scope.worldData1.push(worldData11[i]);
            }
            console.log($scope.worldData1);
    };

  

   $scope.get_country=function(){
      $scope.month_show=false;
      $scope.country_show=true;
      $scope.valueRange = [0,25000];
      $scope.colorRange = ["#FFEDA0","#F03B20"];
      $scope.dimension = 600;
      $scope.mapWidth = 1000;
      $scope.descriptiveText = 'Number of movies';
      $scope.countryFillColor = "#aaa";
      $scope.countryBorderColor = "#fff";
      
      var my_data=country_helper.getData();
      my_data.then(function(result){
        $scope.helper(result);
        
      })
     
      $scope.worldData1=[
{countryCode: "USA", value: 21377},
{countryCode: "GBR", value: 3602}
,
{countryCode: "FRA", value: 2665}
,
{countryCode: "ITA", value: 1805}
,
{countryCode: "CAN", value: 1460}
,
{countryCode: "JPN", value: 1397}
,
{countryCode: "DEU", value: 996}
,
{countryCode: "IND", value: 915}
,
{countryCode: "ESP", value: 647}
,
{countryCode: "AUS", value: 488}
,
{countryCode: "KOR", value: 474}
,
{countryCode: "HKG", value: 471}
,
{countryCode: "SWE", value: 471}
,
{countryCode: "FIN", value: 464}
,
{countryCode: "RUS", value: 449}
,
{countryCode: undefined, value: 345}
,
{countryCode: "POL", value: 291}
,
{countryCode: "NLD", value: 287}
,
{countryCode: "DNK", value: 285},
{countryCode: "CHN", value: 270}
,
{countryCode: "MEX", value: 238}
,
{countryCode: "BRA", value: 228}
,
{countryCode: undefined, value: 222}
,
{countryCode: "BEL", value: 213}
,
{countryCode: "ARG", value: 213}
,
{countryCode: "GRC", value: 146}
,
{countryCode: "TUR", value: 146}
,
{countryCode: "NOR", value: 142}
,
{countryCode: "IRL", value: 137}
,
{countryCode: "HUN", value: 120}
,
{countryCode: "AUT", value: 114}
,
{countryCode: "CHE", value: 112}
,
{countryCode: "ISR", value: 105}
,
{countryCode: undefined, value: 99}
,
{countryCode: "NZL", value: 90}
,
{countryCode: "THA", value: 89}
,
{countryCode: "ROU", value: 86}
,
{countryCode: "TWN", value: 79}
,
{countryCode: "CZE", value: 78}
,
{countryCode: "PRT", value: 75}
,
{countryCode: undefined, value: 73}
,
{countryCode: "ZAF", value: 61}
,
{countryCode: "PHL", value: 55}
,
{countryCode: "CHL", value: 54}
,
{countryCode: "ISL", value: 48}
,
{countryCode: "N/A", value: 46}
,
{countryCode: "EST", value: 39}
,
{countryCode: "SRB", value: 37}
,
{countryCode: undefined, value: 31}
,
{countryCode: "IDN", value: 26}
,
{countryCode: "COL", value: 25}
]
   }

    //画图，month list
    $scope.get_month_list=function(){
       $scope.month_show=true;
       $scope.country_show=false;

       $http.get(local_host+"month_list/").success(function (response) {
            console.log(response); 
            $scope.m_data=response;
            $scope.m_labels=['January','February','March','April','May','June','July','August','September','October','November','December'];
            $scope.m_series=['Gross_box_office'];
            $scope.monthly_data=[[],[],[],[]];
            //
            $scope.monthly_data[0][0]=($scope.m_data[8].gross_box_office);
            $scope.monthly_data[1][0]=($scope.m_data[8].ave_gross);
            $scope.monthly_data[2][0]=($scope.m_data[8].number);
            $scope.monthly_data[3][0]=($scope.m_data[8].rating);

            $scope.monthly_data[0][1]=($scope.m_data[6].gross_box_office);
            $scope.monthly_data[1][1]=($scope.m_data[6].ave_gross);
            $scope.monthly_data[2][1]=($scope.m_data[6].number);
            $scope.monthly_data[3][1]=($scope.m_data[6].rating);

            $scope.monthly_data[0][2]=($scope.m_data[5].gross_box_office);
            $scope.monthly_data[1][2]=($scope.m_data[5].ave_gross);
            $scope.monthly_data[2][2]=($scope.m_data[5].number);
            $scope.monthly_data[3][2]=($scope.m_data[5].rating);

            $scope.monthly_data[0][3]=($scope.m_data[9].gross_box_office);
            $scope.monthly_data[1][3]=($scope.m_data[9].ave_gross);
            $scope.monthly_data[2][3]=($scope.m_data[9].number);
            $scope.monthly_data[3][3]=($scope.m_data[9].rating);

            $scope.monthly_data[0][4]=($scope.m_data[2].gross_box_office);
            $scope.monthly_data[1][4]=($scope.m_data[2].ave_gross);
            $scope.monthly_data[2][4]=($scope.m_data[2].number);
            $scope.monthly_data[3][4]=($scope.m_data[2].rating);

            $scope.monthly_data[0][5]=($scope.m_data[1].gross_box_office);
            $scope.monthly_data[1][5]=($scope.m_data[1].ave_gross);
            $scope.monthly_data[2][5]=($scope.m_data[1].number);
            $scope.monthly_data[3][5]=($scope.m_data[1].rating);

            $scope.monthly_data[0][6]=($scope.m_data[3].gross_box_office);
            $scope.monthly_data[1][6]=($scope.m_data[3].ave_gross);
            $scope.monthly_data[2][6]=($scope.m_data[3].number);
            $scope.monthly_data[3][6]=($scope.m_data[3].rating);

            $scope.monthly_data[0][7]=($scope.m_data[7].gross_box_office);
            $scope.monthly_data[1][7]=($scope.m_data[7].ave_gross);
            $scope.monthly_data[2][7]=($scope.m_data[7].number);
            $scope.monthly_data[3][7]=($scope.m_data[7].rating);



            $scope.monthly_data[0][8]=($scope.m_data[11].gross_box_office);
            $scope.monthly_data[1][8]=($scope.m_data[11].ave_gross);
            $scope.monthly_data[2][8]=($scope.m_data[11].number);
            $scope.monthly_data[3][8]=($scope.m_data[11].rating);

            $scope.monthly_data[0][9]=($scope.m_data[10].gross_box_office);
            $scope.monthly_data[1][9]=($scope.m_data[10].ave_gross);
            $scope.monthly_data[2][9]=($scope.m_data[10].number);
            $scope.monthly_data[3][9]=($scope.m_data[10].rating);

            $scope.monthly_data[0][10]=($scope.m_data[4].gross_box_office);
            $scope.monthly_data[1][10]=($scope.m_data[4].ave_gross);
            $scope.monthly_data[2][10]=($scope.m_data[4].number);
            $scope.monthly_data[3][10]=($scope.m_data[4].rating);

            $scope.monthly_data[0][11]=($scope.m_data[0].gross_box_office);
            $scope.monthly_data[1][11]=($scope.m_data[0].ave_gross);
            $scope.monthly_data[2][11]=($scope.m_data[0].number);
            $scope.monthly_data[3][11]=($scope.m_data[0].rating);

            $scope.m1=$scope.monthly_data[0];
            $scope.m2=$scope.monthly_data[1];
            $scope.m3=$scope.monthly_data[2];
            $scope.m4=$scope.monthly_data[3];

            // console.log($scope.m4);
       });
    };

    



}])




.controller('AboutCtrl', ['$scope',function ($scope) {
    

   

}])



.controller('search_resultCtrl', ['$scope','$http','$stateParams','$state',function ($scope,$http,$stateParams,$state) {
   var movie_list=$stateParams.movie_list;
   // console.log(movie_list);
   $scope.movieList=movie_list;
   console.log($scope.movieList);
   for(var i=0;i<$scope.movieList.length;i++){
       if($scope.movieList[i].Poster==="N/A"){
          $scope.movieList[i].Poster="../photo_not_find.jpg";
       }
   }
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



.controller('MovieCtrl', ['$scope','$http','$stateParams','$state',function ($scope,$http,$stateParams,$state) {
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
    $scope.imid=movie_info.imdbID;

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
    $scope.movie_list_d=null, //movie list of this director
    $scope.movie_labels1=[];
    $scope.movie_data1=[]; //存储rating和box_office,注意boxoffice为空的情况
    $scope.movie_series1=['Rating'];
    $scope.movie_labels2=[];
    $scope.movie_data2=[]; //存储rating和box_office,注意boxoffice为空的情况
    $scope.movie_series2=['Box_office'];
    $scope.d_flag=true;
    $scope.p_flag=true;
    $scope.a1_flag=true;
    $scope.a2_flag=true;
    $scope.a3_flag=true;


    $scope.getdata=function(){
       var backend_url="http://127.0.0.1:8000/";

       //get director_rate
       $http.get(backend_url+"director_r/"+$scope.director).success(function (response) {
            $scope.director_rate=response;
            console.log($scope.director_rate);
       }).error(function(data,status){  // handle the 404 case,
          $scope.d_flag=false;
          $scope.director_rate=null;
          console.log("error returns"+status);
       });

       // get director_rgross
       $http.get(backend_url+"director_g/"+$scope.director).success(function (response) {
            $scope.director_gross=response;
            console.log($scope.director_gross);
       }).error(function(data,status){  // handle the 404 case,
          $scope.d_flag=false;
          $scope.director_gross=null;
          console.log("error returns"+status);
       });

       //get director's other movies, 用来画图
       $http.get(backend_url+"movie_by_director/"+$scope.director).success(function (response) {
            $scope.movie_list_d=response;
            console.log($scope.movie_list_d);
            // console.log($scope.movie_list_d.length);
            for(var i=0;i<$scope.movie_list_d.length;i++){
              $scope.movie_labels1[i]=$scope.movie_list_d[i].year;
              $scope.movie_data1[i]=$scope.movie_list_d[i].rating;
            }
            // console.log($scope.movie_labels1);
            // console.log($scope.movie_data1);
            var index=0;
            for(var j=0;j<$scope.movie_list_d.length;j++){
              if($scope.movie_list_d[j].boxoffice!=0){
                $scope.movie_labels2[index]=$scope.movie_list_d[j].year;
                $scope.movie_data2[index]=($scope.movie_list_d[j].boxoffice)/1000000;
                index=index+1;
              }
            }
           
       }).error(function(data,status){  // handle the 404 case,
          $scope.movie_list_d=[];
          console.log("error returns"+status);
       });

       //get director top 5movies
       $scope.movie_to_show=[];
       $http.get(backend_url+"movie_by_director_top5/"+$scope.director).success(function (response) {
            $scope.top_5=response;
            console.log($scope.top_5);
            $scope.movieid_to_show=[];
            console.log($scope.imid);
            for(var t=0;t<$scope.top_5.length;t++){  
              if($scope.top_5[t].id!==$scope.imid){ //如果当前的电影也在list中要删掉
                $scope.movieid_to_show.push($scope.top_5[t].id);
              }
            }
            console.log($scope.movieid_to_show);
            for(var r=0;r<$scope.movieid_to_show.length;r++){
              var t_id=$scope.movieid_to_show[r];
              $http.get("http://www.omdbapi.com/?apikey=be508df7&r=json"+"&i"+"="+t_id).success(function (response) {
                 console.log(response);
                 $scope.movie_to_show.push(response)
              });
            }//结束for循环
            
       }).error(function(data,status){  // handle the 404 case,
          $scope.top_5=[];
          console.log("error returns"+status);
       });
       console.log($scope.movie_to_show);





       // get production company details
       $http.get(backend_url+"production/"+movie_info.Production).success(function (response) {
            $scope.production_detail=response;
            $scope.f_rate=$scope.production_detail.ave_rating.toFixed(2);
            console.log($scope.production_detail);
       }).error(function(data,status){  // handle the 404 case,
          $scope.production_detail=null;
          $scope.p_flag=false;
          console.log("error returns"+status);
       }).finally(function(){
          // console.log($scope.production_detail);
       });

       $http.get(backend_url+"movie_by_production/"+movie_info.Production).success(function (response) {
            $scope.production_list=response;
            console.log($scope.production_list);
            $scope.year_list=[];
            for(var i=0;i<$scope.production_list.length;i++){
              if($scope.production_list[i].year!=$scope.year_list[$scope.year_list.length-1]){
                $scope.year_list.push($scope.production_list[i].year);
              }
            }
            console.log($scope.year_list);
            $scope.year_production_gross=[];
            $scope.year_production_number=[];
            $scope.year_production_rating=[];
            for(var j=0;j<$scope.year_list.length;j++){
              var current_year=$scope.year_list[j];
              var gross_sum=0;
              var number_sum=0;
              var rating_sum=0;
              for(var t=0;t<$scope.production_list.length;t++){
                if($scope.production_list[t].year==current_year){
                  gross_sum=gross_sum+$scope.production_list[t].boxoffice;
                  number_sum=number_sum+1;
                  rating_sum=rating_sum+$scope.production_list[t].rating;
                }
              }
              $scope.year_production_gross[j]=(gross_sum/1000000);
              $scope.year_production_number[j]=number_sum;
              $scope.year_production_rating[j]=rating_sum;
            }
            // console.log($scope.year_production_gross);
            $scope.year_production_averating=[];
            $scope.year_production_avegross=[]
            $scope.year_averating=[];//提取大环境的数据 用来比较
            $scope.year_avegross=[];
            for(var t=0;t<$scope.year_production_rating.length;t++){
              $scope.year_production_averating[t]=($scope.year_production_rating[t]/$scope.year_production_number[t]).toFixed(2);
              $http.get(backend_url+"year/"+$scope.year_list[t]).success(function (response) {
                 // console.log(response);
                 $scope.year_averating.push(response.ave_rating.toFixed(2));
                 $scope.year_avegross.push((response.ave_gross/1000000).toFixed(2));
              });
            }
            for(var y=0;y<$scope.year_production_gross.length;y++){
              $scope.year_production_avegross[y]=($scope.year_production_gross[y]/$scope.year_production_number[y]).toFixed(2);
            }
            // console.log($scope.year_production_avegross);
            // console.log($scope.year_production_number);
            // console.log($scope.year_production_averating);
            $scope.comboaverate=[];
            $scope.comboaverate[0]=$scope.year_production_averating;
            $scope.comboaverate[1]=$scope.year_averating;
            $scope.series1=[$scope.production,'All movies'];

            $scope.comboavegross=[];
            $scope.comboavegross[0]=$scope.year_production_avegross;
            $scope.comboavegross[1]=$scope.year_avegross;

       }).error(function(data,status){  // handle the 404 case,
          $scope.production_list=[];
          $scope.p_flag=false;
          console.log("error returns"+status);
       });

       //找出这个production其他好的电影
       $scope.movie_to_show_p=[];
       $http.get(backend_url+"movie_by_production_top5/"+$scope.production).success(function (response) {
            $scope.top_5_p=response;
            console.log($scope.top_5_p);
            $scope.movieid_to_show_p=[];
            console.log($scope.imid);
            for(var t=0;t<$scope.top_5_p.length;t++){  
              if($scope.top_5_p[t].id!==$scope.imid){ //如果当前的电影也在list中要删掉
                console.log($scope.top_5_p[t].id);
                $scope.movieid_to_show_p.push($scope.top_5_p[t].id);
              }
            }
            console.log($scope.movieid_to_show_p);
            for(var r=0;r<$scope.movieid_to_show_p.length;r++){
              var t_id=$scope.movieid_to_show_p[r];
              $http.get("http://www.omdbapi.com/?apikey=be508df7&r=json"+"&i"+"="+t_id).success(function (response) {
                 // console.log(response);
                 $scope.movie_to_show_p.push(response)
              });
            }//结束for循环
            
       }).error(function(data,status){  // handle the 404 case,
          $scope.top_5_p=[];
          console.log("error returns"+status);
       });
       







       var actor_array = $scope.actors.split(',');
       // get actor1 details by rating
       $http.get(backend_url+"actor_by_rating/"+actor_array[0]).success(function (response) {
            $scope.actor_rdetail=response;
            console.log($scope.actor_rdetail);
       }).error(function(data,status){  // handle the 404 case,
          $scope.a1_flag=false;
          $scope.actor_rdetail=null;
          console.log("error returns"+status);
       });

       $http.get(backend_url+"actor_by_gross/"+actor_array[0]).success(function (response) {
            $scope.actor_gdetail=response;
            console.log($scope.actor_gdetail);
       }).error(function(data,status){  // handle the 404 case,
          $scope.a1_flag=false;
          $scope.actor_gdetail=null;
          console.log("error returns"+status);
       });

       //用来画图,注意要先初始化数组
       $scope.movie_labelsa1=[];
       $scope.movie_dataa1=[];
       $scope.movie_labelsa2=[];
       $scope.movie_dataa2=[];
       $http.get(backend_url+"movie_by_actor1/"+actor_array[0]).success(function (response) {
            $scope.movie_list_a1=response;
            console.log($scope.movie_list_a1);
            // console.log($scope.movie_list_d.length);
            for(var i=0;i<$scope.movie_list_a1.length;i++){
              console.log($scope.movie_list_a1[i].year);
              $scope.movie_labelsa1[i]=$scope.movie_list_a1[i].year;
              $scope.movie_dataa1[i]=$scope.movie_list_a1[i].rating;
            }
            console.log($scope.movie_labelsa1);
            console.log($scope.movie_dataa1);
            var index=0;
            for(var j=0;j<$scope.movie_list_a1.length;j++){
              if($scope.movie_list_a1[j].boxoffice!=0){
                $scope.movie_labelsa2[index]=$scope.movie_list_a1[j].year;
                $scope.movie_dataa2[index]=($scope.movie_list_a1[j].boxoffice)/1000000;
                index=index+1;
              }
            }
           
       }).error(function(data,status){  // handle the 404 case,
          $scope.movie_list_a1=[];
          console.log("error returns"+status);
       });

       //找出actor1的其它好电影
       $scope.movie_to_show_a=[];
       $http.get(backend_url+"movie_by_actor_top10/"+actor_array[0]).success(function (response) {
            $scope.top_5_a=response;
            console.log($scope.top_5_a);
            $scope.movieid_to_show_a=[];
            console.log($scope.imid);
            for(var t=0;t<$scope.top_5_a.length;t++){  
              if($scope.top_5_a[t].id!==$scope.imid){ //如果当前的电影也在list中要删掉
                console.log($scope.top_5_a[t].id);
                $scope.movieid_to_show_a.push($scope.top_5_a[t].id);
              }
            }
            console.log($scope.movieid_to_show_a);
            for(var r=0;r<$scope.movieid_to_show_a.length;r++){
              var t_id=$scope.movieid_to_show_a[r];
              $http.get("http://www.omdbapi.com/?apikey=be508df7&r=json"+"&i"+"="+t_id).success(function (response) {
                 // console.log(response);
                 $scope.movie_to_show_a.push(response)
              });
            }//结束for循环
            
       }).error(function(data,status){  // handle the 404 case,
          $scope.top_5_a=[];
          console.log("error returns"+status);
       });




       //提取actor2的信息
       $http.get(backend_url+"actor2/"+actor_array[1]).success(function (response) {
            $scope.actor2_rdetail=response;
            console.log($scope.actor2_rdetail);
       }).error(function(data,status){  // handle the 404 case,
          $scope.actor2_rdetail=null;
          $scope.a2_flag=false;
          console.log("error returns"+status);
       });
       //画actor2的图
       $scope.movie_labelac21=[];
       $scope.movie_dataac21=[];
       $scope.movie_labelac22=[];
       $scope.movie_dataac22=[];
       $http.get(backend_url+"movie_by_actor2/"+actor_array[1]).success(function (response) {
            $scope.movie_list_a2=response;
            console.log($scope.movie_list_a2);
            // console.log($scope.movie_list_d.length);
            for(var i=0;i<$scope.movie_list_a2.length;i++){
              console.log($scope.movie_list_a2[i].year);
              $scope.movie_labelac21[i]=$scope.movie_list_a2[i].year;
              $scope.movie_dataac21[i]=$scope.movie_list_a2[i].rating;
            }
            console.log($scope.movie_labelac21);
            console.log($scope.movie_dataac21);
            var index=0;
            for(var j=0;j<$scope.movie_list_a2.length;j++){
              if($scope.movie_list_a2[j].boxoffice!=0){
                $scope.movie_labelac22[index]=$scope.movie_list_a2[j].year;
                $scope.movie_dataac22[index]=($scope.movie_list_a2[j].boxoffice)/1000000;
                index=index+1;
              }
            }
           
       }).error(function(data,status){  // handle the 404 case,
          $scope.movie_list_a2=[];
          console.log("error returns"+status);
       });



       //提取actor3的信息
       $http.get(backend_url+"actor3/"+actor_array[2]).success(function (response) {
            $scope.actor3_rdetail=response;
            console.log($scope.actor3_rdetail);
       }).error(function(data,status){  // handle the 404 case,
          $scope.actor3_rdetail=null;
          $scope.a3_flag=false;
          console.log("error returns"+status);
       });

       //画actor3的图
       $http.get(backend_url+"actor3/"+actor_array[2]).success(function (response) {
            $scope.actor3_rdetail=response;
            console.log($scope.actor3_rdetail);
       }).error(function(data,status){  // handle the 404 case,
          $scope.actor3_rdetail=null;
          $scope.a3_flag=false;
          console.log("error returns"+status);
       });
       
       $scope.movie_labelac31=[];
       $scope.movie_dataac31=[];
       $scope.movie_labelac32=[];
       $scope.movie_dataac32=[];
       $http.get(backend_url+"movie_by_actor3/"+actor_array[2]).success(function (response) {
            $scope.movie_list_a3=response;
            console.log($scope.movie_list_a3);
            // console.log($scope.movie_list_d.length);
            for(var i=0;i<$scope.movie_list_a3.length;i++){
              console.log($scope.movie_list_a3[i].year);
              $scope.movie_labelac31[i]=$scope.movie_list_a3[i].year;
              $scope.movie_dataac31[i]=$scope.movie_list_a3[i].rating;
            }
            console.log($scope.movie_labelac31);
            console.log($scope.movie_dataac31);
            var index=0;
            for(var j=0;j<$scope.movie_list_a3.length;j++){
              if($scope.movie_list_a3[j].boxoffice!=0){
                $scope.movie_labelac32[index]=$scope.movie_list_a3[j].year;
                $scope.movie_dataac32[index]=($scope.movie_list_a3[j].boxoffice)/1000000;
                index=index+1;
              }
            }
           
       }).error(function(data,status){  // handle the 404 case,
          $scope.movie_list_a3=[];
          console.log("error returns"+status);
       });







    }  // End of get data function
    $scope.submit=function(imdb_id){
          // console.log(imdb_id);
          $http.get("http://www.omdbapi.com/?apikey=be508df7&r=json"+"&"+"i"+"="+imdb_id).success(function (response) {
            // console.log(response);
            var movie_obj=response;
            // console.log(movie_obj.imdbID);
            // console.log(movie_obj.Title);
            $state.go('movie',{movie_object:movie_obj});
          });
   }

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


