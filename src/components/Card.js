import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Card extends Component {
  render() {
    return (
        <div>
            <img src={this.props.imgEnterprise} />
            
        </div>
    );
  
 
}
}

export default Card;
