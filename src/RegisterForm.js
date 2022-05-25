import React from "react";
import Header from "./components/Header";
import Button from "react-bootstrap/Button";
import axios from "axios";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);
  }

  async handleSubmit(e) {
    e.preventDefault();

    await axios
      .post("http://localhost:3001", this.state)
      .then((res) => {
        console.log("worked");
      })
      .catch((err) => {
        console.log("password and email not matching");
      });

    //alert("Email: " + this.state.email + ", Password: " + this.state.password);
  }

  render() {
    return (
      <div>
        <Header btn="Login" href="/login" />

        <form onSubmit={this.handleSubmit} className="form-area center">
          <h1>
            <b>Register Account</b>
          </h1>
          <br />
          <input
            placeholder="Email"
            type="text"
            id="email"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <br />

          <input
            placeholder="Password"
            type="password"
            id="password"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <br />
          <br />

          <input
            placeholder="First Name"
            type="first-name"
            id="firstName"
            onChange={this.handleTextChange}
            className="textbox"
          />
          <br />

          <input
            placeholder="Last Name"
            type="last name"
            id="lastName"
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
              className="rounded-pill login-button"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
