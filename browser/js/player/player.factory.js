'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var player = {
  	currentSong : null,
  	playing: false,
    albumLength: null,
    albumSongs: null,
    progress: 0

  };
  var audio = document.createElement('audio');

  audio.addEventListener('ended', function () {
    this.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    //$scope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio.addEventListener('timeupdate', function () {
    this.progress = 100 * audio.currentTime / audio.duration;
    // $scope.$digest(); // re-computes current template only (this scope)
    //$scope.$evalAsync(); // likely best, schedules digest if none happening
  });

  player.start = function(song, songList){
  	if(this.currentSong) { player.pause() };
  	if (song) {
        this.currentSong = song;
      
      audio.src = this.currentSong.audioUrl;
      audio.load();
      audio.play();
      if (songList) {
        this.albumLength = songList.length;
        this.albumSongs = songList;
      }
      
      this.playing = true;
    }
    
  }

  

  player.pause = function(){
  
    audio.pause();
    
  	this.playing = false;
    
  }

  player.resume = function(){
  	audio.play();
  	this.playing = true;
  }
  player.isPlaying = function(){
  	return this.playing;
  }
  player.getCurrentSong = function(){
  	return this.currentSong;
  }
  
  player.next = function() { 
    var index = this.albumSongs.indexOf(this.currentSong);
    if (index === this.albumLength-1) {
      this.currentSong = this.albumSongs[0];
    } else {
      this.currentSong = this.albumSongs[index+1];
    }
    if (this.playing) {
      this.start(this.currentSong);
    }
  };
  player.previous = function() {
    var index = this.albumSongs.indexOf(this.currentSong);
    if (index === 0) {
      this.currentSong = this.albumSongs[this.albumLength-1];
    } else {
      this.currentSong = this.albumSongs[index-1];
    }
    if (this.playing) {
      this.start(this.currentSong);
    }
  };

  player.getProgress = function() {
    return this.progress;
  }

  
  return player;
});
