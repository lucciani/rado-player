import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  background-color: #fff;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin: 0.5em 0;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Status = styled.div`
  margin-top: 10px;
  font-size: 5em;
  font-weight: bold;
  color: ${(props) => (props.isPlaying === "true" ? "green" : "red")};
`;

const RTMPPlayer = ({ url, title, image }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Default to true to auto-play on load
  const [hasAudio, setHasAudio] = useState(false);

  useEffect(() => {
    const handlePlay = () => {
      setIsPlaying(true);
      const audioElement = playerRef.current.getInternalPlayer();
      if (audioElement instanceof HTMLMediaElement) {
        setHasAudio(audioElement.muted === false && audioElement.duration > 0);
      }
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setIsPlaying(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 1000);
    };

    const audioElement = playerRef.current?.getInternalPlayer();
    if (audioElement) {
      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("error", handleError);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("error", handleError);
      }
    };
  }, []);

  return (
    <PlayerWrapper>
      <Image src={image} alt={title} />
      <Title>{title}</Title>
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={isPlaying}
        loop={true}
        controls
        width="100%"
        height="50px"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onReady={() => setHasAudio(true)}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
      <Status isPlaying={isPlaying.toString()}>
        {hasAudio ? (isPlaying ? "ON" : "OFF") : "OFF"}
      </Status>
    </PlayerWrapper>
  );
};

export default RTMPPlayer;
