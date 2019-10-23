import React, { Component } from 'react'
import logoIoasys from './imgs/logo-nav.png'
import icBack from './imgs/icBack.png'
import icClose from './imgs/ic-close.svg'
import icEnterprise from './imgs/img-e-1-lista.svg'
import json from './mock.json'
import CardBig from './components/CardBig'
import './styles/MainBigCard.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class MainBigCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSearching: false,
            idCard: this.props.match.params.id
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch() {
        if (this.state.isSearching) {
            this.setState({ isSearching: false })
        } else {
            this.setState({ isSearching: true })
        }
    }
    render() {
        let enterpriseFilter = json.enterprises.filter(enterprise => {
            return enterprise.id == this.state.idCard
        })
        return (
            <div className="site">
                <div className="topo">
                    {!this.state.isSearching ? (
                        <>
                            <Link className="icBack" to='/main'>
                            <img src={icBack} className="icBack" alt="voltar"  />
                            </Link>
                            <img src={logoIoasys} className="logoIoasys" alt="logo" />
                            <div />
                        </>
                    ) : (
                            <>
                                <div className="searchForm">
                                    <div className="searchInput">
                                        <img src={icBack} className="icLupaSearch" alt="lupa" />
                                        <input id="search" type="text" placeholder="Pesquisar" />
                                    </div>
                                    <img src={icClose} className="icClose" alt="fechar" onClick={this.handleSearch} />
                                </div>
                            </>
                        )}
                </div>
                        <div className="body">
                            <CardBig textEnterprise={enterpriseFilter[0].description} 
                             imgEnterpriseBig={icEnterprise} />
                        </div>
            </div>
        )
    }
}

export default MainBigCard