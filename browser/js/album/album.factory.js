juke.factory('GetAlbums', function ($http) {
  var getAlbumsObj = {};
  getAlbumsObj.fetchAll = function () {
    return $http.get('/api/albums/');
  }
  
  getAlbumsObj.fetchById = function(id){
  	return $http.get('/api/albums/' + id);
  }

  return getAlbumsObj;
})