import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import UploadFile from "./component/Upload";
import axios from "axios";
import ReportGeneration from "./component/ReportGeneration";
import Navbar from "./component/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  // useEffect(() => {
  //   const getReport = async () => {
  //     const data = await axios({
  //       method: "POST",
  //       url: "http://localhost:3000/report",
  //       data: { lol: 123 },
  //       responseType: "blob",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });
  //     const excelBlob = new Blob([data.data]);
  //     const url = URL.createObjectURL(excelBlob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "downloaded-file.xlsx"; // Use a descriptive filename
  //     link.click();
  //   };

  //   getReport();
  // }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
        style={{ width: "350px" }}
      />
      <Navbar />
      <Routes>
        <Route path="/report" element={<ReportGeneration />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/" element={<Navigate to="/report" />} />
      </Routes>
    </>
  );
}

export default App;
