import React, { Component } from 'react'
import logoIoasys from './imgs/logo-nav.png'
import icLupa from './imgs/ic-search.svg'
import './styles/Main.css'

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSearching: false
        };
        this.handleLupa = this.handleLupa.bind(this);
    }

    handleLupa(){
        this.setState({isSearching: true})
    }

    render(){
        return(
            <div className="topo">

                {!this.state.isSearching ? (
                    <>
                        <div />
                        
                        <img src={logoIoasys} className="logoIoasys" alt="logo" />
        
                        <img src={icLupa} className="icLupa" alt="lupa" onClick={this.handleLupa.bind(this)} />
                    </>
                ) : (
                    <>
                        <div className="searchForm">
                            <img src={icLupa} className="icLupaSearch" alt="lupa"  />
                            <input id="search" type="text" placeholder="Pesquisar" />
                        </div>
                    </>
                )}
                
            </div>
        )
    }




}


export default Main