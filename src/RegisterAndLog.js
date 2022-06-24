import React from "react";
import { Routes, Route } from "react-router-dom";
import { RegisterForm } from "./registerForm/RegisterForm";
import LoginForm from "./loginForm/LoginForm";

/*
 * Component that handles the change from login to register
 */
export class RegisterLog extends React.Component {
  constructor(props) {
    super(props);

    this.info = window.sessionStorage.getItem("registerInfo");

    this.callbackEmailPassword = this.callbackEmailPassword.bind(this);
  }

  callbackEmailPassword(info) {
    let toSet = {
      email: info.email,
      password: info.password,
    };
    toSet = JSON.stringify(toSet);
    window.sessionStorage.setItem("registerInfo", toSet);
  }

  render() {
    return (
      <div>
        <Routes>
          <Route path="/register" element={<RegisterForm info={this.info} />} />
          <Route
            path="/"
            element={
              <LoginForm callbackEmailPassword={this.callbackEmailPassword} />
            }
          />
        </Routes>
      </div>
    );
  }
}
