import React from "react";
import RTMPPlayer from "./components/RTMPPlayer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Header = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;

const streams = [
  {
    id: 1,
    url: "https://ice.fabricahost.com.br/cbnfortaleza",
    title: "Rádio O POVO CBN",
    image:
      "https://www.opovo.com.br/reboot/includes/assets/img/menu/icon-cbn.webp",
  },
  {
    id: 2,
    url: "https://ice.fabricahost.com.br/cbnfortalezaam1010",
    title: "Rádio O POVO 1010",
    image:
      "https://www.opovo.com.br/reboot/includes/assets/img/menu/icon-cbn.webp",
  },
  {
    id: 3,
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/NOVABRASIL_FORAAC.aac",
    title: "Rádio Nova Brasil",
    image:
      "https://www.opovo.com.br/reboot/includes/assets/img/menu/icon-nova-br.webp",
  },
  // Adicione mais streams conforme necessário
];

const App = () => {
  return (
    <Container>
      <Header>Radio Players</Header>
      {streams.map((stream) => (
        <RTMPPlayer
          key={stream.id}
          url={stream.url}
          title={stream.title}
          image={stream.image}
        />
      ))}
    </Container>
  );
};

export default App;
