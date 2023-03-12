import React from "react";
import "./App.css";
import DashboardComponent from "./Dashboard.js";
import aws_settings from "./aws-exports.js"

function App() {
  return (
     <DashboardComponent defaultAPI={aws_settings.aws_appsync_graphqlEndpoint} />
  );
}

export default App;