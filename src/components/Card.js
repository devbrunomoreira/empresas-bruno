import React,{Component} from 'react';
import '../assets/styles/Card.scss'
class Card extends Component {  
    render() {
        return (
            <div className="card">
                <img src={this.props.imgEnterprise} className="imgEnterpriseList" alt="imgEnterpriseList"/>
                <div className="card__field" >
                    <div className="card__field--name">{this.props.nameEnterprise}</div>
                    <div className="card__field--type">{this.props.typeEnterprise}</div>
                    <div className="card__field--location">{this.props.locationEnterprise}</div>
                </div>
            </div>
        );
    }
}

export default Card;
