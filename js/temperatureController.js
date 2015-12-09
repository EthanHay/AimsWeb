angular.module('site', [])


.controller('siteCTRL', function($scope, $http, $routeParams)
{
    $http({method: 'GET', url: 'http://aimsweatherservice.appspot.com/service/vanomolyStatuses'}).success(function(data)
    {
        $scope.anomalyArray = data._embedded.vanomolyStatuses; // response data

        for (var i = 0; i<$scope.anomalyArray.length; i++) {
            $scope.anomalyArray[i].chartConfig = '';

            var blue = -3 + $scope.anomalyArray[i].plusThreeSd;
            var lightBlue = $scope.anomalyArray[i].minusThreeSd + $scope.anomalyArray[i].plusTwoSd;
            var darkGreen = $scope.anomalyArray[i].minusTwoSd + $scope.anomalyArray[i].plusOneSd;
            var green = $scope.anomalyArray[i].plusOneSd;
            var green2 = $scope.anomalyArray[i].minusOneSd;
            var yellow = $scope.anomalyArray[i].plusTwoSd - $scope.anomalyArray[i].plusOneSd;
            var orange = $scope.anomalyArray[i].plusThreeSd - $scope.anomalyArray[i].plusTwoSd;
            var red = 3 - $scope.anomalyArray[i].plusThreeSd;
            var anomaly = $scope.anomalyArray[i].anomoly;
            $scope.configString = {
                options: {
                    chart: {
                        type: 'bar',
                        width: 400,
                        height: 125
                    },
                    tooltip: {
                        enabled: false
                    },
                    title: {
                        text: ''//$scope.anomalyArray[i].siteName
                    },
                    credits: {
                        enabled: false
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['']
                    },
                    yAxis: [{
                        max:3,
                        min:-3,
                        minorTickInterval: 0.25,
                        title: {
                            text: ''
                        }
                    }, { // mirror axis on right side
                        opposite: true,
                        reversed: false,
                        //categories: categories,
                        linkedTo: 0,
                        labels: {
                            step: 1
                        }
                    }],
                    legend: {
                        reversed: true,
                        enabled: false
                    },
                    plotOptions: {
                        column: {
                            grouping: false
                        },
                        series: {
                            stacking: 'normal',
                            borderWidth: 0
                        }
                    }
                },
                series: [
                    {
                        name: '6',
                        color: 'rgba(255, 93, 93, 1)',
                        data: [red]
                    }, {
                        name: '1',
                        color: 'rgba(93, 93, 255, 1)',
                        data: [blue]
                    }, {
                        name: '2',
                        color: 'rgba(77, 137, 202, 1)',
                        data: [lightBlue]
                    }, {
                        name: '3',
                        color: 'rgba(33, 196, 145, 1)',
                        data: [darkGreen]
                    }, {
                        name: '4',
                        color: 'rgba(140, 254, 140, 1)',
                        data: [green2]

                    },{
                        name: '7',
                        color: 'rgba(255, 255, 0, 1)',
                        data: [yellow]
                    },{
                        name: '5',
                        color: 'rgba(254, 170, 85, 1)',
                        data: [orange]
                    }, {
                        name: '4',
                        color: 'rgba(140, 254, 140, 1)',
                        data: [green]

                    },    {
                        type: 'scatter',
                        color: 'black',
                        data: [anomaly],
                        marker: {
                            symbol: 'url(assets/images/rsz_2rsz_1line.png)'
}
                    }],
                loading: false
            };
            $scope.anomalyArray[i].chartConfig = $scope.configString;
        }
    });

    //Temperature Graphs
    $http.get('http://aimsweatherservice.appspot.com/service/vbleachStatuses')
        .then(function(response) {
            $scope.tempArray = response.data._embedded.vbleachStatuses;

            for (var i = 0; i < $scope.tempArray.length; i++) {
                $scope.tempArray[i].chartConfig = '';
                //console.log($scope.tempArray);
                var green = $scope.tempArray[i].watchTemp;
                var yellow = $scope.tempArray[i].warningTemp - $scope.tempArray[i].watchTemp;
                var orange = $scope.tempArray[i].bleachingTemp - $scope.tempArray[i].warningTemp;
                var red = 34 - $scope.tempArray[i].bleachingTemp;
                var currentTemp = $scope.tempArray[i].actualWaterTemp;
                //console.log(green, yellow, orange, red, currentTemp)
                $scope.configString2 = {
                    options: {
                        chart: {
                            type: 'bar',
                            height: 125
                        },
                        tooltip: {
                            enabled: false
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            categories: ['']
                        },
                        yAxis: {
                            max: 34,
                            min: 24,
                            minorTickInterval: 0.5,
                            title: {
                                text: ''
                            }
                        },
                        legend: {
                            reversed: true,
                            enabled: false
                        },
                        plotOptions: {
                            column: {
                                grouping: false
                            },
                            series: {
                                stacking: 'normal'
                            }
                        }
                    },
                    series: [{
                        color: 'rgba(255, 93, 93, 1)',
                        data: [red]

                    }, {
                        color: 'rgba(254, 170, 85, 1)',
                        data: [orange]
                    }, {
                        //name: '',
                        color: 'rgba(255, 255, 0, 1)',
                        data: [yellow]
                    }, {
                        name: '',
                        color: 'rgba(140, 254, 140, 1)',
                        data: [green]

                    }, {
                        type: 'scatter',
                        color: 'black',
                        data: [currentTemp],
                        marker: {
                            symbol: 'url(assets/images/rsz_2rsz_1line.png)'
                        }
                    }],
                    credits: {enabled: false}

                };
                $scope.tempArray[i].chartConfig = $scope.configString2;
            }
        });



    //creates map
    $http({method: 'GET', url: 'http://aimsweatherservice.appspot.com/service/vbleachStatuses'}).success(function(data){
        $scope.siteMarkers = [];
        $scope.tempArray = data._embedded.vbleachStatuses;

        console.log($scope.tempArray);

        //second  get method
        $http({method: 'GET', url: 'js/json/latLngData'}).success(function(data){
            $scope.siteMarkers2 = [];
            $scope.tempArray2 = data._embedded.vchannels;
            $scope.latData = [];
            $scope.lngData = [];

            console.log($scope.tempArray2);


            for (var i = 0; i < $scope.tempArray.length; i++) {

                //compares the ID from both service files
                if ( $scope.tempArray.siteId == $scope.tempArray2.siteId){

                    $scope.latData[i] = $scope.tempArray2[i].latitude;
                    $scope.lngData[i] = $scope.tempArray2[i].longitude;

                    $scope.siteMarkers[i] = [$scope.tempArray[i].siteName,
                        $scope.tempArray[i].siteId,
                        '#/details/' + $scope.tempArray[i].siteId,
                        $scope.latData[i],
                        $scope.lngData[i]]
                    //-23.44347, 151.94926 ]

                    console.log("latdata= " + $scope.latData[i]);
                    console.log("lngdata= " + $scope.lngData[i]);
                    console.log('#/details/'+ $scope.tempArray[i].siteId);
                    console.log('link= ' + $scope.siteMarkers[i][2]);

                }

            }

            $scope.showdiv = function(){
                $scope.templateURL = 'pages/bleaching.html';
            }

            //$scope.siteMarker = $scope.getSiteMarkers();
            console.log($scope.siteMarkers);
            //console.log($scope.siteMarkers[0][4], $scope.siteMarkers[0][3]);

            $scope.initialize = function() {
                var siteIcon = '/resources/rsz_11images1.png';
                var mapProp = {
                    center: new google.maps.LatLng(23.0000, 143.0000),
                    zoom:5,
                    mapTypeId:google.maps.MapTypeId.SATELLITE
                };

                var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

                <!--Adds a marker to the map.-->
                var marker, i;
                for (i = 0; i < $scope.siteMarkers.length; i++) {
                    //console.log(siteMarkers[i][4]);
                    marker=new google.maps.Marker({
                        position: new google.maps.LatLng($scope.latData[i], $scope.lngData[i]),
                        //position: new google.maps.LatLng($scope.siteMarkers[i][3], $scope.siteMarkers[i][4]),
                        map: map,
                        label: $scope.siteMarkers[i][0],
                        title: $scope.siteMarkers[i][0],
                        icon: siteIcon,
                        url: $scope.siteMarkers[i][2]
                    });
                    google.maps.event.addListener(marker, 'click', function() {
                        console.log(this.url);
                        window.location.href = this.url;
                    });
                }
            };
            google.maps.event.addDomListener(window, 'load', $scope.initialize())
        });//Second get method ends
    })


});