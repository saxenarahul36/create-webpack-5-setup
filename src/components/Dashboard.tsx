import React from "react";
import Home from "../components/Home.js";
export const Dashboard: React.FC<{}> = () => (
  <div style={{ background: "red" }}>
    <h1>Welcome Dashboard page with webpack 5</h1>
    <Home></Home>
  </div>
);

export default Dashboard;
