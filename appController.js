angular.module("myApp", [])
    .factory('myFactory', ['$http',
        function($http) {
			var me = function(callback) {
                    var endPoint = "https://api.instagram.com/v1/users/self/media/recent/?access_token=4213681109.2ff0302.151592169ea24a2dafa8a55e66b258e0&callback=JSON_CALLBACK";
					//var endPoint = "https://api.instagram.com/v1/users/276072369/media/recent/??count=99&callback=JSON_CALLBACK&access_token=276072369.1677ed0.0fc757946b45400da3db42f5264d55b6";

                    $http.jsonp(endPoint).success(function(response) {
                        callback(response.data);
                    });
            };
			var immedia = function(callback) {
                    //var endPoint = "https://api.instagram.com/v1/users/self/media/recent/?access_token=4213681109.2ff0302.151592169ea24a2dafa8a55e66b258e0&callback=JSON_CALLBACK";
					var endPoint = "https://api.instagram.com/v1/users/276072369/media/recent/??count=99&callback=JSON_CALLBACK&access_token=276072369.1677ed0.0fc757946b45400da3db42f5264d55b6";

                    $http.jsonp(endPoint).success(function(response) {
                        callback(response.data);
                    });
            };
            return {
                getMediaFromMe: me,
				getMediaFromImmedia: immedia
            }
        }
    ])
    .controller("myCtrl", function($scope, $interval, myFactory) {
      $scope.data = [];
      $scope.mediaIDs = [];
      $scope.getDataForMe = function() {
        myFactory.getMediaFromMe(function(data) {
            for(var i=0; i<data.length; i++) {
                $scope.data.push(data[i]) ;
			}
        });
      };
	  $scope.getDataForImmedia = function(){
		  myFactory.getMediaFromImmedia(function(data){
			  for(var index=0;index<data.length;index++){
				  $scope.data.push(data[index]);
			  }
		  });
	  }
      $scope.getDataForMe();
    });