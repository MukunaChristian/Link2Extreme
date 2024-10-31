import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactModal from "react-modal";
import Modal from "react-modal";
import IconSearch from "../assets/icon-search";
import Cross from "../assets/red.jsx";
import Checks from "../assets/check.jsx";
import axios from "axios";
import IPConfig from "../components/IPConfig";
import RecordsMessageModal from "../components/RecordsError.jsx";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "21rem",
    position: "relative"
  },
  calendarContainer: "custom-calendar-container"
};

const Table = () => {
  const [showPurchaseMessage, setShowPurchaseMessage] = useState(false);

  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const [currentButton, setCurrentButton] = useState(1);
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);
  const [table, setTable] = useState([]);
  const [numberOfpage, setNumberOfPage] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");
  let [selectedTemplate, setSelectedTemplate] = useState("");
  const [template_names, setTemplate_names] = useState([]);
  let [selectedStatus, setSelectedSatus] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [status_names, setStatus_names] = useState([]);
  let [startDate, setStartDate] = useState(null);
  let [endDate, setEndDate] = useState(null);

  // const pages = 20;
  const ip = IPConfig();

  useEffect(() => {
    axios
      .get(`${ip}/J8mQxPz9sG3vAeR5iW2hL6oU7tF1yK0D/status_names`, {
        headers: {
          Accept: "application/json"
        }
      })
      .then(response => {
        console.log("API Response:", response.data);
        const statusArray = response.data.status || [];
        setStatus_names(statusArray);
        console.log("status Names:", statusArray);
      })
      .catch(error => {
        console.error(error);
      });
  }, [ip]);

  useEffect(() => {
    axios
      .get(`${ip}/J8mQxPz9sG3vAeR5iW2hL6oU7tF1yK0D/template_names`, {
        headers: {
          Accept: "application/json"
        }
      })
      .then(response => {
        console.log("API Response:", response.data);
        const templatesArray = response.data.templates || [];
        setTemplate_names(templatesArray);
        console.log("Template Names:", templatesArray);
      })
      .catch(error => {
        console.error(error);
      });
  }, [ip]);

  console.log(template_names);

  useEffect(() => {
    axios
      .get(`${ip}/J8mQxPz9sG3vAeR5iW2hL6oU7tF1yK0D/${1}`, {
        headers: {
          Accept: "application/json"
        }
      })
      .then(response => {
        console.log(response);
        setTable(response.data.clients);
        setNumberOfPage(response.data.pagination.total_pages);
        console.log(
          `${ip}/static/${response.data.user_folder}/images/${response.data.table}`
        );
      })
      .catch(error => {
        console.error(error);
      });
  }, [ip]);

  const formatStartDate = inputDate => {
    //add one day to the input date
    const date = new Date(inputDate);
    date.setDate(date.getDate() + 1);
    // const dateObj = new Date(inputDate);
    const formattedDate = date.toISOString().slice(0, 10).replace("T", " "); // Format as "yyyy-mm-dd hh:mm:ss"
    return formattedDate;
  };

  const formatEndDate = inputDate => {
    //add one day to the input date
    const date = new Date(inputDate);
    date.setDate(date.getDate());
    // const dateObj = new Date(inputDate);
    const formattedDate = date.toISOString().slice(0, 10).replace("T", " "); // Format as "yyyy-mm-dd hh:mm:ss"
    return formattedDate;
  };

  const formatJumpDate = inputDate => {
    const dateObj = new Date(inputDate);
    // format date from Fri, 09 Feb 2024 14:00:00 GMT to 2024-02-09 14:00:00
    const formattedDate = dateObj
      .toISOString()
      .replace("GMT", " ")
      .replace("Z", "")
      .replace("T", " ")
      .slice(0, 19);
    return formattedDate;
  };
  const dateChange = selectedDates => {
    if (selectedDates && selectedDates.length === 2) {
      const [start, end] = selectedDates;
      setStartDate(start);
      setEndDate(end);
      console.log(formatStartDate(start), formatEndDate(end));
      setCalendarIsOpen(false);
    }
  };

  const closeModal = () => {
    setCalendarIsOpen(false);
    setModalIsOpen(false);
  };

  const fetchDataWithPost = async pageNumber => {
    try {
      if (startDate === null || endDate === null) {
        startDate = "All";
        endDate = "All";
      } else {
        startDate = formatStartDate(startDate);
        endDate = formatEndDate(endDate);
      }

      if (selectedTemplate === null || selectedTemplate === "") {
        selectedTemplate = "All";
      }

      if (selectedStatus === null || selectedStatus === "") {
        selectedStatus = "All";
      }

      if (searchQuery === null || searchQuery === "") {
        searchQuery = "All";
      }

      const queryParams = `start_date=${startDate}&end_date=${endDate}&status=${selectedStatus}&template=${selectedTemplate}&search=${searchQuery}&page=${pageNumber}`;
      const apiUrl = `${ip}/J8mQxPz9sG3vAeR5iW2hL6oU7tF1yK0D/filter/${queryParams}`;

      const response = await axios.post(
        apiUrl,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      console.log("API Response:", response.status);
      console.log(response.data);

      setTable(response.data.clients);
      setNumberOfPage(response.data.pagination.total_pages);
    } catch (error) {
      //create a popup to show the error
      console.error("Request error:", error.request);
      // setShowPurchaseMessage(true);
      // setErrorMessage("No records found matching criterias.");
      setModalIsOpen(true);

      console.error(error);
    }
  };
  const handleClosePurchaseMessage = () => {
    setShowPurchaseMessage(false);
  };
  const handleTemplateChange = e => {
    console.log(e);
    setSelectedTemplate(e);
  };

  const handlestatusChange = e => {
    console.log(e);
    setSelectedSatus(e);
  };

  useEffect(() => {
    fetchDataWithPost(currentButton);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentButton,
    selectedTemplate,
    selectedStatus,
    startDate,
    endDate,
    searchQuery
  ]);

  useEffect(() => {
    const buttons = [];
    const threshold = 2;

    if (numberOfpage <= 5) {
      for (let i = 1; i <= numberOfpage; i++) {
        buttons.push(i);
      }
    } else {
      if (currentButton <= threshold + 1) {
        buttons.push(
          ...Array.from({ length: threshold + 1 }, (_, i) => i + 1),
          "...",
          numberOfpage
        );
      } else if (currentButton >= numberOfpage - threshold) {
        buttons.push(
          1,
          "...",
          ...Array.from(
            { length: threshold + 1 },
            (_, i) => numberOfpage - threshold + i
          ),
          numberOfpage
        );
      } else {
        buttons.push(
          1,
          "...",
          ...Array.from(
            { length: threshold * 2 + 1 },
            (_, i) => currentButton - threshold + i
          ),
          "...",
          numberOfpage
        );
      }
    }

    setArrOfCurrButtons(buttons);
  }, [currentButton, numberOfpage]);

  const getClientInitials = clientName => {
    const initials = clientName
      .split(" ")
      .map(word => word.charAt(0))
      .join("");
    return initials.toUpperCase();
  };
  return (
    <main id="table">
      <div className="table-container">
        {showPurchaseMessage && (
          <RecordsMessageModal onClose={handleClosePurchaseMessage} />
        )}
        {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        style={customStyles}
        className={`modal-error Modal`}
      >
        <h2 className="error-heading">Fillter Error</h2>
        <p className="error-content">{errorMessage}</p>
        <button onClick={closeModal}>Return</button>
      </Modal> */}
        <ReactModal
          isOpen={calendarIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="RegisterModal"
          className={`Modal`}
          ariaHideApp={false}
        >
          <Calendar
            selectRange={true}
            onChange={e => dateChange(e)}
            className={customStyles.calendarContainer}
          />
        </ReactModal>

        <div className="flex-input">
          <div className="input-container">
            <IconSearch className="search-icon" />
            <input
              className="input-search"
              type="text"
              placeholder="Search clients"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex-input-tertiary">
            <input
              placeholder="Pick date range"
              className="date"
              value={
                startDate && endDate
                  ? `${formatStartDate(startDate)} - ${formatEndDate(endDate)}`
                  : ""
              }
              onClick={() => setCalendarIsOpen(true)}
              readOnly
            />

            <select
              className="select"
              value={selectedStatus}
              onChange={e => handlestatusChange(e.target.value)}
            >
              <option value="">All</option>
              {status_names.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              hidden={true}
              className="select"
              value={selectedTemplate}
              onChange={e => handleTemplateChange(e.target.value)}
            >
              <option value="">Select the template</option>
              {template_names.map(templates => (
                <option key={templates} value={templates}>
                  {templates}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr className="header">
                <th>CLIENT</th>
                <th>TEMPLATE</th>
                <th>STATUS</th>
                <th>JUMP NUMBER</th>
                <th>JUMP DATE</th>
                <th>SHARE LINK</th>
                <th>PURCHASED</th>
              </tr>
            </thead>
            <tbody>
              {table &&
                table.map((client, index) => (
                  <tr key={index} className="table-row">
                    <td className="first-column">
                      <div className="flex-initial">
                        <div className="initials-circle">
                          <span className="initials">
                            {getClientInitials(
                              client.name + " " + client.surname
                            )}
                          </span>
                        </div>
                        <div>
                          <div className="cursor">
                            {client.name} {client.surname}
                          </div>
                          {client.email}{" "}
                        </div>
                      </div>
                    </td>
                    <td>{client.template}</td>
                    <td className="third-column">
                      {" "}
                      <p>{client.status}</p>
                    </td>
                    <td>{client.jump_number}</td>
                    <td>{formatJumpDate(client.jump_date)} </td>
                    <td>
                      <a
                        href={`${ip}/client_portal${client.share_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Link
                      </a>
                    </td>
                    <td>
                      {client.purchased === true ? <Checks /> : <Cross />}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="container-pagination">
          <div className="pagination-container">
            <button
              onClick={() => setCurrentButton(1)}
              disabled={currentButton === 1}
            >
              {"<<"}
            </button>
            <button
              onClick={() => setCurrentButton(currentButton - 1)}
              disabled={currentButton === 1}
            >
              {"<"}
            </button>
            {arrOfCurrButtons.map((buttonValue, index) => (
              <button
                key={index}
                onClick={() => {
                  if (buttonValue !== "...") {
                    setCurrentButton(buttonValue);
                  }
                }}
                className={currentButton === buttonValue ? "active" : ""}
                disabled={buttonValue === "..."}
              >
                {buttonValue}
              </button>
            ))}
            <button
              onClick={() => setCurrentButton(currentButton + 1)}
              disabled={currentButton === numberOfpage}
            >
              {">"}
            </button>
            <button
              onClick={() => setCurrentButton(numberOfpage)}
              disabled={currentButton === numberOfpage}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Table;
