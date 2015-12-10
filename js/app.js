angular.module('GBR_Bleaching_Watch', ["ngRoute","highcharts-ng","site","details"])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/bleaching', {
                templateUrl: 'pages/bleaching.html',
                controller: 'siteCTRL',
            })

            .when('/details/:id', {
                templateUrl: 'pages/singleSiteDetails.html',
                controller: 'detailsController'
            })

            .when('/bleaching/historic', {
                templateUrl: 'pages/historic-bleaching.html',
                controller: 'historicController'
            })
            .otherwise({
                redirectTo: '/bleaching'
            });
    }]);

