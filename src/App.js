import React from "react";
import "./App.css";
import DashboardComponent from "./Dashboard.js";

function App() {
  return (
     <DashboardComponent defaultAPI="http://localhost:8081" />
  );
}

export default App;
