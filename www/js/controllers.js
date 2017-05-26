angular.module('starter.controllers',[])

.controller('AppCtrl',function($scope,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory){
    var url="http://localhost/ionic/";

    $scope.loginData={};

    $scope.doLogin=function(){
      var admin_user=$scope.loginData.username;
      var admin_password=$scope.loginData.password;

      if(admin_user && admin_password){
          str=url+"login.php?username="+admin_user+"&password="+admin_password;
          $http.get(str)
            .success(function(response){

                $scope.admin=response.records;
                sessionStorage.setItem('loggedin_status',true);
                sessionStorage.setItem('loggedin_id',$scope.admin.admin_id);
                sessionStorage.setItem('loggedin_status',$scope.admin.admin_user);

                $ionicHistory.nextViewOptions({
                  disableAnimate:true,
                  disableBack:true
                })

                $ionicPopup.alert({
                  title:'Login',
                  template:'Welcome'
                })

                $state.go('tab.main',{},{location:"replace",reload:true});
            })
            .error(function(){

              $ionicPopup.alert({
                title:'Login',
                template:'Cannot login'
              })
            });

      }else{
        $ionicPopup.alert({
          title:'Login',
          template:'Cannot login please fill'
        })

      }

    }









    $scope.doLogout=function(){

      sessionStorage.removeItem('loggedin_status');
      sessionStorage.removeItem('loggedin_id');
      sessionStorage.removeItem('loggedin_status');

      $ionicHistory.nextViewOptions({
        disableAnimate:true,
        disableBack:true
      })

      $ionicPopup.alert({
        title:'Logout',
        template:'Logout'
      })

      $state.go('tab.login',{},{location:"replace",reload:true});


    }












})
