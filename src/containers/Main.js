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
            enterpriseList: [],
            dirtyData: false
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchClose = this.handleSearchClose.bind(this);
        this.takeInfoSearch = this.takeInfoSearch.bind(this);
    }
    handleSearch() {
        this.setState({ isSearching: !this.state.isSearching, 
                        search: '' });
        this.checkDirtyData()
    }
    handleSearchClose() {
        this.setState({ isSearching: !this.state.isSearching, 
                        search: '',
                     dirtyData: true});
        
        this.checkDirtyData()
    }
    checkDirtyData(){
        if(this.state.dirtyData === true){
            this.getAllData()
        }
    }
    takeInfoSearch(event) {
        this.setState({ search: event.target.value })
    }
    componentDidMount(){
        this.getAllData()
    }
    getAllData() {
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
    handleSearchAPI(){
        let textInput = document.getElementById('search');
        let timeout = null;
        textInput.onkeyup = (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() =>  {
            axios.get(
                "https://empresas.ioasys.com.br/api/v1/enterprises?&name=" + textInput.value,
                { headers: { "Content-Type": "application/json",
                "access-token": localStorage.getItem("userToken"),
                "client": localStorage.getItem("userClient"),
                'uid': localStorage.getItem("userID") } }
              )
              .then(response => {
                this.setState({enterpriseList: response.data.enterprises})
              })
              .catch(function(error) {
                console.error(
                  "There has been a huge problem with your fetch operation: " + error
                );
              });
        }, 1000);
        };
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
                                        <input id="search" onFocus={this.handleSearchAPI.bind(this)} type="text" placeholder="Pesquisar" onChange={this.takeInfoSearch} />
                                    </div>
                                    <img src={icClose} className="icClose" alt="fechar" onClick={this.handleSearchClose} />
                                </div>
                            </>
                        )}
                </div>
                <div className="body">
                    {!this.state.isSearching ? (
                        <div className="body_field">Clique na busca para iniciar</div>
                    ) : (
                        this.state.enterpriseList.map(enterprise => (
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