import React from "react";
import ReactDOM from "react-dom/client";
import FoundItemForm from "./FoundItemForm";
import "./index.css"; // Optional: if you have global styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FoundItemForm />
  </React.StrictMode>
);
