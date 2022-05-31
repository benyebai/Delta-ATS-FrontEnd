import React from "react";
import "./aboutPage.css";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";

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
            country: "Canada",
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

        let contactInfo = ["firstName", "lastName", "pronouns", "country", "province", "city", "postalCode", "phoneNum", "address"];
        //this next list just contains the information in a more reader friendly way
        let contactInfoCooler = ["First Name", "Last Name", "Pronouns" , "Country", "Province/State", "City", "Postal Code", "Phone Number", "Address", ];
        let splits = [[],[],[],[]] // finished react objects go in here
        let finished = []
        let currentSplit = 0;
        for (let i = 0; i < contactInfo.length; i++){
            if(i == 3 || i == 6 || i == 8){
                currentSplit += 1;
            }

            let current = contactInfo[i];
            let piece = ( 
            <Col>
                <div className={current + " genericInfo"}>
                    <h3 className="labelText">
                        {contactInfoCooler[i]}
                    </h3>
                    <h2 className = "infoText">
                        {this.state[current]}
                    </h2>
                </div>
            </Col>
            );

            splits[currentSplit].push(piece);
        }

        return (
            <div>
                <div className = "importantInfo">
                    <div className="genericInfo">
                        <div className = "generic"> 
                            <h3 className="labelText">
                                Email
                            </h3>
                        </div>

                        <h2 className = "infoText">
                            {this.state.email}
                        </h2>
                    </div>
                    <div className = "changeButtons">
                        <Button className = "changeButton Email">
                            Edit
                        </Button>
                        <Button className="changeButton Password">
                            Change Password
                        </Button>
                    </div>
                </div>

                <div className = "contactInfo">
                    <Container>
                        <Row>
                            {splits[0]}
                        </Row>
                        <Row>
                            {splits[1]}
                        </Row>
                        <Row>
                            {splits[2]}
                        </Row>
                        <Row>
                            {splits[3]}
                        </Row>
                    </Container>
                    <Button>
                        Edit
                    </Button>
                </div>
            </div>
        );
    }
}