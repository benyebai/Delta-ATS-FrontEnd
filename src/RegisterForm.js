import React from "react";
import Header from "./components/Header";
import Button from "react-bootstrap/Button";
import axios from "axios";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
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
          <input
            placeholder="Email"
            type="text"
            size="100px"
            onChange={this.handleEmailChange}
            className="textbox"
          />
          <br />

          <input
            placeholder="Password"
            type="password"
            onChange={this.handlePasswordChange}
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
