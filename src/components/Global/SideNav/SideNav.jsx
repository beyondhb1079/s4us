import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style/sideNav.css";

export default class SideNav extends Component {
  render() {
    return (
        <div id="slide-out" className="sidenav">
           <div className="navtop">
             <button className="right waves-effect waves-light navbtn sidenav-close">close</button>
             <h3 className="menutitle">Menu</h3>
           </div>
            <ul className="navList">
              <li className="item">
                  <Link className="menuitem sidenav-close" to="/">
                    <i className="material-icons white-text">home</i>home
                  </Link>
              </li>
              <li className="item">
                  <Link className="menuitem sidenav-close" to="/profile">
                    <i className="material-icons white-text">face</i>profile
                  </Link>
              </li>
              <li className="item">
                  <Link className="menuitem sidenav-close" to="/scholarships">
                    <i className="material-icons white-text">school</i>scholaships
                  </Link>
            </li>
            </ul>
        </div>
    );
  }
}

