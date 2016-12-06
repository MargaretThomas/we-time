angular.module("myApp", [])
    .factory('myFactory', ['$http',
        function($http) {
            return {
                getMedia: function(callback) {
                    //var endPoint = "https://api.instagram.com/v1/users/self/media/recent/?access_token=4213681109.2ff0302.151592169ea24a2dafa8a55e66b258e0&callback=JSON_CALLBACK";
					var endPoint = "https://api.instagram.com/v1/users/276072369/media/recent/??count=99&callback=JSON_CALLBACK&access_token=276072369.1677ed0.0fc757946b45400da3db42f5264d55b6";

                    $http.jsonp(endPoint).success(function(response) {
                        callback(response.data);
                    });
                }
            }
        }
    ])
    .controller("myCtrl", function($scope, $interval, myFactory) {
      $scope.data = [];
      $scope.mediaIDs = [];
      $scope.getData = function() {
        myFactory.getMedia(function(data) {
            for(var i=0; i<data.length; i++) {
                $scope.data.push(data[i]) ;
            }
        });
      };
      $scope.getData();
    });