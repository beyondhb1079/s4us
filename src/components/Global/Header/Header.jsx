import React, { Component } from "react";

import "./style/header.css";

const logo = process.env.PUBLIC_URL + '/assets/logo/school';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
          <nav>
              <div className="nav-wrapper blue-grey darken-4">
                  <ul className="left">
                     <li>
                      <button data-target="slide-out" className="btn-flat btn-floating sidenav-trigger"><i className="material-icons">menu</i></button>
                      </li>
                      <li>
                      <a alt="HomePage" href="/" className="brand-logo">
                          <img src={`${logo}.png`} alt="iDream" className="logo"></img>
                          iDream</a>
                      </li>
                  </ul>
                  <ul className="right">
                      <li>
                          <button data-target="right-sidebar-nav" className="btn-flat btn-floating sidenav-trigger">
                              <i className="material-icons">add_alert</i></button>
                      </li>
                  </ul>
              </div>
          </nav>
      </div>
    );
  }
}
