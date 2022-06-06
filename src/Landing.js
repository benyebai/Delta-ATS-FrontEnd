import React from "react";
import "./Landing.css";
import { Image } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default class Landing extends React.Component {
  render() {
    //this is the stuff at the top of the entire landing page
    //just sort of made sense to make it an object of some sort so its easier to move around
    let topPart = (
      <div className="top-part">
        <div className="logo">
          <a href="https://deltacontrols.com/" className="logo-link">
            <Image src="./DeltaLogo.png" className="logo-img" />
          </a>
        </div>
        <div className="nav-buttons">
          <a href="https://www.google.com/" className="top-button text-button">
            Register
          </a>

          <a href="/submission" className="top-button text-button">
            Login
          </a>

          <a
            href="https://deltacontrols.com/about/"
            className="top-button text-button"
          >
            About
          </a>

          <a
            href="https://deltacontrols.com/contact-us/"
            className="top-button text-button"
          >
            Contact Us
          </a>
        </div>
      </div>
    );

    return (
      <div>
        {topPart}

        <div className="content">
          <div className="title-box">
            <h1 className="title">Catchphrase that's as long as this</h1>
          </div>
          <div className="divider" /> <div className="divider" />{" "}
          <div className>
            <p className="bottom-text">
              as an example: among the industries most <br />
              respected, Delta Controls offeres you the <br />
              coolest career path possible
            </p>
          </div>
          <button className="rounded-pill register">Apply Now</button>
        </div>
      </div>
    );
  }
}
