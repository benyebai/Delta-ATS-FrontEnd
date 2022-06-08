import React from "react";
import "./editAbout.css"
import axios from "axios";

export class EditAbout extends React.Component {
    constructor(props) {
        super(props);


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

        this.handleTextChange = this.handleTextChange.bind(this);
        this.submitInfo = this.submitInfo.bind(this);
    }

    async componentDidMount(){
        await axios.post("http://localhost:3001", "username or token idk")
        .then((res) => {
            if(res.data == null){
                console.log("user does not exist")
            }
            else{
                this.setState(res.data);
            }
            
        })
        .catch((res) =>{
            console.log("couldnt contact server")
        })
        
        
    }

    async submitInfo(e){
        e.preventDefault();
        console.log("asd");

        await axios.post("http://localhost:3001", this.state)
        .then(res => {
            console.log("asd");
            window.location.assign("google.com");
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

    render() {
        return (
            <div>
                <form onSubmit={this.submitInfo} className="form">
                    <input
                        placeholder="email"
                        onChange={this.handleTextChange}
                        className="textbox"
                        id = "email" 
                        value = {this.state.email}
                    />
                    <br />

                    <input
                        placeholder="Password"
                        onChange={this.handleTextChange}
                        className="textbox"
                        id = "password" 
                        value = {this.state.password}
                    />
                    <br />

                    <input
                        placeholder="First Name"
                        onChange={this.handleTextChange}
                        className="textbox"
                        id = "firstName" 
                        value = {this.state.firstName}
                    />
                    <br />

                    <input
                        placeholder="Last Name"
                        onChange={this.handleTextChange}
                        className="textbox"
                        id = "lastName" 
                        value = {this.state.lastName}
                    />
                    <br />

                    <input
                        placeholder="Phone Number"
                        onChange={this.handleTextChange}
                        className="textbox"
                        id = "phoneNum" 
                        value = {this.state.phoneNum}
                    />
                    <br />

                    <input
                        placeholder="Country"
                        onChange={this.handleTextChange}
                        className="textbox"
                        id = "country" 
                        value = {this.state.country}
                    />
                    <br />
                    <input
                        placeholder="Province/State"
                        onChange={this.handleTextChange}
                        className="textbox"
                        id = "province" 
                        value = {this.state.province}
                    />
                    <br />
                    <input
                        placeholder="City"
                        onChange={this.handleTextChange}
                        className="textbox"
                        id = "city" 
                        value = {this.state.city}
                    />
                    <br />
                    <input
                        placeholder="Postal Code"
                        onChange={this.handleTextChange}
                        className="textbox"
                        id = "postalCode" 
                        value = {this.state.postalCode}
                    />
                    <br />

                    <input
                        placeholder="Address"
                        onChange={this.handleTextChange}
                        className="textbox"
                        id = "address"  b
                        value = {this.state.address}
                    />
                    <br />

                    <input
                        placeholder="Pronouns"
                        onChange={this.handleTextChange}
                        className="textbox"
                        id = "pronouns" 
                        value = {this.state.pronouns}
                    />
                    <br />

                    <button onClick = {this.submitInfo} className = "submitButton"><h1>Save Changes</h1></button>
                    
                </form>
            </div>
        );
    }
}