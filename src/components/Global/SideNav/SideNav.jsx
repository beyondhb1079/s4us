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
                  <Link className="menuitem" to="/">
                    <i className="material-icons">home</i>home
                  </Link>
              </li>
              <li className="item">
                  <Link className="menuitem" to="/profile">
                    <i className="material-icons">face</i>profile
                  </Link>
              </li>
              <li className="item">
                  <Link className="menuitem" to="/scholarships">
                    <i className="material-icons">school</i>scholaships
                  </Link>
            </li>
            </ul>
        </div>
    );
  }
}

