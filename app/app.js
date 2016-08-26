window.app = angular.module('myApp', []);

app.controller('mainController', function($scope, $http) {

    $scope.goToRegister = function () {
        window.location.hrf = '/profile'
        //window.location.href = '/oauth/linkedin';
    };


    //$scope.formData = {};
    //
    //$scope.login = function() {
    //    $http.post('/api/login', $scope.formData)
    //        .success(function(data) {
    //            $scope.formData = {};
    //            $scope.user = JSON.stringify(data, undefined, ' ');
    //            $scope.userResult = true;
    //            console.log(data);
    //        })
    //        .error(function(data) {
    //            console.log('Error: ' + data);
    //        });
    //};
});