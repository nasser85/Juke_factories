
juke.controller("newAlbumCtrl", function($scope, $rootScope, $log, GetAlbums){

	GetAlbums.fetchAll()
	.then(function(res){
		return res.data;
	})
	.then(function(albums){
		console.log("albums", albums);
		var albumDetail = albums.map(function(album){
			return GetAlbums.fetchById(album.id)
		})
		// console.log("albumDetail", albumDetail);
		$scope.albums = albums;

		Promise.all(albumDetail)
		.then(function(albumSongs){
			$scope.albumLength = albumSongs.map(function(obj){
				console.log(obj.data.songs.length);
				return obj.data.songs.length;
			})
		})
	})
	.catch($log.error);


})