import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

import './styles/app.scss';
import data from './data';

import { useState, useRef } from 'react';

function App() {
  
  // Ref
  const audioRef = useRef(null);
  
  //State 
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);


  const timeUpdateHandler = (e) => {
    const { currentTime, duration } = e.target;
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(roundedCurrent / roundedDuration * 100);

    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav 
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song currentSong={currentSong}></Song>
      <Player 
        songs={songs}
        setSongs={setSongs}
        audioRef={audioRef}
        currentSong={currentSong} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      ></Player>
      <Library 
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        libraryStatus={libraryStatus}
      />

      <audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
        ref={audioRef} 
        src={currentSong.audio}
      >
      </audio>
    </div>
  );
}

export default App;
