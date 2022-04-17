import React from "react";
import "./App.css";
import VideoPlayer from "./VideoPlayer";

var videojs = require('video.js');

// Initialize the AirPlay plugin
// require('@silvermine/videojs-airplay')(videojs);

function App() {
  return (
    <div className="App">
      <VideoPlayer
        options={{
          sources: [
            {
              src: "http://localhost:8000/anime/61676566616e737c3230323230303832/0/1/url",
              type: "application/x-mpegURL",
            },
          ],
        }}
        onReady={() => console.log("ok")}
      />
    </div>
  );
}

export default App;
