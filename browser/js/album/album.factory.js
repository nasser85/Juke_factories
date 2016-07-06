juke.factory('GetAlbums', function ($http) {
  var getAlbumsObj = {};
  getAlbumsObj.fetchAll = function () {
    return $http.get('/api/albums/');
  
  };
  return getAlbumsObj;
})