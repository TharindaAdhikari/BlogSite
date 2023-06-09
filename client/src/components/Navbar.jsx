import React, { useContext } from "react";
import {Link} from "react-router-dom";
import Logo from "../img/logo.png"
import { AuthContext } from "../context/authContext";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to ="/">
                        <img src={Logo} alt=""/>
                    </Link>
                </div>
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

                    <h3><span>{currentUser?.username}</span> </h3>

                    {currentUser ? (
                        <span onClick={logout}>Logout</span>
                    ) : (
                        <Link className="link" to="/login">
                        Login
                        </Link>
                    )}
                    <span className="write">
                        <Link className="link" to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar 