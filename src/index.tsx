import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);
// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
