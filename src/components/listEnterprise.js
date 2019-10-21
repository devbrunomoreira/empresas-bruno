import React, { Component } from 'react'

class ListEnterprise extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
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

export default ListEnterprise;