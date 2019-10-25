import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logoIoasys from '../assets/imgs/logo-nav.png'
import icBack from '../assets/imgs/icBack.png'
import icClose from '../assets/imgs/ic-close.svg'
import icEnterprise from '../assets/imgs/img-e-1-lista.svg'
import json from '../mock.json'
import CardBig from '../components/CardBig'
import '../assets/styles/MainBigCard.scss'

class MainBigCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idCard: this.props.match.params.id
        };
    }
    render() {
        let enterpriseFilter = json.enterprises.find(enterprise => {
            return enterprise.id == this.state.idCard
        })
        return (
            <div className="site">
                <div className="topMain">
                    <Link className="icBack" to='/main'>
                        <img src={icBack} className="icBack" alt="voltar"  />
                    </Link>
                        <img src={logoIoasys} className="logoIoasys" alt="logo" />
                        <div />
                </div>
                <div className="body" >
                    <div className="bigCard">
                        <CardBig textEnterprise={enterpriseFilter.description} 
                            imgEnterpriseBig={icEnterprise} />
                    </div>
                </div>
            </div>
        )
    }
}

export default MainBigCard