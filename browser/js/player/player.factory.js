'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var player = {
  	currentSong : null,
  	playing: false
  };
  var audio = document.createElement('audio');
  player.start = function(song){
  	if(this.currentSong) { player.pause() };
  	this.currentSong = song;
  	
  	audio.src = this.currentSong.audioUrl;
  	audio.load();
  	audio.play();

  	this.playing = true;
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
  
  return player;
});
