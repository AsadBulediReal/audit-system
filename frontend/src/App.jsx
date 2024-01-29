import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import UploadFile from "./component/Upload";
import axios from "axios";

function App() {
  useEffect(() => {
    const getReport = async () => {
      const data = await axios({
        method: "POST",
        url: "http://localhost:3000/report",
        data: { lol: 123 },
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const excelBlob = new Blob([data.data]);
      const url = URL.createObjectURL(excelBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "downloaded-file.xlsx"; // Use a descriptive filename
      link.click();
    };

    getReport();
  }, []);

  return <UploadFile />;
}

export default App;
