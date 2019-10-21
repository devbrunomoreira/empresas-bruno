import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../styles/Card.css'
class Card extends Component {  

  render() {
    return (
        <div className="card">
            {this.props.children} 
        </div>
    );
  
 
}
}

export default Card;
