import React from "react";
import RTMPPlayer from "./components/RTMPPlayer";
import "./App.css";

const streams = [
  {
    id: 1,
    url: "https://ice.fabricahost.com.br/cbnfortaleza",
    title: "Rádio O POVO CBN",
    image: "https://cbn.opovo.com.br/wp-content/themes/cbn-fortaleza-tema/assets/imgs/logo-opovo-preto-vermelho-cn.svg",
  },
  {
    id: 2,
    url: "rtmp://your-rtmp-server/stream2",
    title: "Rádio 2",
    image: "https://example.com/radio2.jpg",
  },
  {
    id: 3,
    url: "rtmp://your-rtmp-server/stream3",
    title: "Rádio 3",
    image: "https://example.com/radio3.jpg",
  },
  // Adicione mais streams conforme necessário
];

function App() {
  return (
    <div className="App">
      <h1>RTMP Radio Players</h1>
      <div className="player-grid">
        {streams.map((stream) => (
          <RTMPPlayer
            key={stream.id}
            url={stream.url}
            title={stream.title}
            image={stream.image}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
