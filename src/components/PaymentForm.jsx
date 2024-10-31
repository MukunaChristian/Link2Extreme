import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import IPConfig from "./IPConfig";

export default function PaymentForm({ userID }) {
  const [form, SetForm] = useState();
  const navigate = useNavigate();
  const ip = IPConfig();

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    axios
      .get(`${ip}/${userID}/payment`, {
        headers: {
          Accept: "application/json"
        }
      })
      .then(response => {
        console.log(response);
        SetForm(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [ip]);

  return (
    <>
      <div className="btn-position">
        <div
          className="paymentForm"
          dangerouslySetInnerHTML={{ __html: form }}
        ></div>
        <button className="btn-checkout btn-cancel" onClick={goBack}>
          Cancel
        </button>
      </div>
    </>
  );
}

const handleSubmit = event => {
  event.preventDefault();
  console.log("From Date:", fromDate);
  console.log("To Date:", toDate);

  // Make API request with selected dates
  axios
    .get(`${ip}/api/report`, {
      params: {
        report_format: "HTML",
        start_date: fromDate,
        end_date: toDate
      },
      headers: {
        Accept: "application/json"
      }
    })
    .then(response => {
      console.log(response);
      // Set the HTML form received from the API
      SetFormHtml(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};
