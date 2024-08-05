import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import WaveSurfer from "wavesurfer.js";
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

const VUContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 50px;
`;

const RTMPPlayer = ({ url, title, image }) => {
  const playerRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [waveSurfer, setWaveSurfer] = useState(null);

  useEffect(() => {
    if (!waveSurfer) {
      const waveSurferInstance = WaveSurfer.create({
        container: waveSurferRef.current,
        waveColor: "#ff0000",
        progressColor: "#ffffff",
        cursorColor: "transparent",
        barWidth: 2,
        barRadius: 2,
        responsive: true,
        height: 50,
      });

      setWaveSurfer(waveSurferInstance);
    }

    const handlePlay = () => {
      const audioElement = playerRef.current.getInternalPlayer();
      if (audioElement instanceof HTMLMediaElement) {
        waveSurfer.load(audioElement);
      }
    };

    if (playerRef.current) {
      const audioElement = playerRef.current.getInternalPlayer();
      if (audioElement) {
        audioElement.addEventListener("play", handlePlay);
      }
    }

    return () => {
      if (playerRef.current) {
        const audioElement = playerRef.current.getInternalPlayer();
        if (audioElement) {
          audioElement.removeEventListener("play", handlePlay);
        }
      }
      if (waveSurfer) {
        waveSurfer.destroy();
      }
    };
  }, [waveSurfer]);

  return (
    <PlayerWrapper>
      <Image src={image} alt={title} />
      <Title>{title}</Title>
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing
        controls
        width="100%"
        height="50px"
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
      <VUContainer ref={waveSurferRef} />
    </PlayerWrapper>
  );
};

export default RTMPPlayer;
