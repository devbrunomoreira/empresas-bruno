import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logoIoasys from '../assets/imgs/logo-nav.png'
import icLupa from '../assets/imgs/ic-search.svg'
import icClose from '../assets/imgs/ic-close.svg'
import icEnterprise from '../assets/imgs/img-e-1-lista.svg'
import icLogout from '../assets/imgs/logout.svg'
import Card from '../components/Card'
import Api from '../services/api'
import { logout } from '../services/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/Main.scss'

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
        this.handleSearchAPI = this.handleSearchAPI.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleSearch() {
        this.setState({ isSearching: !this.state.isSearching, 
                        search: '' });
        this.checkDirtyData();
    }
    handleSearchClose() {
        this.setState({ isSearching: !this.state.isSearching, 
                        search: '',
                     dirtyData: true});
        
        this.checkDirtyData();
    }
    checkDirtyData(){
        if(this.state.dirtyData === true){
            this.getAllData();
        }
    }
    takeInfoSearch(event) {
        this.setState({ search: event.target.value });
    }
    componentDidMount(){
        this.getAllData();
    }
    getAllData() {
        Api.get(
            "/enterprises",
            { headers: { "access-token": localStorage.getItem("userToken"),
            "client": localStorage.getItem("userClient"),
            'uid': localStorage.getItem("userID") } }
          )
          .then(response => {
            this.setState({ enterpriseList: response.data.enterprises})
          })
          .catch(function(error) {
            toast.error(error.message)
          });
    }
    handleSearchAPI(){
        let textInput = document.getElementById('search');
        let timeout = null;
        textInput.onkeyup = (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() =>  {
           Api.get(
                "enterprises?&name=" + textInput.value,
                { headers: { "access-token": localStorage.getItem("userToken"),
                "client": localStorage.getItem("userClient"),
                'uid': localStorage.getItem("userID") } }
              )
              .then(response => {
                this.setState({enterpriseList: response.data.enterprises});
              })
              .catch(function(error) {
                toast.error(error.message)
              });
        }, 1000);
        };
    }
    handleLogout() {
        logout();
        this.props.history.push("/")
    }
    render() {
        return (
            <div className="site">
            <ToastContainer />
                <div className="top">
                    {!this.state.isSearching ? (
                        <>
                        <div className="top__field"> 
                            <div className="top__field--logout" >
                                <img src={icLogout} className="icLogout" alt="logout" onClick={this.handleLogout} />
                            </div>
                            <div className="top__field--logo" >
                                <img src={logoIoasys} className="logoIoasys" alt="logo" />
                            </div>
                            <div className="top__field--search">
                                <img src={icLupa} className="icLupa" alt="lupa" onClick={this.handleSearch} />
                            </div>
                        </div>
                        </>
                    ) : (
                            <>
                                <div className="searchForm">
                                    <div className="searchForm__field">
                                        <img src={icLupa} className="icLupaSearch" alt="lupa" />
                                        <input id="search" onFocus={this.handleSearchAPI} type="text" placeholder="Pesquisar" onChange={this.takeInfoSearch} />
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