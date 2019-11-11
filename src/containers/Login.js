import React, { Component } from "react";
import logoIoasys from "../assets/imgs/logo-home.png";
import logoEmail from "../assets/imgs/ic-email.png";
import logoCadeado from "../assets/imgs/ic-cadeado.png";
import Api from "../services/api"
import { login } from '../services/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/styles/Login.scss";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      sendLogin: false
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
    let input = document.getElementById("password");
    input.addEventListener("keyup", (event) => {
      if (event.keyCode == 13 && this.state.sendLogin == false) {
        this.requestAccessToken();
        this.setState({ sendLogin: true});
      }
    });
  }
  requestAccessToken(email, password) {
    return Api.post(
        "/users/auth/sign_in",
        {
          email: this.state.email,
          password: this.state.password
        },
      )
      .then(response => {
        login(response.headers['access-token'], response.headers['client'], response.headers['uid']);
        this.props.history.push("/main");
      })
      .catch(error => {
        this.handleErrorMessage(error.message);
        this.setState({ sendLogin: false});
      });
  }
  handleErrorMessage(errorMessage){
    let errorMsg = '';
    if(errorMessage === 'Request failed with status code 401'){
      errorMsg = 'Usuário ou senha errado';
    }
    if(errorMessage === 'Network Error'){
      errorMsg = 'API fora do ar';
    }
    toast.error(errorMsg);
  }
  render() {
    return (
      <>
      <ToastContainer />
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
          <img src={logoEmail} className="icEmail" alt="Email"/>
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
          <img src={logoCadeado} className="icEmail" alt="Cadeado" />
          <input
            id="password"
            onChange={this.setDataPassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="Senha"
            onKeyUp={this.getEnter}
          />
        </div>
        <button id="buttonLogin" onClick={this.requestAccessToken}>
          Entrar
        </button>
      </div>
      </>
    );
  }
}

export default Login;
