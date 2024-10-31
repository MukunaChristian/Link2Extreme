import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function BottomNav() {
  const [year] = useState(new Date().getFullYear());
  const [link] = useState("#");
  const location = useLocation();

  return (
    location.pathname === "/client_portal/" ? null :
    <div className="bottom-nav">
      <div className="botttom-image-nav">
        <div>
          <span> {year} &copy; </span>
          <a href={link} target="_blank" rel="noopener noreferrer">
            L2X
          </a>
        </div>
      </div>
    </div>
  );
}
