import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaHeart, FaTrashAlt, FaStepBackward, FaStepForward, FaRedo } from 'react-icons/fa';

const App = () => {
  const [songLink, setSongLink] = useState('');
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef(null);

  const handleAddSong = () => {
    if (songLink.trim() && !songs.includes(songLink)) {
      setSongs([...songs, songLink]);
      setSongLink('');
    }
  };

  const handlePlay = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = songs.indexOf(currentSong);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = songs.indexOf(currentSong);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  const handleDelete = (song) => {
    setSongs(songs.filter((s) => s !== song));
    if (song === currentSong) {
      setCurrentSong(null);
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 p-4">
        <h2 className="text-lg font-bold mb-4">Add Song</h2>
        <input
          type="text"
          value={songLink}
          onChange={(e) => setSongLink(e.target.value)}
          placeholder="Paste song link"
          className="w-full p-2 mb-2 bg-gray-700 rounded"
        />
        <button
          onClick={handleAddSong}
          className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600"
        >
          Add Song
        </button>
      </div>

      {/* Now Playing */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-700 p-6 text-center">
        <h2 className="text-lg font-bold mb-4">Now Playing</h2>
        {currentSong ? (
          <>
            <audio
              src={currentSong}
              ref={audioRef}
              onEnded={repeat ? () => audioRef.current.play() : handleNext}
              autoPlay
            />
            <p className="mb-4 truncate">{currentSong}</p>
            <div className="flex items-center space-x-4">
              <button onClick={handlePrevious} className="p-2 bg-gray-800 rounded-full">
                <FaStepBackward />
              </button>
              <button onClick={handleTogglePlay} className="p-2 bg-gray-800 rounded-full">
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={handleNext} className="p-2 bg-gray-800 rounded-full">
                <FaStepForward />
              </button>
              <button onClick={() => setRepeat(!repeat)} className={`p-2 rounded-full ${repeat ? 'bg-blue-500' : 'bg-gray-800'}`}>
                <FaRedo />
              </button>
            </div>
          </>
        ) : (
          <p>No song playing</p>
        )}
      </div>

      {/* All Songs */}
      <div className="w-full md:w-1/4 bg-gray-800 p-4">
        <h2 className="text-lg font-bold mb-4">All Songs</h2>
        <ul>
          {songs.map((song, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-gray-700 rounded mb-2 hover:bg-gray-600"
            >
              <span className="truncate w-3/5">{song}</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => handlePlay(song)} className="p-2 bg-gray-800 rounded-full">
                  <FaPlay />
                </button>
                <button className="p-2 bg-gray-800 rounded-full">
                  <FaHeart />
                </button>
                <button onClick={() => handleDelete(song)} className="p-2 bg-gray-800 rounded-full">
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
