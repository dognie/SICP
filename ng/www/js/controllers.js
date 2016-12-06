
var URL_Base = "http://120.25.218.244:8001";
angular.module('starter.controllers', [])

.controller('InitLogCtrl', function($scope, $state) {
       $state.go('main');
})

.controller('UserLogCtrl', function($scope, $location,$http,$state) {
  
  $scope.onClickLoginBtn = function() {

    $scope.username = "admin";
    $scope.password = "admiN123#"
    var lpdata = " { \"username\" ";
    lpdata += " : ";
    lpdata += "\"";
    lpdata += $scope.username;
    lpdata += "\","; 
    lpdata +=  "\"password\" ";
    lpdata += " : ";
    lpdata += "\"";
    lpdata += $scope.password;
    lpdata += "\"}";
    //alert(lpdata);

    $http.post(URL_Base + "/api/Accounts/login",lpdata).success( 
      function (data,header,config,status) {

       // angularjs 高级跳转方法， 对应路由中的状态名称，推荐使用，也可以用$location.path和$location.replace() 替代
       
       $state.go('patrol.patrolConfig',{access_token: data.id});
       //$state.go('patrol.patrolList',{access_token: data.id});
       
      
      }).error(function(data,header,config,status){
         var odata = JSON.stringify(data);
         alert(data.error.status)
         alert(data.error.code)
         $scope.lpdata = JSON.stringify(data);
      });
    };

   $scope.onClickLogoutBtn = function() {
     var lpdata = " { \"access_token  \" ";
     lpdata += " : ";
     lpdata += "\"";
     lpdata += $scope.accessToken;
     lpdata += "\"}";
     alert(lpdata);

     $http.post(URL_Base + "/api/Accounts/logout",lpdata).success( 
       function (data,header,config,status) {
          $scope.lpdata = JSON.stringify(data);
          g_accessToken = null;

      }).error(function(data,header,config,status){
           var odata = JSON.stringify(data);
           alert(data.error.status)
           alert(data.error.code)
           $scope.lpdata = JSON.stringify(data);
      });
   };
})

.controller('PatrolCtrl', function($scope, $location,$http,$stateParams,$state) {
  
  $scope.load = function() {
    //alert($stateParams.access_token);
    $http.get(URL_Base + "/api/OrganizationPatrols/?"+"access_token="+$stateParams.access_token ).success( 
     function (data,header,config,status) {
        $scope.items = angular.fromJson(data);
        //alert(JSON.stringify(data));   

    }).error(function(data,header,config,status){
         var odata = JSON.stringify(data);
         // alert(odata.error.status)
         // alert(odata.error.code)
        
    });

  };
  
  $scope.onClickFindBtn = function() {

    //alert($stateParams.access_token);

    //alert(URL_Base + "/api/OrganizationRepairs/?"+"access_token="+$location.search()['accessToken'] );
   
   // $http.get(URL_Base + "/api/OrganizationRepairs/?"+"access_token="+$location.search()['accessToken'] ).success( 
   $http.get(URL_Base + "/api/OrganizationPatrols/?"+"access_token="+$stateParams.access_token ).success( 
     function (data,header,config,status) {
     
        $scope.items = angular.fromJson(data);
        //alert(JSON.stringify(data));
        $state.go('patrol.patrolList',{access_token: $stateParams.access_token});


    }).error(function(data,header,config,status){
         var odata = JSON.stringify(data);
         alert(data.error.status)
         alert(data.error.code)
         $scope.lpdata = JSON.stringify(data);
    });
  };
})

.controller('PatrolCtrlConfig', function($scope, $location,$http,$stateParams,$state) {
  

  $scope.load = function() {

    //alert("load");
    //alert($stateParams.access_token);
    $http.get(URL_Base + "/api/OrganizationPatrolConfigs/?"+"access_token="+$stateParams.access_token ).success( 
     function (data,header,config,status) {
        
        $scope.items = angular.fromJson(data);
        var t_items = $scope.items;


        for(var img_item in t_items){
          var imgjsons = angular.fromJson(t_items[img_item].img);
          t_items[img_item].img = imgjsons;
          
  
          for(var index in imgjsons){
            var myArray=new Array();
            //imgjsons[index].fileName);
            myArray.push(URL_Base + "/api/OrganizationPatrolConfigs/" +  t_items[img_item].id + "/img/" +  imgjsons[index].fileName +"/?access_token=" +$stateParams.access_token);
            //t_items[img_item].imgpath.push (URL_Base + "/api/OrganizationPatrolConfigs/" +  item.id + "/img/" +  imgjsons[index].fileName);
           
          }
          t_items[img_item].imgpath = myArray;
          
        }
        
        $scope.accessToken = $stateParams.access_token;
        //alert(JSON.stringify(data));
    }).error(function(data,header,config,status){
         var odata = JSON.stringify(data);
         // alert(odata.error.status)
         // alert(odata.error.code)
        
    });

  };
  
  $scope.onClickFindBtn = function() {

   //alert("onClickFindBtn");

   $http.get(URL_Base + "/api/OrganizationPatrolConfigs/?"+"access_token="+$stateParams.access_token ).success( 
     function (data,header,config,status) {
      $scope.items = angular.fromJson(data);
        var t_items = $scope.items;

        for(var img_item in t_items){
          var imgjsons = angular.fromJson(t_items[img_item].img);
          t_items[img_item].img = imgjsons;
          
          for(var index in imgjsons){
            var myArray=new Array();
            myArray.push(URL_Base + "/api/OrganizationPatrolConfigs/" +  t_items[img_item].id + "/img/" +  imgjsons[index].fileName +"/?access_token=" +$stateParams.access_token);
        
           
          }
          t_items[img_item].imgpath = myArray;
          
        }
        
        $scope.accessToken = $stateParams.access_token;
        $state.go('patrol.patrolConfig',{access_token: $stateParams.access_token});
        //alert(JSON.stringify(data));  

    }).error(function(data,header,config,status){
         var odata = JSON.stringify(data);
         alert(data.error.status)
         alert(data.error.code)
         $scope.lpdata = JSON.stringify(data);
    });
  };
});
