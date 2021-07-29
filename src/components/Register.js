import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { isEmail } from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import "./assets/Login.css"

import Navbar from './Navbar';

import "./assets/Login.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Email invalid !
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Username required 2-20 characters !!
      </div>
    );
  }
};

const vfullname = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Fullname required 2-50 characters !!
      </div>
    );
  }
};

const vaddress = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Address required 3-20 characters !!
      </div>
    );
  }
};

const vphone = (value) => {
  var pattern = /^$|[0-9]{10}/;
  if (!pattern.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        The phone invalid !
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Password required 3-20 characters !!
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangeaddress = this.onChangeaddress.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.onChangefullName = this.onChangefullName.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangeusername = this.onChangeusername.bind(this);
    this.createAccount = this.createAccount.bind(this);

    this.state = {
      password: "",
      address: "",
      phone: "",
      fullname: "",
      email: "",
      username: "",
    };
  }
  onChangeusername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeemail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangephone(e) {
    this.setState({
      phone: e.target.value,
    });
  }
  onChangefullName(e) {
    this.setState({
      fullname: e.target.value,
    });
  }
  onChangepassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeaddress(e) {
    this.setState({
      address: e.target.value,
    });
  }
  createAccount(e) {
    e.preventDefault();
    var Account = {
      username: this.state.username,
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      phone: this.state.phone,
    };
    console.log(Account);
    axios.post("http://localhost:9999/BookStore/auth/signup", Account)
    .then(response => {
      if (response.status === 200) {
          console.log(response);
          alert("Register Success!");
      }else{
        console.log(response);
      }
  })
  .catch((err) => {
    console.log(err);
    alert(err.response.data.message);
  });
    return Account;
  }

  render() {
    return (
      <>
      <Navbar/>
      <Form class="login">
        <div class="login-screen">
          <div class="app-title">
            <h1>Register</h1>
          </div>
          <div class="control-group">
            <Input
              type="text"
              placeholder="Enter username"
              name="username"
              class="login-field"
              id="login-name"
              value={this.state.username}
              onChange={this.onChangeusername}
              validations={[required, vusername]}
            />
            <label class="login-field-icon fui-user" for="login-name"></label>
          </div>
          <div class="control-group">
            <Input
              type="text"
              placeholder="Enter Fullname"
              name="fullname"
              class="login-field"
              id="full-name"
              value={this.state.fullName}
              onChange={this.onChangefullName}
              validations={[required, vfullname]}
            />
            <label class="login-field-icon fui-user" for="full-name"></label>
          </div>
          <div class="control-group">
            <Input
              type="text"
              placeholder="Enter Email"
              name="email"
              class="login-field"
              id="reg-email"
              value={this.state.email}
              onChange={this.onChangeemail}
              validations={[required, vemail]}
            />
            <label class="login-field-icon fui-user" for="reg-email"></label>
          </div>
          <div class="control-group">
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              class="login-field"
              id="reg-pass"
              value={this.state.password}
              onChange={this.onChangepassword}
              validations={[required, vpassword]}
            />
            <label class="login-field-icon fui-user" for="reg-pass"></label>
          </div>
          <div class="control-group">
            <Input
              type="text"
              placeholder="Enter phone"
              name="phone"
              class="login-field"
              id="reg-phone"
              value={this.state.phone}
              onChange={this.onChangephone}
              validations={[required, vphone]}
            />
            <label class="login-field-icon fui-user" for="reg-phone"></label>
          </div>
          <div class="control-group">
            <Input
              type="text"
              placeholder="Enter address"
              name="address"
              class="login-field"
              id="reg-address"
              value={this.state.address}
              onChange={this.onChangeaddress}
              validations={[required, vaddress]}
            />
            <label class="login-field-icon fui-user" for="reg-address"></label>
          </div>
          <Input
            class="btn btn-primary"
            onClick={this.createAccount}
            type="submit"
            value="Register"
          />
          Already have an account ? <Link to="/login">Login</Link>
        </div>
      </Form>
      </>
    );
  }
}
