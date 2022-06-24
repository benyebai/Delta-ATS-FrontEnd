import React from "react";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Alert, Badge, Dropdown } from "react-bootstrap";
import { countries } from "./allCountries.js";
import "./RegisterForm.css";

/*
 * Second step to registration process
 * Lets user input rest of information
 */
export function doesInfoWork(info) {
  let toSend = info;
  if (toSend.firstName === "" || toSend.lastName === "") {
    return "Please enter in a Full Name";
  }
  if (toSend.country === "") {
    return "Please enter in a country";
  }
  if (toSend.province === "") {
    return "Please enter in a Province/State";
  }
  if (toSend.city === "") {
    return "Please enter in a city";
  }
  if (toSend.postalCode === "") {
    return "Please enter in a Postal Code";
  }
  if (toSend.address === "") {
    return "Please enter an address";
  }
  if (toSend.phoneNum === "") {
    return "Please enter in a phone number";
  }
  if (!/^\d+$/.test(toSend.phoneNum)) {
    return "Please input only numbers for the phone number";
  }

  let failedZip = false;
  let code = toSend.postalCode;
  console.log(toSend.country);
  if (toSend.country === "Canada") {
    if (code.length < 6) {
      failedZip = true;
    }
    if (code.length > 7) {
      failedZip = true;
    }

    if (code.length > 6) {
      code = code.slice(0, 3) + code.slice(4, 7);
    }

    for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        if (!code.slice(i, i + 1).match("[a-zA-Z]+")) {
          failedZip = true;
          break;
        }
      } else if (i % 2 === 1) {
        if (isNaN(code.slice(i, i + 1))) {
          failedZip = true;
          break;
        }
      }
    }
  } else if (toSend.country === "United States") {
    if (code.length === 10) {
      failedZip = true;
      // Its either 11111-1111
      // Or 1111-11111
      // As in 5-4 or 4-5

      // This means first four
      let fFour = code.slice(0, 4);
      let fifth = code.slice(4, 5);
      let lFive = code.slice(5, 10);

      let fFive = code.slice(0, 5);
      let sixth = code.slice(5, 6);
      let lFour = code.slice(6, 10);

      if (/^\d+$/.test(fFour) && fifth === "-" && /^\d+$/.test(lFive)) {
        //youre good, do nothing
        failedZip = false;
      } else if (/^\d+$/.test(fFive) && sixth === "-" && /^\d+$/.test(lFour)) {
        //youre good, do nothing
        failedZip = false;
      } else {
        failedZip = true;
      }
    } else {
      failedZip = true;
    }
  }

  if (failedZip) {
    return "Please input a valid Postal/Zip code";
  }

  return "success";
}

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    // ensure JSON object exists
    if (!this.props.info) {
      window.location.href = "/submission";
    }

    this.info = JSON.parse(this.props.info);
    this.state = {
      firstName: "",
      lastName: "",
      country: "",
      province: "",
      city: "",
      postalCode: "",
      address: "",
      phoneNum: "",

      countryColor: "#8d8d8d",
      failure: "",
    };

    // ensure JSON contains all the info
    if (!this.info.email && !this.info.password) {
      window.location.href = "/submission";
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
  }

  handleTextChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleCountryChange(e) {
    this.setState({ country: e, province: "" });
  }

  handleProvinceChange(e) {
    console.log("asd");
    this.setState({ province: e });
  }

  async handleSubmit(e) {
    e.preventDefault();

    let toSend = this.state;

    let infoWorks = doesInfoWork(toSend);
    if (infoWorks !== "success") {
      this.setState({ failure: infoWorks });
      return;
    }

    // adding info that should exist
    toSend.email = this.info.email;
    toSend.password = this.info.password;

    console.log(toSend);

    await axios
      .post("http://localhost:3001/users/create", toSend)
      .then((res) => {
        window.sessionStorage.setItem("accessToken", res.data.accessToken);
        window.location.href = "/profile";
      })
      .catch((err) => {
        console.log("ERR");
        console.log(err.response.data.errors);
        console.log(
          "An error occured when creating the account. Please try again later."
        );
      });
  }

  render() {
    let countryDropdown = [];
    let provinceDropdown = [];
    let stateDropdown = [];
    let allCountries = [];
    for (let key in countries) {
      allCountries.push(countries[key]);
    }

    let allStates = [
      "Alabama",
      "Alaska",
      "American Samoa",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District of Columbia",
      "Federated States of Micronesia",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Marshall Islands",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Northern Mariana Islands",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Palau",
      "Pennsylvania",
      "Puerto Rico",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virgin Island",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ];
    let allProvinces = [
      "Alberta",
      "British Columbia",
      "Manitoba",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Northwest Territories",
      "Nova Scotia",
      "Nunavut",
      "Ontario",
      "Prince Edward Island",
      "Quebec",
      "Saskatchewan",
      "Yukon Territory",
    ];

    for (let i = 0; i < allCountries.length; i++) {
      countryDropdown.push(
        <Dropdown.Item eventKey={allCountries[i]}>
          {allCountries[i]}
        </Dropdown.Item>
      );
    }

    for (let i = 0; i < allStates.length; i++) {
      stateDropdown.push(
        <Dropdown.Item eventKey={allStates[i]}>{allStates[i]}</Dropdown.Item>
      );
    }

    for (let i = 0; i < allProvinces.length; i++) {
      provinceDropdown.push(
        <Dropdown.Item eventKey={allProvinces[i]}>
          {allProvinces[i]}
        </Dropdown.Item>
      );
    }

    let provinceObj = (
      <div>
        <input
          placeholder="Province/State"
          type="text"
          id="province"
          onChange={this.handleTextChange}
          className="textbox"
        />
      </div>
    );

    if (this.state.country === "Canada") {
      provinceObj = (
        <Dropdown className="country-box" onSelect={this.handleProvinceChange}>
          <Dropdown.Toggle
            bsPrefix="country-button"
            style={{ color: this.state.province === "" ? "#8d8d8d" : "black" }}
          >
            {this.state.province === "" ? "Province" : this.state.province}
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ overflowY: "scroll", maxHeight: "50vh", width: "100%" }}
          >
            {provinceDropdown}
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    if (this.state.country === "United States") {
      provinceObj = (
        <Dropdown className="country-box" onSelect={this.handleProvinceChange}>
          <Dropdown.Toggle
            bsPrefix="country-button"
            style={{ color: this.state.province === "" ? "#8d8d8d" : "black" }}
          >
            {this.state.province === "" ? "State" : this.state.province}
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ overflowY: "scroll", maxHeight: "50vh", width: "100%" }}
          >
            {stateDropdown}
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return (
      <div>
        <Header btn="Login" href="/submission" />

        <form onSubmit={this.handleSubmit} className="form-area center">
          <h1>
            <b>Add Contact Info</b>
          </h1>

          <input
            placeholder="First Name"
            type="text"
            id="firstName"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <br />
          <input
            placeholder="Last Name"
            type="text"
            id="lastName"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <br />
          <br />

          <Dropdown className="country-box" onSelect={this.handleCountryChange}>
            <Dropdown.Toggle
              bsPrefix="country-button"
              style={{ color: this.state.country === "" ? "#8d8d8d" : "black" }}
            >
              {this.state.country === "" ? "Country" : this.state.country}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ overflowY: "scroll", maxHeight: "50vh", width: "100%" }}
            >
              {countryDropdown}
            </Dropdown.Menu>
          </Dropdown>

          {provinceObj}

          <input
            placeholder="City"
            type="text"
            id="city"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <input
            placeholder="Postal/Zip Code"
            type="text"
            id="postalCode"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <br />

          <input
            placeholder="Address"
            type="text"
            id="address"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <br />

          <input
            placeholder="Phone Number"
            type="text"
            id="phoneNum"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <br />

          <Alert
            show={this.state.failure !== ""}
            variant="danger"
            style={{ marginTop: "1vh" }}
          >
            <Badge bg="" pill className="alert-badge">
              !
            </Badge>
            {" " + this.state.failure}
          </Alert>

          <div className="right-align">
            {/* This is using the pre-made button Components from Bootstrap */}
            <Button
              type="submit"
              variant="danger"
              onClick={this.handleSubmit}
              className="login-button"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
