import React, { useState, useEffect } from "react";
import axios from "axios";

import { aws_settings } from "./aws-exports.js"
import APIAddressEntryComponent from "./APIAddressEntry.js";
import AddIntersectionButton from "./AddIntersectionButton.js";
import { IntersectionComponent } from "./Intersection.js";

class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = { intersections: [], connected: false };
    
        this.connect = this.connect.bind(this);
        this.userSelectLight = this.userSelectLight.bind(this);
    }

    connect(url) {
        console.log(`Connecting to URL ${url}`);
    }

    userSelectLight(intersection_index, light, value) {
        let intersection = this.state.intersections[intersection_index];

        // Really simple business logic to disallow invalid states (ie. both lights green)
        let light1_new = intersection.light1;
        let light2_new = intersection.light2;

        if (light === "1") {
            light1_new = value;
            if (value !== "red" && intersection.light2 !== "red") {
                light2_new = "red";
            }
        }
        else {
            light2_new = value;
            if (value !== "red" && intersection.light1 !== "red") {
                light1_new = "red";
            }
        }
        let new_state = this.state.intersections;
        new_state[intersection_index].light1 = light1_new;
        new_state[intersection_index].light2 = light2_new;

        this.setState({ intersections: new_state });
    }

    render() {
        let connectionStatus = this.state.connected ? "Connected" : "Disconnected";

        let intersectionComponents = [];

        let j = 0;
        for (let i of this.state.intersections) {
            intersectionComponents.push(<IntersectionComponent 
                    key={j} id={j}
                    intersection={i} 
                    onClick={this.userSelectLight} />);
            j++;
        }

        return (
            <div className="dashboard-container" >
                <div id="top-bar" >
                    <APIAddressEntryComponent connectCallback={this.connect} 
                    defaultURL={this.props.defaultAPI}/>
                    <span className="connect-status" >{connectionStatus}</span>
                </div>
    
                <div className="traffic-light-control-group" >
                    {intersectionComponents}
                </div>

                <div className="debug-group" >
                    <AddIntersectionButton connection_template={this.connection} />
                </div> 
            </div>
        );
    }

}

export default DashboardComponent;
