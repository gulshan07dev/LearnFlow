import React from "react"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <Layout />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
