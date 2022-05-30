import React from "react";
import "./LoginForm.css";
import Header from "./components/Header";
import { Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import axios from "axios";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      isLogin: true,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleContinue.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
  }

  // TODO: Merge handle change functions
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  async handleLogin(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/users/authenticate", this.state)
      .then((res) => {
        if (res.data.length > 0) {
          alert("success");
        } else {
          alert("password and email not matching");
        }
      })
      .catch((err) => {
        console.log("error");
      });
  }

  //TODO?: Prevent invalid emails
  async handleContinue(e) {
    e.preventDefault();
    console.log("continue");

    await axios
      .post("http://localhost:3001/users/checkEmail", this.state.email)
      .then((res) => {
        if (!res) {
          alert("Email is already taken");
        }
      })
      .catch((err) => {
        console.log("error");
      });

      if(!this.state.password.localeCompare(this.state.confirmPassword) == 0) {
        alert("Confirm Password is not the same as password");
      }
  }

  render() {
    const handleToggle = (value) => {
      this.setState({ isLogin: value });
    };
    return (
      <div>
        <Header />

        <form
          onSubmit={this.state.isLogin ? this.handleLogin : this.handleContinue}
          className="form-area center"
        >
          <ToggleButtonGroup
            type="radio"
            name="options"
            value={this.state.isLogin}
            className="options"
            onChange={handleToggle}
          >
            <ToggleButton
              id="option1"
              className="options"
              variant="outline-danger"
              size="xxl"
              value={true}
            >
              Login
            </ToggleButton>
            <ToggleButton
              id="option2"
              className="options"
              variant="outline-danger"
              size="xxl"
              value={false}
            >
              Register
            </ToggleButton>
          </ToggleButtonGroup>
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

          {!this.state.isLogin && (
            <div>
              <input
                placeholder="Confirm Password"
                type="password"
                onChange={this.handleConfirmPasswordChange}
                className="textbox"
              />
              <br />
            </div>
          )}

          <div className="right-align">
            {this.state.isLogin && (
              <a href="https://www.google.com/">Forgot My Password</a>
            )}
            <br />

            {/* This is using the pre-made button Components from Bootstrap */}

            <Button
              type="submit"
              variant="danger"
              onClick={
                this.state.isLogin ? this.handleLogin : this.handleContinue
              }
              className="login-button right-align"
            >
              {this.state.isLogin ? "Login" : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
