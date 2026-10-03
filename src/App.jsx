import React, { useState } from "react";
import "./App.css";
import JSXExample from "./Component/JSXExample";
import JSXExpresion from "./Component/JSXExpresion";
import JSXAtribute from "./Component/JSXAtribute";
import JSXIfStatement from "./Component/JSXIfStatement";
import Header from "./Component/Header";
import StudentCard from "./Component/StudentCard";
import Footer from "./Component/Footer";
import PropStudentCard from "./Component/PropStudentCard";
import ReactProp from "./Component/ReactProp";
import JSXEvent from "./Component/JSXEvent";
import JSXFormPartOne from "./Component/JSXFormPartOne";
import JSXFormPartTwo from "./Component/JSXFormPartTwo";
import JSXFormPartThree from "./Component/JSXFormPartThree";
import ModalExample from "./Component/ModalExample";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <h1>Hello, Vite + React!</h1> */}
      {/* < JSXExample /> */}
      {/* <JSXExpresion /> */}
      {/* <JSXAtribute /> */}
      {/* <JSXIfStatement /> */}
      {/* <Header />
      <StudentCard />
      <Footer /> */}
      {/* <ReactProp /> */}
      {/* <JSXEvent /> */}
      {/* <JSXFormPartOne /> */}
      {/* <JSXFormPartTwo /> */}
      <JSXFormPartThree />
      {/* <ModalExample
        studentName="John Doe"
        onClose={() => console.log("Modal closed")}
      /> */}
    </div>
  );
}

export default App;
