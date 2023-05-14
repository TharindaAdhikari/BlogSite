import React from "react";
import {Link} from "react-router-dom";
import Logo from "../img/logo.png"

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo"><img src={Logo} alt=""/></div>
                <div className="links">
                    <Link className="link" to="/?cat=africa">
                        <h6>AFRICA</h6>
                    </Link>
                    <Link className="link" to="/?cat=asia">
                        <h6>ASIA</h6>
                    </Link>
                    <Link className="link" to="/?cat=ausi">
                        <h6>AUSTRALIA</h6>
                    </Link>
                    <Link className="link" to="/?cat=europe">
                        <h6>EUROPE</h6>
                    </Link>
                    <Link className="link" to="/?cat=mieast">
                        <h6>MIDDLE EAST</h6>
                    </Link>
                    <Link className="link" to="/?cat=southa">
                        <h6>SOUTH AMERICA</h6>
                    </Link>
                    <span>John</span>
                    <span>Logut</span>
                    <span className="write">
                        <Link className="link" to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar 