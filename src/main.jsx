import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebLayout from "./layouts/WebLayout";
import Home from "./pages/Home";
import Unpurchased from "./pages/Unpurchased";
import CheckOut from "./pages/CheckOut";
import Purchased from "./pages/Purchased";
import Report from "./pages/Report";
import Table from "./components/Table";
import "./scss/partials/navbar.scss";
import "./scss/partials/bottomNav.scss";
import "./scss/pages/Unpurchased.scss";
import "./scss/pages/CheckOut.scss";
import "./scss/pages/Purchased.scss";
import "./scss/pages/home.scss"
import "./scss/pages/Table.scss";
import "./scss/pages/Report.scss";
import "./scss/pages/PurchaseMessageModal.scss";
import "./scss/pages/RecordsErrorModal.scss";
import "./scss/pages/UnpurchasedMessageModal.scss";
import "./scss/pages/imageModel.scss";
import "./styles/main.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route element={<WebLayout />}>
        {/* <Route path="/client_portal/" element={<Home/>} /> */}
        <Route path="" element={<Unpurchased />} />
        <Route path="/client_portal/checkout/:userid" element={<CheckOut />} />
        <Route path="/client_portal/purchased" element={<Purchased />} />
        <Route path="/client_portal/table" element={<Table />} />
        <Route path="/client_portal/report" element={<Report />} />
      </Route>
    </Routes>
  </Router>
);
