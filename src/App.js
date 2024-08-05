import React from "react";
import RTMPPlayer from "./components/RTMPPlayer";
import "./App.css";

const streams = [
  { id: 1, url: "rtmp://your-rtmp-server/stream1" },
  { id: 2, url: "rtmp://your-rtmp-server/stream2" },
  { id: 3, url: "rtmp://your-rtmp-server/stream3" },
  // Adicione mais streams conforme necessário
];

function App() {
  return (
    <div className="App">
      <h1>RTMP Radio Players</h1>
      <div className="player-grid">
        {streams.map((stream) => (
          <RTMPPlayer key={stream.id} url={stream.url} />
        ))}
      </div>
    </div>
  );
}

export default App;
