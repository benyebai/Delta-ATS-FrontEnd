import React from "react";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import axios from "axios";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    // ensure JSON object exists
    if (this.props.info == null) {
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
    };

    // ensure JSON contains all the info
    if (this.info.email == null || this.info.password == null) {
      window.location.href = "/submission";
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    let toSend = this.state;
    // reformat the info we want to send here
    // meaning remove non-numbers on phonenumbers
    // lowercase everything in country and city and province
    // capitalize everything on postal code
    toSend["country"] = toSend["country"].toLowerCase();
    toSend["city"] = toSend["city"].toLowerCase();
    toSend["province"] = toSend["province"].toLowerCase();

    toSend["postalCode"] = toSend["postalCode"].toUpperCase();

    toSend["phoneNum"] = toSend["phoneNum"].replace(/\D/g, "");

    // adding info that should exist
    toSend.email = this.info.email;
    toSend.password = this.info.password;

    console.log(toSend);

    await axios
      .post("http://localhost:3001/users/create", toSend)
      .then((res) => {
        console.log("Success, a new account has been created");
      })
      .catch((err) => {
        console.log(
          "An error occured when creating the account. Please try again later."
        );
      });
  }

  render() {
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
          <input
            placeholder="Country"
            type="text"
            id="country"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <br />
          <input
            placeholder="Province/State"
            type="text"
            id="province"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <br />

          <input
            placeholder="City"
            type="text"
            id="city"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <input
            placeholder="Postal Code"
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
