import React from "react";
import ReactPlayer from "react-player";

const RTMPPlayer = ({ url }) => {
  return (
    <div className="player-wrapper">
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
      />
    </div>
  );
};

export default RTMPPlayer;
