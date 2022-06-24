import React from "react";
import "./ProfilePage.css";
import axios from "axios";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Alert,
  Badge,
  Dropdown,
} from "react-bootstrap";
import Header from "../components/Header";
import { doesInfoWork } from "../registerForm/RegisterForm.js";
import { countries } from "../registerForm/allCountries";

export class ProfilePage extends React.Component {
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
      city: "Surrey",
      postalCode: "V4N0Z3",
      address: "56-16233 83 ave more stuff more stuff",

      changingEmail: false,
      changingContact: false,
      changingPass: false,
      failure: "",
      failWhere: 0,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.buttonPress = this.buttonPress.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.render = this.render.bind(this);
  }

  async componentDidMount() {

    //get user info
    await axios
      .post("http://localhost:3001/users/userInfo", {
        token: window.sessionStorage.getItem("accessToken"),
      })
      .then((res) => {
        //reformat the info that you get from the server
        res.data.data[1][0].firstName = res.data.data[1][0]["first_name"];
        res.data.data[1][0].lastName = res.data.data[1][0]["last_name"];
        res.data.data[0][0].phoneNum = res.data.data[0][0]["phone_number"];
        res.data.data[0][0].postalCode = res.data.data[0][0]["postal_code"];
        this.setState(res.data.data[0][0]);
        this.setState(res.data.data[1][0]);
      })
      .catch((err) => {
        console.log("failed to connect to server try again later");
      });
  }

  handleTextChange(e) {
    let changed = e.target.id;
    this.setState({
      [changed]: e.target.value,
    });
  }

  handleCountryChange(e) {
    this.setState({ country: e });
  }

  async buttonPress(pressed) {
    if (this.state[pressed]) {
      let power = await this.handleSave(pressed);
      if (!power) {
        return;
      }
    }
    //change from edit to not edit or vice versa
    this.setState((prevState) => ({
      [pressed]: !prevState[pressed],
    }));
  }

  async handleSave(which) {

    //if we tried to save the email
    if (which === "changingEmail") {
      //format the stuff we want to change
      let toSend = {
        email: this.state.email,
      };

      //send info
      await axios
        .post("http://localhost:3001/modify", toSend)
        .then((res) => {
          if (res.data) {
            //if it worked, then remove the failure stuff
            this.setState({
              failure: "",
              failWhere: 0,
            });
          } else {
            //otherwise email is alredadu in use so ytou cant change it
            this.setState({
              failure: "Email already in use",
              failWhere: 1,
            });
          }
        })
        .catch((err) => {
          this.setState({
            failure: "Could not contact server, try again later",
            failWhere: 1,
          });
        });
    } else if (which === "changingContact") {
      //if were changing contact info, format the stuff we plan on sending
      let toSend = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNum: this.state.phoneNum,
        country: this.state.country,
        province: this.state.province,
        city: this.state.city,
        postalCode: this.state.postalCode,
        address: this.state.address,
      };
      //check if the info is properly formatted, such as phone num having all numbers
      let worked = doesInfoWork(toSend);

      if (worked !== "success") {
        this.setState({
          failure: worked,
          failWhere: 2,
        });
        return;
      }

      await axios
        .post("http://localhost:3001/modify", toSend)
        .then((res) => {
          if (res.data) {
            this.setState({
              failure: "",
              failWhere: 0,
              changingContact: false,
            });
          } 
        })

        .catch((err) => {
          console.log("asd");
          this.setState({
            failure: "Could not contact server, try again later",
            failWhere: 2,
          });
        });
    }
  }

  render() {
    let allInfo = [];
    //push stuff into the info we want to show on the right
    Object.keys(this.state).forEach((item) => {
      allInfo.push(<h1>{this.state[item]}</h1>);
    });

    let contactInfo = [
      "firstName",
      "lastName",
      "phoneNum",
      "country",
      "province",
      "city",
      "postalCode",
      "address",
    ];
    //this next list just contains the information in a more reader friendly way
    let contactInfoCooler = [
      "First Name",
      "Last Name",
      "Phone Number",
      "Country",
      "Province/State",
      "City",
      "Postal/Zip Code",
      "Address",
    ];
    let splits = [[], [], [], [], []]; // finished react objects go in here
    let currentSplit = 0;

    for (let i = 0; i < contactInfo.length; i++) {
      if (i === 3 || i === 5 || i === 7 || i === 8) {
        currentSplit += 1;
      }

      let current = contactInfo[i];
      let toPut = <h2 className="info-text">{this.state[current]}</h2>;

      if (this.state.changingContact) {
        if (current === "country") {
          let countryDropdown = [];

          for (let key in countries) {
            countryDropdown.push(
              <Dropdown.Item eventKey={countries[key]} key={key}>
                {countries[key]}
              </Dropdown.Item>
            );
          }

          toPut = (
            <Dropdown
              className="country-box"
              onSelect={this.handleCountryChange}
            >
              <Dropdown.Toggle
                bsPrefix="country-button"
                style={{
                  color: this.state.country === "" ? "#8d8d8d" : "black",
                }}
              >
                {this.state.country === "" ? "Country" : this.state.country}
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  overflowY: "scroll",
                  maxHeight: "50vh",
                  width: "100%",
                }}
              >
                {countryDropdown}
              </Dropdown.Menu>
            </Dropdown>
          );
        } else {
          toPut = (
            <input
              placeholder={contactInfoCooler[i]}
              type="text"
              size="100px"
              onChange={this.handleTextChange}
              id={current}
              value={this.state[current]}
              className="textform"
              style={{ height: "6vh", fontSize: "1.5vw" }}
            />
          );
        }
      }

      let piece = (
        <Col lg={true}>
          <div className={current + " generic-info"}>
            <h3 className="label-text">{contactInfoCooler[i]}</h3>
            {toPut}
          </div>
        </Col>
      );

      splits[currentSplit].push(piece);
    }

    //what the email thing will look like while editing
    let emailEditing = (
      <input
        placeholder="Email"
        type="text"
        size="100px"
        onChange={this.handleTextChange}
        id="email"
        value={this.state.email}
        className="textform"
      />
    );

    return (
      <div>
        <Header />
        <div className="profile-container">
          <div className="important-info">
            <Image
              src="https://assets.bonappetit.com/photos/57aca47753e63daf11a4d904/1:1/w_2807,h_2807,c_limit/watermelon-with-yogurt-and-fried-rosemary.jpg"
              fluid
              className="profile-pic"
              roundedCircle
            />
            <div className="email-info email-text">
              <div className="generic">
                <h3 className="label-text">Email</h3>
              </div>

              {this.state.changingEmail ? emailEditing : this.state.email}
            </div>
            <div className="change-buttons">
              <Button
                className="change-button"
                variant="danger"
                onClick={() => this.buttonPress("changing-email")}
              >
                {this.state.changingEmail ? "Save" : "Edit"}
              </Button>
              <span style={{ width: "2vmin" }}></span>
              <Button className="change-button" variant="danger">
                Change Password
              </Button>
            </div>
          </div>

          <div className="contact-info">
            <Container>
              <Row>{splits[0]}</Row>
              <Row>{splits[1]}</Row>
              <Row>{splits[2]}</Row>
              <Row>{splits[3]}</Row>
              <Row>
                <Alert
                  show={this.state.failWhere === 2}
                  variant="danger"
                  style={{ marginTop: "1vh" }}
                >
                  <Badge bg="" pill className="alert-badge">
                    !
                  </Badge>
                  {" " + this.state.failure}
                </Alert>
              </Row>
              <Row>
                <Button
                  variant="danger"
                  onClick={() => this.buttonPress("changingContact")}
                  className="change-button"
                >
                  {this.state.changingContact ? "Save" : "Edit"}
                </Button>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
