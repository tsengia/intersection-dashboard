import React from 'react';

import { API } from "@aws-amplify/api";
import { addIntersection } from './graphql/mutations.ts';

export class AddIntersectionButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        let name = prompt("New Intersection Name:");
        API.graphql({
            query: addIntersection,
            variables: {
                "name": name
            }
        }).then((result) => {
            console.log(result.data.intersectionList);
            this.setState({ intersections: result.data.intersectionList });
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (<button type="button" onClick={this.clickHandler} >+</button>);
    }

};

export default AddIntersectionButton;
