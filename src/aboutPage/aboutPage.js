import React from "react";
import "./aboutPage.css";
import axios from "axios";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import Header from "../components/Header";

export class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        //state will be updated in component did mount, where we get info from database
        this.state = {
            email: "throwtehcheasdasdsd@gmail.com",
            password: "password123",
            firstName: "Thomas",
            lastName: "Zheng",
            phoneNum: "7786969696",
            country: "Canada",
            province: "British Columbia",
            city:"New Westminster",
            postalCode:"V4N0Z3",
            address: "56-16233 83 ave more stuff more stuff",

            changingEmail : false,
            changingContact: false,
            changingPass: false,
        }
        
        this.handleTextChange = this.handleTextChange.bind(this);
        this.buttonPress = this.buttonPress.bind(this);
        
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

    handleTextChange(e) {
        let changed = e.target.id;
        this.setState({
            [changed]:e.target.value
        });
    }

    buttonPress(pressed){
        console.log(this.state)
        this.setState((prevState) => ({
            [pressed] : !prevState[pressed]
        }));
    }

    render() {
        let allInfo = [];
        Object.keys(this.state).forEach(item => {
            allInfo.push(<h1>{this.state[item]}</h1>);
        });

        let contactInfo = ["firstName", "lastName", "phoneNum", "country", "province", "city", "postalCode", "address"];
        //this next list just contains the information in a more reader friendly way
        let contactInfoCooler = ["First Name", "Last Name", "Phone Number", "Country", "Province/State", "City", "Postal/Zip Code", "Address", ];
        let splits = [[],[],[],[],[]] // finished react objects go in here
        let finished = []
        let currentSplit = 0;
        for (let i = 0; i < contactInfo.length; i++){
            if(i == 3 || i == 5 || i == 7 ||i == 8){
                currentSplit += 1;
            }

            let current = contactInfo[i];
            let piece = ( 
            <Col lg = {true}>
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

        //what the email thing will look like while editing
        let emailEditing = (
            <div>
                <input
                    placeholder="Email"
                    type="text"
                    size="100px"
                    onChange={this.handleChange}
                    id="email"
                    value = {this.state.email}
                />
            </div>
        );

        return (
            <div>
                <Header />
                <div className = "profileContainer">
                    <div className = "important-info">
                        <Image 
                        src = "https://assets.bonappetit.com/photos/57aca47753e63daf11a4d904/1:1/w_2807,h_2807,c_limit/watermelon-with-yogurt-and-fried-rosemary.jpg" 
                        fluid
                        className="profile-pic"
                        roundedCircle
                        />
                        <div className="emailInfo emailText">
                            <div className = "generic"> 
                                <h3 className="labelText">
                                    Email
                                </h3>
                            </div>

                            {this.state.changingEmail ? emailEditing : this.state.email}
                            
                        </div>
                        <div className = "changeButtons">
                            <Button className = "changeButton Email" variant="danger" onClick = {() => (this.buttonPress("changingEmail"))}>
                                Edit
                            </Button>
                            <Button className="changeButton Password" variant = "danger">
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
                            <Row>
                                message when you fail
                            </Row>
                            <Row>                            
                            <Button variant="danger">
                                Edit
                            </Button>
                        </Row>
                        </Container>

                    </div>
                </div>
            </div>
        );
    }
}