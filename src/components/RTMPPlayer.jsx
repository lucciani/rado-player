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
  max-width: ${({ isVideo }) =>
    isVideo
      ? "400px"
      : "300px"}; // Largura do player de vídeo menor que os demais
  width: 80%; // Mantém o player responsivo
  background-color: #fff;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 90%; // Para telas menores, use uma largura maior proporcionalmente
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
  color: ${({ isPlaying, hasAudio }) => {
    if (!hasAudio) return "red"; // Se não há áudio, é OFF vermelho
    return isPlaying ? "green" : "red"; // Se está tocando, verde; caso contrário, vermelho
  }};
`;

// Restante do código
const RTMPPlayer = ({ url, title, image, isVideo }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  useEffect(() => {
    const audioElement = playerRef.current?.getInternalPlayer();

    const handlePlay = () => {
      setIsPlaying(true);
      setHasAudio(audioElement.muted === false && audioElement.duration > 0);
    };

    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setIsPlaying(false);
      // Tratar manipulação de erro
    };

    if (audioElement) {
      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("error", handleError);
    }

    return () => {
      audioElement?.removeEventListener("play", handlePlay);
      audioElement?.removeEventListener("pause", handlePause);
      audioElement?.removeEventListener("error", handleError);
    };
  }, []);

  // Nova verificação a cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      const audioElement = playerRef.current?.getInternalPlayer();
      if (audioElement) {
        const isCurrentlyPlaying =
          !audioElement.paused &&
          !audioElement.muted &&
          audioElement.duration > 0;
        setIsPlaying(isCurrentlyPlaying);
        setHasAudio(isCurrentlyPlaying);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <PlayerWrapper isVideo={isVideo}>
      <Image src={image} alt={title} />
      <Title>{title}</Title>
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={isPlaying}
        loop
        controls
        width="100%"
        height={isVideo ? "300px" : "80px"}
        onReady={() => setHasAudio(true)}
      />
      <Status isPlaying={isPlaying.toString()} hasAudio={hasAudio}>
        {hasAudio ? (isPlaying ? "ON" : "OFF") : "OFF"}
      </Status>
    </PlayerWrapper>
  );
};

export default RTMPPlayer;
