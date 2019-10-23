import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../styles/Card.css'
class Card extends Component {  
    render() {
        return (
            <div className="card">
                <img src={this.props.imgEnterprise} className="imgEnterpriseList"/>
                <div className="infoEnterprise" >
                    <div className="titleEnterprise">{this.props.nameEnterprise}</div>
                    <div className="typeEnterprise">{this.props.typeEnterprise}</div>
                    <div className="locationEnterprise">{this.props.locationEnterprise}</div>
                </div>
            </div>
        );
    }
}

export default Card;
