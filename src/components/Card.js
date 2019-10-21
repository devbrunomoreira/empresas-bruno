import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Card extends Component {  

  render() {
    return (
        <div className="card">
            <img src={this.props.imgEnterprise} />
            <div className="infoEnterprise" >
                <p>{this.props.nameEnterprise}</p>
                <p>{this.props.typeEnterprise}</p>
                <p>{this.props.locationEnterprise}</p>
            </div>
            
        </div>
    );
  
 
}
}

export default Card;
