import React from "react";
import "./aboutPage.css";
import axios from "axios";

export class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        //state will be updated in component did mount, where we get info from database
        this.state = {
            email: "cool@gmail.com",
            password: "password123",
            firstName: "Thomas",
            lastName: "Zheng",
            phoneNum: "7786969696",
            country: "canada",
            province: "British Columbia",
            city:"Surrey",
            postalCode:"V4N0Z3",
            address: "Address",
            pronouns:"He/Him"
        }
        
        //temporary, will be passed down in props later
        //likely like an id so sorta looks like 109458738
        //this.props.user = "75937591";
    }

    async componentDidMount(){
        await axios.post("http://localhost:3001/getUser", this.props.user)
        .then(res => {
            console.log("asd");
        })
        .catch(err => {
            console.log("this failed try again later");
        })
    }

    render() {
        let allInfo = [];
        Object.keys(this.state).forEach(item => {
            allInfo.push(<h1>{this.state[item]}</h1>);
        });
        return (
            <div>
                {allInfo}
            </div>
        );
    }
}