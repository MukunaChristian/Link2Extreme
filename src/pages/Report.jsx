import { useState, useEffect } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";
import IPConfig from "../components/IPConfig";
import Btncsv from "../assets/Btncsv.jsx";
import Btnpdf from "../assets/Btnpdf.jsx";


export default function Report() {
  const [ip] = useState(IPConfig());
  const [showSecondCard, setShowSecondCard] = useState(false); // State to control the visibility of the second card
  const [formhtml, SetFormHtml] = useState();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [showDateMessage, setShowDateMessage] = useState(true);
  const [reportVersion, setReportVersion] = useState(0);



  useEffect(() => {
    // Load initial data here if needed
  }, []); // Empty dependency array to run only once

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleReportVersionChange = (event) => {
    setReportVersion(event.target.value);
    console.log(event.target.value);
  }
  
  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    setShowSecondCard(true);


    
    if (!fromDate || !toDate) {
      // Dates are not selected
      setShowDateMessage(true);
    } else {
      // Dates are selected, proceed with generating the report
      setShowDateMessage(false);
      // Add your logic to generate the report here
    }


    axios
      .get(`${ip}/api/report`, {
        params: {
          report_format: "HTML",
          start_date: fromDate,
          end_date: toDate,
          report_version: reportVersion
        },
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        // Set the HTML form received from the API
        SetFormHtml(response.data.data);
        setShowDateMessage(false); // Reset the state to hide the message

      })
      .catch((error) => {
        setIsLoading(false);
        setShowDateMessage(false); // Reset the state in case of an error
        console.error(error);
      });
  };

  const downloadpdf = (format) => {
    const url = `https://link2extreme.com/api/report?report_format=${format}&start_date=${fromDate}&end_date=${toDate}&report_version=${reportVersion}`;

    axios
      .get(url, { responseType: "blob" })
      .then((response) => {
        console.log("Response Data:", response.data);
        if (format.toLowerCase() === "pdf") {
          downloadPDF(response.data);
        }
      })
      .catch((error) => {
        console.error("Error downloading report:", error);
      });
  };

  const downloadReport = (format) => {
    const url = `https://link2extreme.com/api/report?report_format=${format}&start_date=${fromDate}&end_date=${toDate}&report_version=${reportVersion}`;

    axios
      .get(url)
      .then((response) => {
        console.log("Response Data:", response.data);
        if (format.toLowerCase() === "csv") {
          downloadCSV(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error downloading report:", error);
      });
  };

  const downloadPDF = (data) => {
    const blob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const downloadCSV = (data) => {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <main id="Report">
      <section>
        <div className="card-input">
          <form className="grid" onSubmit={handleSubmit}>
            <label htmlFor="fromDate">From:</label>
            <input
              className="date-input"
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={handleFromDateChange}
              required
            />

            <label htmlFor="toDate">To:</label>
            <input
              className="date-input"
              type="date"
              id="toDate"
              value={toDate}
              onChange={handleToDateChange}
              required
            />

            {/* dropdown for the report versions */}
            <label htmlFor="reportVersion">Report Version:</label>
            <select id="reportVersion" name="reportVersion" onChange={handleReportVersionChange} required>
              <option value="0">All</option>
              <option value="1">Purchased Only</option>
            </select>

            <button className="submit-date" type="submit">
              Generate
            </button>

            <div className="download-btn">
              <button
                className="btn-report"
                onClick={() => downloadReport("CSV")}
              >
                <span>Download CSV</span>
                <Btncsv />
              </button>
              <button className="btn-report" onClick={() => downloadpdf("PDF")}>
                <span>Download PDF</span>
                <Btnpdf />
              </button>
            </div>
          </form>
        </div>
      </section>

      {showDateMessage && (
    <section>
      <div className="message">
        <p>Please select both From and To dates to generate the report.</p>
      </div>
    </section>
)}


      {!isloading ? (
        <section>
          <div className={`${showSecondCard && "main-card"}`}>
            <div dangerouslySetInnerHTML={{ __html: formhtml }}></div>
          </div>
        </section>
      ) : (
        <div id="loading"></div>
      )}
    </main>
  );
}
