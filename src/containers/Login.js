import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import logoIoasys from "../assets/imgs/logo-home.png";
import logoEmail from "../assets/imgs/ic-email.png";
import logoCadeado from "../assets/imgs/ic-cadeado.png";
import axios from "axios";
import "../assets/styles/Login.scss";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.setDataLogin = this.setDataLogin.bind(this);
    this.setDataPassword = this.setDataPassword.bind(this);
    this.requestAccessToken = this.requestAccessToken.bind(this);
    this.getEnter = this.getEnter.bind(this);
  }
  setDataLogin(event) {
    this.setState({ email: event.target.value });
  }
  setDataPassword(event) {
    this.setState({ password: event.target.value });
  }
  getEnter(event){
    this.setDataPassword(event)
    let input = document.getElementById("password");
    input.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        this.requestAccessToken()
      }
    });
  }
  requestAccessToken(email, password) {
    return axios.post(
        "https://empresas.ioasys.com.br/api/v1/users/auth/sign_in",
        {
          email: this.state.email,
          password: this.state.password
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(response => {
        localStorage.setItem("userToken", response.headers['access-token']);
        localStorage.setItem("userClient", response.headers['client'])
        localStorage.setItem("userID", response.headers['uid'])

        this.props.history.push("/main")
      })
      .catch(function(error) {
        console.error(
          "There has been a big problem with your fetch operation: " + error
        );
      });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-header__field">
            <img src={logoIoasys} className="App-logo" alt="logo" />
          </div>
          <div className="App-header__field--content">
            <h2>BEM-VINDO AO EMPRESAS</h2>
            <p>
              Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc
              accumsan.
            </p>
          </div>
        </div>
        <div id="emailForm">
          <img src={logoEmail} className="icEmail" />
          <input
            id="email"
            onChange={this.setDataLogin}
            type="text"
            className="form-control"
            name="email"
            placeholder="Email"
          />
        </div>
        <div id="passwordForm">
          <img src={logoCadeado} className="icEmail" />
          <input
            id="password"
            onChange={this.getEnter}
            type="password"
            className="form-control"
            name="password"
            placeholder="Senha"
          />
        </div>
        <button id="buttonLogin" onClick={this.requestAccessToken}>
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
