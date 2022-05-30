import React from "react";
import "./Header.css";
import { Image } from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };

    this.topBar = (
      <div>
        <div className="banner-grey">
          <a href="/">
            <Image
              src="/DeltaLogoModified.png"
              className="logo-img-modified"
            />
          </a>
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
