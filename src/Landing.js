import React from "react";
import "./Landing.css";
import { Image } from "react-bootstrap";

export default class Landing extends React.Component {
  render() {
    //this is the stuff at the top of the entire landing page
    //just sort of made sense to make it an object of some sort so its easier to move around
    let topPart = (
      <div className="topPart">
        <div className="logo">
          <a href="https://deltacontrols.com/" className="logoLink">
            <Image src="./DeltaLogo.png" className="logoImg" />
          </a>
        </div>
        <div className="navButtons">
          <a href="https://www.google.com/" className="topButton textButton">
            Register
          </a>

          <a href="/submission" className="topButton textButton">
            Login
          </a>

          <a
            href="https://deltacontrols.com/about/"
            className="topButton textButton"
          >
            About
          </a>

          <a
            href="https://deltacontrols.com/contact-us/"
            className="topButton textButton"
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
          <div className="titleBox">
            <h1 className="title">Catchphrase that's as long as this</h1>
          </div>
          <div className="divider" /> <div className="divider" />{" "}
          <div className="divider" />
          <div className="textBox">
            <p className="bottomText">
              as an example: among the industries most <br />
              respected, Delta Controls offeres you the <br />
              coolest career path possible
            </p>
          </div>
          <button className="register rounded-pill">Apply Now</button>
        </div>
      </div>
    );
  }
}
