import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import logoIoasys from '../assets/imgs/logo-nav.png'
import icBack from '../assets/imgs/icBack.png'
import icEnterprise from '../assets/imgs/img-e-1-lista.svg'
import CardBig from '../components/CardBig'
import '../assets/styles/MainBigCard.scss'
import Api from '../services/api'
import {TOKEN_KEY , USER_CLIENT, USER_ID} from '../services/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        Api.get(
            "/enterprises/" + this.state.idCard,
            { headers: { "Content-Type": "application/json",
            "access-token": localStorage.getItem(TOKEN_KEY),
            "client": localStorage.getItem(USER_CLIENT),
            'uid': localStorage.getItem(USER_ID) } }
          )
          .then(response => {
            this.setState({ enterpriseName: response.data.enterprise.enterprise_name ,
                            enterpriseText: response.data.enterprise.description,
                            imgEnterprise: response.data.enterprise.photo})
          })
          .catch(function(error) {
            toast.error(error.message);
          });
    }
    render() {
        return (
            <div className="site">
                <ToastContainer />
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