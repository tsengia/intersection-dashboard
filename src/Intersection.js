import React from 'react';
import TrafficLightComponent from "./TrafficLight.js";

import { API } from "@aws-amplify/api";
import { removeIntersection, updateIntersection } from './graphql/mutations.ts';

export class IntersectionComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.lightClickHandler = this.lightClickHandler.bind(this);   
        this.deleteClickHandler = this.deleteClickHandler.bind(this);   
    }

    componentDidMount() {
        this.setState(this.props);
    }

    deleteClickHandler() {
        API.graphql({
            query: removeIntersection,
            variables: {
                name: this.state.name
            }
        }).then((response) => {
            let removed_model = response.data.removeIntersection;
            if (removed_model !== null) {
                this.props.deleteCallback(this);
            }
            else {
                console.error("response.data.deleteIntersection is null!");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    lightClickHandler(light, value) {
        // Simple business logic to prevent user from having both directions of traffic flow at the same time
        let new_light1 = this.state.light1;
        let new_light2 = this.state.light2;
        if (light === "1") {
            if (value !== "red" && this.state.light2 !== "red") {
                new_light2 = "red";
            }
            new_light1 = value;
        }
        else {
            if (value !== "red" && this.state.light1 !== "red") {
                new_light1 = "red";
            }
            new_light2 = value;
        }

        // Send a mutation request to update the light state
        API.graphql({
            query: updateIntersection,
            variables: {
                name: this.state.name,
                light1: new_light1,
                light2: new_light2,
                ble_state: this.state.ble_state
            }
        }).then((response) => {
            let new_model = response.data.updateIntersection;
            if (new_model !== null) {
                this.setState(new_model);
            }
            else {
                console.error("response.data.updateIntersection is null!");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        let light1_values = [];
        let light2_values = [];

        let light_colors = [ "red", "yellow", "green", "off" ];
        for (let l of light_colors) {
            light1_values.push([l, l === this.state.light1]);
            light2_values.push([l, l === this.state.light2]);
        }
        
        let ble_state = this.state.ble_state === "connected" ? "Connected" : "Disconnected";
        
        return (
            <div className="intersection-container" >
                <div className="intersection-id" >{this.state.name}</div>
                <button className="delete-button" type='button' onClick={this.deleteClickHandler} >X</button>
                <div>Bluetooth: <span className={ble_state} >{ble_state}</span></div>
                <TrafficLightComponent lightvalues={light1_values} 
                                        name="1" onClick={this.lightClickHandler} key="1" />
                <TrafficLightComponent lightvalues={light2_values} 
                                        name="2" onClick={this.lightClickHandler} key="2" />
            </div>
        );
    }

};

export default IntersectionComponent;
