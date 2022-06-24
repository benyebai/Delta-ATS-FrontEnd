import React from "react";
import "./Header.css";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

/*
 * Header component that displays the red and grey gradients
 *
 * Takes in text and link address as props
 */
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };

    this.topBar = (
      <div>
        <div className="banner-grey">
          <Link to="/">
            <Image src="/DeltaLogoModified.png" className="logo-img-modified" />
          </Link>
          <a href={props.href} className="nav-button">
            {props.btn}
          </a>
        </div>
        <div className="banner-red"></div>
      </div>
    );
  }

  render() {
    return <div>{this.topBar}</div>;
  }
}

export default Header;
