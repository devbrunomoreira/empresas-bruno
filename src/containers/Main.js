import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logoIoasys from '../assets/imgs/logo-nav.png'
import icLupa from '../assets/imgs/ic-search.svg'
import icClose from '../assets/imgs/ic-close.svg'
import icEnterprise from '../assets/imgs/img-e-1-lista.svg'
import Card from '../components/Card'
import CardBig from '../components/CardBig'
import '../assets/styles/Main.scss'
import json from '../mock.json'
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSearching: false,
            search: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch() {
        this.setState({ isSearching: !this.state.isSearching });
    }
    takeInfoSearch(event) {
        this.setState({ search: event.target.value })
    }
    render() {
        return (
            <div className="site">
                <div className="top">
                    {!this.state.isSearching ? (
                        <>
                            <div />
                            <img src={logoIoasys} className="logoIoasys" alt="logo" />
                            <img src={icLupa} className="icLupa" alt="lupa" onClick={this.handleSearch} />
                        </>
                    ) : (
                            <>
                                <div className="searchForm">
                                    <div className="searchInput">
                                        <img src={icLupa} className="icLupaSearch" alt="lupa" />
                                        <input id="search" type="text" placeholder="Pesquisar" />
                                    </div>
                                    <img src={icClose} className="icClose" alt="fechar" onClick={this.handleSearch} />
                                </div>
                            </>
                        )}
                </div>
                <div className="body">
                    {!this.state.isSearching ? (
                        <div className="body_field">Clique na busca para iniciar</div>
                    ) : (
                            <>
                                {json.enterprises.map(enterprise => (
                                        <Link className="body_field--link" to={'/maincard/'+ enterprise.id} > 
                                        <Card 
                                        imgEnterprise={icEnterprise} 
                                        nameEnterprise={enterprise.enterprise_name} 
                                        typeEnterprise={enterprise.enterprise_type.enterprise_type_name} 
                                        locationEnterprise={enterprise.country}
                                        key={enterprise.id} />
                                     </Link>
                                 ))}
                            </>
                        )}
                </div>
            </div>
        )
    }
}

export default Main