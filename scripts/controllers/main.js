'use strict';

/**
 * @ngdoc function
 * @name youtubeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the youtubeApp
 */
 angular.module('youtubeApp')
 .controller('MainCtrl', function ($scope) {
 	var vm = this;
 	vm.videos = false;
 	vm.query = '';
 	vm.pageToken=null;
 	vm.categories = false;
 	vm.category;
 	
 	vm.newSearch = function(){
 		vm.cleanVideos();
 		vm.search();
 	}

 	vm.cleanVideos = function (){
 		vm.videos = [];
 		vm.pageToken = null;
 	}

	// Search for a specified string.
	vm.search = function () {
		if(vm.query.length ===0){
			vm.cleanVideos();
			return;
		}

		if(!ApiYoutubeIsLoad) return;

		var q = vm.query;
		var filter = (vm.category==='all')? undefined : vm.category;

		var request = gapi.client.youtube.search.list({
			q: q,
			type: "video",
			videoEmbeddable: true,
			pageToken: vm.pageToken,
			part: 'snippet',
			videoCategoryId: filter,
			maxResults: 10
		});

		request.execute(function(response) {
			if(!vm.videos)vm.videos=[];
			if(response && response.result && response.result.items.length){

				$.each(response.result.items, function(i,e){
					$scope.$apply(function () {
						vm.videos.push(e);
					});
				});
				vm.pageToken = response.result.nextPageToken;
				vm.loading = false;
			}
			console.log(vm.videos.length)
		});
	}

	vm.loadCategories = function () {
		if(!vm.categories){

			var request = gapi.client.youtube.videoCategories.list({
				part: 'snippet',
				regionCode: 'CO'
			});

			request.execute(function(response) {
				vm.categories = response.items;
			});
		}
	}

	vm.showVideo = function(id, title){
		var idVideoToShow = 'https://www.youtube.com/embed/'+id+'?autoplay=1';

		openModal(idVideoToShow,title);
	}

	init(vm);
	
});

