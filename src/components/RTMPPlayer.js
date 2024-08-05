import React, { useState } from "react";
import ReactPlayer from "react-player";

const RTMPPlayer = ({ url, title, image }) => {
  const [volume, setVolume] = useState(50);

  return (
    <div className="player-wrapper">
      <img src={image} alt={title} className="player-image" />
      <h2 className="player-title">{title}</h2>
      <ReactPlayer
        url={url}
        playing
        controls
        width="100%"
        height="100%"
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
        volume={volume / 100}
      />
      <div className="player-vu">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="player-volume"
        />
        <span className="player-volume-text">{volume}%</span>
      </div>
    </div>
  );
};

export default RTMPPlayer;
