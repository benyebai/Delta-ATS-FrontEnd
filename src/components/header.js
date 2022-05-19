import React from "react";
import "./Header.css"
import { Image } from 'react-bootstrap';


class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = { email: "", password: "" };

        this.topBar = (
            <div>
                <div className="banner-grey">
                    <Image src="./DeltaLogo.png" className="logoImg" onClick={() => { window.location.href = "https://deltacontrols.com/"; }} />
                    <a href={props.href} className="nav-button">{props.btn}</a>
                </div>
                <div className="banner-red">
                </div>
            </div >
        );
    }

    render() {
        return (<div>{this.topBar}</div>)
    }
}

export default Header;