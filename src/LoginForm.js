import React from "react";
import "./LoginForm.css";
import Header from "./components/Header";
import { Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import axios from "axios";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: { email: "", password: "" },
      isLogin: true,
    };

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

  render() {
    const handleToggle = (value) => {
      this.setState({ isLogin: value });
      console.log(this.state);
    };
    return (
      <div>
        <Header btn="Register" href="https://www.google.com/" />

        <form onSubmit={this.handleSubmit} className="form-area center">
          <ToggleButtonGroup
            type="radio"
            name="options"
            value={this.state.isLogin}
            className="options"
            onChange={handleToggle}
          >
            <ToggleButton id="option1" className="options" variant="outline-danger" size="xxl" value={true}>
              Login
            </ToggleButton>
            <ToggleButton id="option2" className="options" variant="outline-danger" size="xxl" value={false}>
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

          <div className="right-align">
            <a href="https://www.google.com/">Forgot My Password</a>
            <br />

            {/* This is using the pre-made button Components from Bootstrap */}
            <Button
              type="submit"
              variant="danger"
              onClick={this.handleSubmit}
              className="login-button right-align"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
