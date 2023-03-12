import React from "react";
import { API } from "@aws-amplify/api"
import { intersectionList } from "./graphql/queries.ts";
import { addIntersection, removeIntersection } from './graphql/mutations.ts';

import aws_settings from "./aws-exports.js"

import { IntersectionComponent } from "./Intersection.js";

class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = { intersections: [] };

        this.deleteIntersectionHandler = this.deleteIntersectionHandler.bind(this);
        this.addIntersectionHandler = this.addIntersectionHandler.bind(this);
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

    deleteIntersectionHandler(name) {
        const deleted_name = name;

        API.graphql({
            query: removeIntersection,
            variables: {
                name: deleted_name
            }
        }).then((response) => {
            let removed_model = response.data.removeIntersection;
            if (removed_model !== null && deleted_name === removed_model.name) {
                let i = this.state.intersections;
                delete i[deleted_name];
                this.setState({intersections: i});
            }
            else {
                console.error("response.data.deleteIntersection is null!");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    addIntersectionHandler() {
        let name = prompt("New Intersection Name:");
        if (name === "") {
            // Handle case when user cancels out of input prompt
            return;
        }
        // Trim whitespace from ends, this is done on server side too
        name = name.trim();
        API.graphql({
            query: addIntersection,
            variables: {
                "name": name
            }
        }).then((response) => {
            if (response.data.addIntersection != null) {
                // Add the intersection model to our new state
                const new_intersection = response.data.addIntersection;
                let i = this.state.intersections;
                i[new_intersection.name] = new_intersection;
                this.setState({ 
                    intersections: i
                });
            }
            else {
                console.error("data.addIntersection returned null!");
            }
        }).catch((response) => {
            if (response.errors) {
                console.error(response.errors);
            }
        });
    }

    render() {
        let intersectionComponents = [];

        let j = 0;
        for (let i of Object.keys(this.state.intersections)) {
            intersectionComponents.push(<IntersectionComponent 
                    key={j} id={j}
                    deleteCallback={this.deleteIntersectionHandler}
                    {...this.state.intersections[i]} 
                    />);
            j++;
        }

        return (
            <div className="dashboard-container" >
                <div id="top-bar" >
                    Traffic Intersection Dashboard
                </div>
    
                <div className="traffic-light-control-group" >
                    {intersectionComponents}
                </div>

                <div className="debug-group" >
                    <button type="button" onClick={this.addIntersectionHandler} >+</button>
                </div> 
            </div>
        );
    }

}

export default DashboardComponent;
