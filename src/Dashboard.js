import React from "react";
import { API } from "@aws-amplify/api"
import { intersectionList } from "./graphql/queries.ts";

import aws_settings from "./aws-exports.js"

import AddIntersectionButton from "./AddIntersectionButton.js";
import { IntersectionComponent } from "./Intersection.js";

class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = { intersections: [] };

        this.deleteIntersection = this.deleteIntersection.bind(this);
    }

    componentDidMount() {
        API.configure(aws_settings);

        API.graphql( {
            query: intersectionList
        }).then((result) => {
            console.log(result.data.intersectionList);
            let intersection_name_map = {};
            for (let i of result.data.intersectionList) {
                intersection_name_map[i.name] = i;
            }
            this.setState({ intersections: intersection_name_map });
        }).catch((error) => {
            console.error(error);
        });
    }

    deleteIntersection(intersectionComponent) {
        console.log(intersectionComponent.state.name);

    }

    render() {
        let intersectionComponents = [];

        let j = 0;
        for (let i of Object.keys(this.state.intersections)) {
            intersectionComponents.push(<IntersectionComponent 
                    key={j} id={j}
                    deleteCallback={this.deleteIntersection}
                    {...this.state.intersections[i]} 
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
