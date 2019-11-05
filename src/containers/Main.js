import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logoIoasys from '../assets/imgs/logo-nav.png'
import icLupa from '../assets/imgs/ic-search.svg'
import icClose from '../assets/imgs/ic-close.svg'
import icEnterprise from '../assets/imgs/img-e-1-lista.svg'
import Card from '../components/Card'
import '../assets/styles/Main.scss'
import axios from 'axios'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSearching: false,
            search: '',
            enterpriseList: []
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch() {
        this.setState({ isSearching: !this.state.isSearching, 
                        search: '' });
        this.handleContentSearch()
    }
    takeInfoSearch(event) {
        this.setState({ search: event.target.value })
    }
    handleContentSearch(){
        axios.get(
            "https://empresas.ioasys.com.br/api/v1/enterprises",
            { headers: { "Content-Type": "application/json",
            "access-token": localStorage.getItem("userToken"),
            "client": localStorage.getItem("userClient"),
            'uid': localStorage.getItem("userID") } }
          )
          .then(response => {
            this.setState({ enterpriseList: response.data.enterprises})
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
                <div className="top">
                    {!this.state.isSearching ? (
                        <>
                        <div className="top__field"> 
                            <img src={logoIoasys} className="logoIoasys" alt="logo" />
                        </div>
                            <div className="top__field--search">
                                <img src={icLupa} className="icLupa" alt="lupa" onClick={this.handleSearch} />
                            </div>
                        </>
                    ) : (
                            <>
                                <div className="searchForm">
                                    <div className="searchForm__field">
                                        <img src={icLupa} className="icLupaSearch" alt="lupa" />
                                        <input id="search" type="text" placeholder="Pesquisar" onChange={this.takeInfoSearch.bind(this)} />
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
                        this.state.enterpriseList.filter((item)=>(
                            item.enterprise_name.toUpperCase().includes(this.state.search.toUpperCase())
                        )).map(enterprise => (
                                <Link key={enterprise.id} className="body_field--link" to={'/maincard/'+ enterprise.id} > 
                                <Card 
                                
                                 imgEnterprise={icEnterprise} 
                                 nameEnterprise={enterprise.enterprise_name} 
                                 typeEnterprise={enterprise.enterprise_type.enterprise_type_name} 
                                 locationEnterprise={enterprise.country}
                                 key={enterprise.id} />
                                </Link>
                        ))    
                        )}
                </div>
            </div>
        )
    }
}

export default Main