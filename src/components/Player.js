import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlay, 
  faAngleLeft, 
  faAngleRight,
  faPause, 
} from '@fortawesome/free-solid-svg-icons';

const Player = ({ 
  songs, 
  setSongs,
  audioRef, 
  currentSong, 
  setCurrentSong, 
  isPlaying, 
  setIsPlaying, 
  songInfo, 
  setSongInfo 
}) => {

  // handler
  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  }

  const activeLibraryHandler = (currentSong) => {
    const newSongs = songs.map((state) => {
      if (state.id === currentSong.id) {
        return {
          ...state,
          active: true,
        };
      }
      else return {
        ...state,
        active: false,
      };
    })
    setSongs(newSongs);
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + direction + songs.length) % songs.length]);
    activeLibraryHandler(currentSong);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  }

  // * styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div 
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input 
            type="range" 
            min={0} 
            max={songInfo.duration || 0} 
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div className="animate-track" style={trackAnimation}>
          </div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00' }</p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon 
          className="skip-back" 
          size="2x" 
          icon={faAngleLeft}
          onClick={() => skipTrackHandler(-1)}
          />
        <FontAwesomeIcon 
          onClick={playSongHandler} 
          className="play" 
          size="2x" 
          icon={isPlaying ? faPause : faPlay}
          />
        <FontAwesomeIcon 
          className="skip-forward" 
          size="2x" 
          icon={faAngleRight}
          onClick={() => skipTrackHandler(1)}
        />
      </div>
    </div>
  );
}

export default Player;