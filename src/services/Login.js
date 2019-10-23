import React, { Component } from "react";
import logoIoasys from "../imgs/logo-home.png";
import logoEmail from "../imgs/ic-email.png";
import logoCadeado from "../imgs/ic-cadeado.png";
import axios from "axios";
import "../styles/Login.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "testeapple@ioasys.com.br",
      password: "12341234",
      token: ""
    };
    this.setDataLogin = this.setDataLogin.bind(this);
    this.setDataPassword = this.setDataPassword.bind(this);
    this.requestAccessToken = this.requestAccessToken.bind(this);
  }

  setDataLogin(event) {
    this.setState({ email: event.target.value });
  }
  setDataPassword(event) {
    this.setState({ password: event.target.value });
  }

  requestAccessToken(email, password) {
    console.log(this.state);
    return axios
      .post(
        "https://empresas.ioasys.com.br/api/v1/users/auth/sign_in",
        {
          email: this.state.email,
          password: this.state.password
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(response => {
        console.log(response);
        this.setState({ token: response.token });
        localStorage.setItem("userToken", response.token);
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
          <div className="divLogo">
            <img src={logoIoasys} className="App-logo" alt="logo" />
          </div>
          <div className="divContent">
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
            class="form-control"
            name="email"
            placeholder="Email"
          />
        </div>

        <div id="passwordForm">
          <img src={logoCadeado} className="icEmail" />
          <input
            id="password"
            onChange={this.setDataPassword}
            type="text"
            class="form-control"
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
