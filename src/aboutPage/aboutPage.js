import React from "react";
import "./aboutPage.css";
import axios from "axios";
import { Button } from "react-bootstrap";

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
    
    }

    async componentDidMount(){
        await axios.post("http://localhost:3001/getUser", this.props.user)
        .then(res => {
            console.log("asd");
            this.setState(res.data);
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

        let contactInfo = ["firstName", "lastName", "country", "province", "city", "postalCode", "address", "pronouns","phoneNum"];
        //this next list just contains the information in a more reader friendly way
        let contactInfoCooler = ["First Name", "Last Name", "Country", "Province/State", "City", "Postal Code", "Address", "Pronouns", "Phone Number"];
        let finishedInfo = []; // put finished react objects in here
        for (let i = 0; i < contactInfo.length; i++){
            let current = contactInfo[i];

            let piece = (
            <div className={current + " genericInfo"}>
                <h3 className="labelText">
                    {contactInfoCooler[i]}
                </h3>
                <h2 className = "infoText">
                    {this.state[current]}
                </h2>
            </div>
            );

            finishedInfo.push(piece);
        }

        return (
            <div>
                <div className = "importantInfo">
                    <div className="genericInfo">
                        <div className = "email"> 
                            <h3 className="labelText">
                                Email
                            </h3>
                        </div>

                        <h2 className = "infoText">
                            {this.state.email}
                        </h2>

                        <Button className = "changeEmail">
                            Edit
                        </Button>
                    </div>
                    <Button>
                        change password
                    </Button>
                </div>

                <div className = "Contact Info">
                    {finishedInfo}
                    <Button>
                        Edit
                    </Button>
                </div>
            </div>
        );
    }
}