import React,{Component} from 'react';
import '../assets/styles/CardBig.scss'
class CardBig extends Component {  
    render() {
        return (
            <div className="cardBig">
                <div className="cardBig__field" >
                    <img src={this.props.imgEnterpriseBig} className="imgEnterpriseListBig" alt="imgEnterpriseListBig"/>
                    <div className="cardBig__field--text">{this.props.textEnterprise}</div>
                </div>
            </div>
        );
    }
}

export default CardBig;