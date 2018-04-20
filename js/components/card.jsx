import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            descr: this.props.descr
         }
    }
    render() { 
        return ( 
            <div style={{
                backgroundColor: 'white',
                marginBottom: 10,
                marginTop: 10,
                padding: 10
            }}>
                <div className="cardDescr">
                    {this.state.descr}
                </div>
            </div>
         )
    }
}
 
export default Card;