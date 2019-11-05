import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logoIoasys from '../assets/imgs/logo-nav.png'
import icBack from '../assets/imgs/icBack.png'
import icClose from '../assets/imgs/ic-close.svg'
import icEnterprise from '../assets/imgs/img-e-1-lista.svg'
import CardBig from '../components/CardBig'
import '../assets/styles/MainBigCard.scss'
import axios from 'axios'

class MainBigCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idCard: this.props.match.params.id,
            enterpriseName: '',
            enterpriseText: '',
            imgEnterprise: ''
        };
    }
    componentDidMount(){
        axios.get(
            "https://empresas.ioasys.com.br/api/v1/enterprises/" + this.state.idCard,
            { headers: { "Content-Type": "application/json",
            "access-token": localStorage.getItem("userToken"),
            "client": localStorage.getItem("userClient"),
            'uid': localStorage.getItem("userID") } }
          )
          .then(response => {
            this.setState({ enterpriseName: response.data.enterprise.enterprise_name ,
                            enterpriseText: response.data.enterprise.description,
                            imgEnterprise: response.data.enterprise.photo})
          })
          .catch(function(error) {
            console.error(
              "There has been a problem with your fetch operation: " + error
            );
          });
    }
    render() {
        return (
            <div className="site">
                <div className="topMain">
                    <Link className="icBack" to='/main'>
                        <img src={icBack} className="icBack" alt="voltar"  />
                    </Link>
                        <img src={logoIoasys} className="logoIoasys" alt="logo" />
                </div>
                <div className="body" >
                    <div className="bigCard">
                        <CardBig textEnterprise={this.state.enterpriseText} 
                            imgEnterpriseBig={icEnterprise} />
                    </div>
                </div>
            </div>
        )
    }
}

export default MainBigCard