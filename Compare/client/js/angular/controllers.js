(function () {

    'use strict';

    angular.module('Compare.controllers', [])

        .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {}])

        .controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {}])

        .controller('SignUpCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
            $scope.signup = function () {
                $http.post('/signup', $scope.newUser).then(function (response) {
                    console.log(response.data);
                    if (response.data) {
                        alert('註冊成功！');
                        $state.go('profile');
                    } else {
                        alert('註冊失敗！帳號已重複');
                    }
                });
            };
    }])

        .controller('CompareCtrl', ['$scope', '$http', function ($scope, $http) {
            $scope.desc = 0;
            $scope.de = 0;
            $scope.coolpcPrice = 'coolpc.Price';
            $scope.pckingPrice = 'pcking.Price';
            $scope.test = [];
            $scope.test.title = "CompareTest";
            $scope.getCpuLists = function () {
                $http.get('/cpu').success(function (data) {
                    $scope.lists = data;
                });
            };
            $scope.getGoodLists = function () {
                $http.get('/good').success(function (data) {
                    $scope.lists = data;
                });
            };
            ///$scope.testA = function () {
             //   alert('123');
            //}
    }])



        .controller('ProfileCtrl', ['$scope', '$http', function ($scope, $http) {
            var init = function () {
                $http.get('/user').then(function (response) {
                    $scope.user = response.data;
                });
            };
            init();
    }]);

})();
