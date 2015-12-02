angular.module('site', [])


.controller('siteCTRL', function($scope, $http, $routeParams)
{
    $http({method: 'GET', url: 'http://aimsweatherservice.appspot.com/service/vanomolyStatuses'}).success(function(data)
    {
        $scope.anomalyArray = data._embedded.vanomolyStatuses; // response data
    });

    $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses')
        .then(function(response) {
            $scope.tempArray = response.data._embedded.vbleachStatuses;
        })




$scope.generateChart = function(id, currentTemp, watchTemp, warningTemp, bleachingTemp) {
        console.log("chart generated");
        var green = watchTemp;
        var yellow = warningTemp - watchTemp;
        var orange = bleachingTemp - warningTemp;
        var red = 34 - bleachingTemp;

            $('#container-' + id).highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['']
                },
                yAxis: {
                    max:34,
                    min:20,
                    minorTickInterval: 0.5,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    reversed: true,
                    enabled:false
                },
                plotOptions: {
                    column: {
                        grouping: false
                    },
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    color: 'rgba(255, 0, 0, 1)',
                    data: [red]

                }, {
                    color: 'rgba(283, 118, 0, 1)',
                    data: [orange]
                }, {
                    //name: '',
                    color: 'rgba(255, 215, 0, 1)',
                    data: [yellow]
                },  {
                    name: '',
                    color: 'rgba(0, 238, 0, 1)',
                    data: [green]

                } , {
                    type: 'scatter',
                    color: 'black',
                    data: [currentTemp],
                    marker: {
                        symbol: 'url(http://s22.postimg.org/eavyqgzgt/rsz_2rsz_1line.png)',
                    }
                }],
                credits: { enabled: false }

            });
    };
})




;

/*math bleh
green = watchtemp
yellow = warningtemp - watchtemp
orange = bleachingTemp - yellow
red = 34 - orange



var invocation = new XMLHttpRequest();
var url = "http://adctest.aims.gov.au:8080/rtdsrest/api/vbleachStatuses/";

function callOtherDomain() {
    if (invocation){
        invocation.open('GET', url, true);
        invocation.onreadystatechange = handler;
        invocation.send();
    }
}
$scope.tempArray = callOtherDomain();

 Create the XHR object.
 function createCORSRequest(method, url) {
 var xhr = new XMLHttpRequest();
 if ("withCredentials" in xhr) {
 // XHR for Chrome/Firefox/Opera/Safari.
 xhr.open(method, url, true);
 } else if (typeof XDomainRequest != "undefined") {
 // XDomainRequest for IE.
 xhr = new XDomainRequest();
 xhr.open(method, url);
 } else {
 // CORS not supported.
 xhr = null;
 }
 return xhr;
 }

 // Helper method to parse the title tag from the response.
 function getTitle(text) {
 return text.match('<title>(.*)?</title>')[1];
 }

 // Make the actual CORS request.
 function makeCorsRequest() {
 // All HTML5 Rocks properties support CORS.
 var url = 'http://adctest.aims.gov.au:8080/rtdsrest/api/vbleachStatuses';

 var xhr = createCORSRequest('GET', url);
 if (!xhr) {
 alert('CORS not supported');
 return;
 }

 // Response handlers.
 xhr.onload = function () {
 var text = xhr.responseText;
 var title = getTitle(text);
 alert('Response from CORS request to ' + url + ': ' + title);
 };

 xhr.onerror = function () {
 alert('Woops, there was an error making the request.');
 };

 xhr.send();
 }
 */