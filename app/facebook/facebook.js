'use strict';

angular.module('ngSocial.facebook', ['ngRoute','ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('FB_id');
  $facebookProvider.setPermissions('email, public_profile, user_posts, publish_actions,user_photos');
})


.run( function( $rootScope ) {
  // Cut and paste the "Load the SDK" code from the facebook javascript sdk page.

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

})

.controller('FacebookCtrl', ['$scope', '$facebook', function($scope, $facebook) {
  $scope.isLoggedIn = false;

  $scope.login = function(){
    $facebook.login().then(function(response){
        refresh();
    });
  }

  $scope.logout = function(){
    $facebook.logout().then(function(){
        $scope.isLoggedIn = false;
        refresh();
    })
  }

  function refresh(){
    $facebook.api("/me").then(function(response){
      $scope.WelcomeMsg = "Welcome " + response.name;
      $scope.isLoggedIn = true;
      $scope.userInfo = response;
    },
    function(err){
      $scope.WelcomeMsg = "Please Log in";
    });
  }
  refresh();
}]);
