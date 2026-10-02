import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import JSXExample from "./Component/JSXExample";

function App() {
  const [count, setCount] = useState(0);

  return (
    // <div className="App">
    //   <h1>Hello, Vite + React!</h1>
    // </div>

    < JSXExample />
    
  );
}

export default App;
