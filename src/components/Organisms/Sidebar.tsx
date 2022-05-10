import React from "react";
import { SidebarProps } from "../../types/props";

export default function Sidebar({ data }: SidebarProps) {
  return (
    <div className="msb" id="msb">
      <nav className="navbar navbar-default" role="navigation">
        <div className="navbar-header">
          <div className="brand-wrapper">
            <div className="brand-name-wrapper">
              <a className="navbar-brand" href="#">
                SAITAMA
              </a>
            </div>
          </div>
        </div>
        <div className="side-menu-container">
          <ul className="nav navbar-nav">
            <li>
              <a href="#">
                <i className="fa fa-dashboard"></i> Dashboard
              </a>
            </li>
            <li className="active">
              <a href="#">
                <i className="fa fa-puzzle-piece"></i> Components
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-heart"></i> Extras
              </a>
            </li>
            <li className="panel panel-default" id="dropdown">
              <a data-toggle="collapse" href="#dropdown-lvl1">
                <i className="fa fa-diamond"></i> Apps
                <span className="caret"></span>
              </a>
              <div id="dropdown-lvl1" className="panel-collapse collapse">
                <div className="panel-body">
                  <ul className="nav navbar-nav">
                    <li>
                      <a href="#">Mail</a>
                    </li>
                    <li>
                      <a href="#">Calendar</a>
                    </li>
                    <li>
                      <a href="#">Ecommerce</a>
                    </li>
                    <li>
                      <a href="#">User</a>
                    </li>
                    <li>
                      <a href="#">Social</a>
                    </li>
                    <li className="panel panel-default" id="dropdown">
                      <a data-toggle="collapse" href="#dropdown-lvl2">
                        <i className="glyphicon glyphicon-off"></i> Sub Level{" "}
                        <span className="caret"></span>
                      </a>
                      <div
                        id="dropdown-lvl2"
                        className="panel-collapse collapse"
                      >
                        <div className="panel-body">
                          <ul className="nav navbar-nav">
                            <li>
                              <a href="#">Link</a>
                            </li>
                            <li>
                              <a href="#">Link</a>
                            </li>
                            <li>
                              <a href="#">Link</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <a href="#">
                <span className="glyphicon glyphicon-signal"></span> Link
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
