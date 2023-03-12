import React, { useState, useEffect } from "react";
import { API } from "@aws-amplify/api"
import { intersectionList } from "./graphql/queries.ts";

import aws_settings from "./aws-exports.js"

import AddIntersectionButton from "./AddIntersectionButton.js";
import { IntersectionComponent } from "./Intersection.js";

class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = { intersections: [] };
    }

    componentDidMount() {
        API.configure(aws_settings);

        API.graphql( {
            query: intersectionList
        }).then((result) => {
            console.log(result.data.intersectionList);
            this.setState({ intersections: result.data.intersectionList });
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        let intersectionComponents = [];

        let j = 0;
        for (let i of this.state.intersections) {
            intersectionComponents.push(<IntersectionComponent 
                    key={j} id={j}
                    intersection={i} 
                    />);
            j++;
        }

        return (
            <div className="dashboard-container" >
                <div id="top-bar" >
                    Top Bar
                </div>
    
                <div className="traffic-light-control-group" >
                    {intersectionComponents}
                </div>

                <div className="debug-group" >
                    <AddIntersectionButton api={this.api} />
                </div> 
            </div>
        );
    }

}

export default DashboardComponent;
