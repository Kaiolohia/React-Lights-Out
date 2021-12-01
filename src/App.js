import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <Board ncols={5} nrows={5}/>
    </div>
  );
}

export default App;
