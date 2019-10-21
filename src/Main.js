import React, { Component } from 'react'
import logoIoasys from './imgs/logo-nav.png'
import icLupa from './imgs/ic-search.svg'
import icClose from './imgs/ic-close.svg'
import Card from './components/Card'
import ListEnterprise from './components/listEnterprise'
import './styles/Main.css'

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSearching: false,
            search: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(){
        if(this.state.isSearching){
            this.setState({isSearching: false})
        }else{
            this.setState({isSearching: true})
        }
    }
    takeInfoSearch(event){
        this.setState({search: event.target.value})
    }
    render(){
        return(
            <div className="site">
                <div className="topo">

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
                                    <img src={icLupa} className="icLupaSearch" alt="lupa"  />
                                    <input id="search" type="text" placeholder="Pesquisar" />
                                </div>
                                <img src={icClose} className="icClose" alt="fechar" onClick={this.handleSearch} />
                            </div>
                        </>
                    )}          
                </div>
                <div className="body">
                    {!this.state.isSearching ? (
                        <p>Clique na busca para iniciar</p>
                    ) : (
                        <Card >
                            <ListEnterprise  nameEnterprise='Empresa 1' typeEnterprise='Negócio' locationEnterprise='Brasil' />
                        </Card>
                    ) }
                </div>
            </div>
        )
    }
}


export default Main