import React from "react";
import styled from "styled-components";
import RTMPPlayer from "./components/RTMPPlayer";
import { streams } from "./data/streams";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 20px; // Espaço entre os players
`;

const Header = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;

const App = () => {
  const videoIds = [5, 6];
  return (
    <Container>
      <Header>PAINEL MONITORAÇÃO DOS STREAMING O POVO</Header>
      {streams.map((stream) => (
        <RTMPPlayer
          key={stream.id}
          url={stream.url}
          title={stream.title}
          image={stream.image}
          isVideo={videoIds.includes(stream.id)}
        />
      ))}
    </Container>
  );
};

export default App;
