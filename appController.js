angular.module('myApp', [])
    .factory('myFactory', ['$http',
        function($http) {
			// Getting the media from my profile.
			var me = function(callback) {
                var endPoint = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=4213681109.2ff0302.151592169ea24a2dafa8a55e66b258e0&callback=JSON_CALLBACK';

                $http.jsonp(endPoint).success(function(response) {
                    callback(response.data);
                });
            };
			// Getting the media from immedia's profile.
			var immedia = function(callback) {
				var endPoint = 'https://api.instagram.com/v1/users/276072369/media/recent/??count=99&callback=JSON_CALLBACK&access_token=276072369.1677ed0.0fc757946b45400da3db42f5264d55b6';
	
				$http.jsonp(endPoint).success(function(response) {
					callback(response.data);
				});
            };
			/*
			// Getting the comments for the media from immedia's profile.
			var commentsFromImmedia = function(callback) {
				var endPoint = 'https://api.instagram.com/v1/media/'+$scope.mediaId+'/comments?access_token=4213681109.2ff0302.151592169ea24a2dafa8a55e66b258e0';

                $http.jsonp(endPoint).success(function(response) {
                    callback(response.data);
                });
            };
			*/
            return {
                getMediaFromMe: me,
				getMediaFromImmedia: immedia,
				//getCommentsFromImmedia: commentsFromImmedia
            }
        }
    ])
    .controller("myCtrl", function($scope, $interval, myFactory) {
		// Storing the info that was returned from Instagram.	
		$scope.data = [];
		// Storing the mediaIDs for all media that has a comment.
		$scope.mediaIDs = [];
		$scope.mediaId;
		// Storing all the comments.
		$scope.comments = [];
		
		// Method to get my info and store it in the data array.
		$scope.getDataForMe = function() {
			myFactory.getMediaFromMe(function(data) {
				// Take each media object and put it in an array.
				for(var i=0; i<data.length; i++) {
					$scope.data.push(data[i]);
					if(data[i].comments.count > 0){
						$scope.mediaIDs.push(data[i].id);
					}
				}
			});
		};
		// Method to get immedia's info and store it in the data array.
		$scope.getDataForImmedia = function(){
			myFactory.getMediaFromImmedia(function(data){
				for(var index=0;index<data.length;index++){
					$scope.data.push(data[index]);					
					if(data[index].comments.count > 0){
						$scope.mediaIDs.push(data[index].id);
					}
				}
			});
		}
		/*
		// Method to get all existing comments.
		$scope.getComments = function(){
			// Loop through mediaIDs array.
			for(var j=0;j<$scope.mediaIDs.length;j++){
				// Save latest media id.
				$scope.mediaId = $scope.mediaIDs[j];
				// Factory returns object.
				// Loop through object and fill comments array.
				myFactory.getCommentsFromImmedia(function(data){
					for(var a=0;a<data.length;a++){
						$scope.comments.push(data[a].text);
					}
				});
			}
		}
		*/
		$scope.initialisePage = function(){
			// Calling method
			$scope.getDataForMe();
			//$scope.getComments();
		}
    });