import React from "react";
import "./Landing.css";
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Landing extends React.Component {
  render() {
    //this is the stuff at the top of the entire landing page
    //just sort of made sense to make it an object of some sort so its easier to move around
    let topPart = (
      <div className="top-part" tabIndex="-1">
        <div className="logo">
          <a href="https://deltacontrols.com/" className="logo-link">
            <Image src="./DeltaLogo.png" className="logo-img" />
          </a>
        </div>
        <div className="nav-buttons">
          <Link to="/submission">
            <Button variant="danger" size="lg" className="login">
              Login | Register
            </Button>
          </Link>

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
          <div className="bottom-text-box">
            <p className="bottom-text">
              As an example: among the industries most <br />
              respected, Delta Controls offers you the <br />
              coolest career path possible
            </p>
          </div>
          <Button variant="danger" size="lg" className="register">
            Apply Now
          </Button>
        </div>
      </div>
    );
  }
}
