import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import { RegisterForm } from "./registerForm/RegisterForm";
import LoginForm from "./LoginForm";

export class RegisterLog extends React.Component {
    constructor(props){
        super(props);

        this.info = window.sessionStorage.getItem("registerInfo");
        if(this.info != null){
            this.info = window.sessionStorage.getItem("registerInfo");
        }

        this.register = this.register.bind(this);
    }

    register(info){
        let toSet = {
            "email" : info.email,
            "password": info.password
        }
        toSet = toSet.stringify()
        window.sessionStorage.setItem("registerInfo", toSet);
    }

    render(){
        return (
            <div>
                <Routes>
                    <Route path = "/register" element={<RegisterForm info = {this.info} />} />
                    <Route path="/" element={<LoginForm register = {this.register} />} />
                </Routes>
            </div>
        );
    }
}
