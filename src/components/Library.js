import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setSongs, setCurrentSong, audioRef, isPlaying, setIsPlaying, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong 
            songs={songs}
            setSongs={setSongs}
            song={song} 
            setCurrentSong={setCurrentSong}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;