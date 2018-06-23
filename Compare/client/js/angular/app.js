(function () {

    'use strict';

    angular.module('Compare', [
            'ui.router',
            'Compare.controllers',
            'Compare.directives'
        ])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider) {

                var checkLoggedin = function ($q, $timeout, $http, $location) {
                    var deferred = $q.defer();
                    $http.get('/user').success(function (user) {
                        // Authenticated
                        if (user !== false)
                            deferred.resolve();

                        // Not Authenticated
                        else {
                            alert("Please Login");
                            deferred.reject();
                            $location.url('/login');
                        }
                    });

                    return deferred.promise;
                };

                $httpProvider.interceptors.push(function ($q, $location) {
                    return {
                        response: function (response) {
                            // do something on success
                            return response;
                        },
                        responseError: function (response) {
                            if (response.status === 401) {
                                $location.url('/login');
                            }
                            return $q.reject(response);
                        }
                    };
                });

                $stateProvider
                    .state('main', {
                        url: '/',
                        templateUrl: 'views/Main.html',
                        controller: 'MainCtrl'
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'views/Login.html',
                        controller: 'LoginCtrl'
                    })
                    .state('signup', {
                        url: '/signup',
                        templateUrl: 'views/SignUp.html',
                        controller: 'SignUpCtrl'
                    })
                    .state('profile', {
                        url: '/profile',
                        templateUrl: 'views/Profile.html',
                        controller: 'ProfileCtrl',
                        resolve: {
                            loggedin: checkLoggedin
                        }
                    })
                    .state('compare', {
                        url: '/compare',
                        templateUrl: 'views/compare.html',
                        controller: 'CompareCtrl'
                    })
                    .state('pixnet', {
                        url: '/pixnet',
                        templateUrl: 'views/Pixnet.html',
                        controller: 'PixnetCtrl'
                    });

                $urlRouterProvider.otherwise('/');
            }
        ]);
})();
