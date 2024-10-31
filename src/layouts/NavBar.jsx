import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../scss/partials/navbar.scss';
// import the logo png file
import logo from '../assets/navLogo.png';

export default function NavBar() {
    const handleReportClick = (e) => {
        console.log("Report button clicked");
        window.location.href = "/client_portal/report";
      };
    const location = useLocation();
    return (
        //hide nav bar on home page
        location.pathname === "/client_portal/" ? null :
        <div className="nav">
            
            {location.pathname === "/client_portal/table" && (
            <div className="nav-cont-table">
                <div className='child1'>
                {/* add logo image import */}
                <img className="image-nav-table" src={logo} alt="" />
                </div>
                <div className='child2'>
                <button className="btn-nav" onClick={() => handleReportClick()}>Report</button>
                </div>
            </div>
            )}
            {location.pathname !== "/client_portal/table" && (
                <div className="nav-cont">
                <img className="image-nav" src={logo} alt="" />
                </div>
            )}
            
        </div>
    );
}