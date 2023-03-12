import React from 'react';

export class AddIntersectionButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);   
    }

    clickHandler() {
        let name = prompt("New Intersection Name:");
        
    }

    render() {
        
        return (<button type="button" onClick={this.clickHandler} >+</button>);
    }

};

export default AddIntersectionButton;
