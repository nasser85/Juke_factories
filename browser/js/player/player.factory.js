'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var player = {
  	currentSong : null,
  	playing: false,
    albumLength: null,
    albumSongs: null,
    progress: 0,
    timeUpdate: null
  };
  var audio = document.createElement('audio');
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
      this.timeUpdate = setInterval (function() {this.progress = audio.currentTime / audio.duration}, 1000);
      this.playing = true;
    }
    
  }

  

  player.pause = function(){
  	clearInterval(this.timeUpdate);
    audio.pause();
    
  	this.playing = false;
    //this.progress = audio.currentTime;

    console.log(this.progress, audio.currentTime);
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
    if (this.progress) {
      console.log(+this.progress.toFixed(2))
      return +this.progress.toFixed(2);
    }
    return this.progress;
  }

  
  return player;
});
