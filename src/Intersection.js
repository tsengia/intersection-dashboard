import React from 'react';
import TrafficLightComponent from "./TrafficLight.js";

export class IntersectionComponent extends React.Component {

    constructor(props) {
        super(props);
        this.lightClickHandler = this.lightClickHandler.bind(this);
        this.deleteClickHandler = this.deleteClickHandler.bind(this);
    }

    deleteClickHandler() {
        this.props.deleteCallback(this.props.name);
    }

    lightClickHandler(light, value) {
        // Simple business logic to prevent user from having both directions of traffic flow at the same time
        let new_light1 = this.props.light1;
        let new_light2 = this.props.light2;
        if (light === "1") {
            if (value !== "red" && this.props.light2 !== "red") {
                new_light2 = "red";
            }
            new_light1 = value;
        }
        else {
            if (value !== "red" && this.props.light1 !== "red") {
                new_light1 = "red";
            }
            new_light2 = value;
        }

        this.props.updateCallback(this.props.name, new_light1, new_light2, this.props.ble_state);
    }

    render() {
        let light1_values = [];
        let light2_values = [];

        let light_colors = [ "red", "yellow", "green", "off" ];
        for (let l of light_colors) {
            light1_values.push([l, l === this.props.light1]);
            light2_values.push([l, l === this.props.light2]);
        }
        
        let ble_state = this.props.ble_state === "connected" ? "Connected" : "Disconnected";
        
        return (
            <div className="intersection-container" >
                <div className="intersection-id" >{this.props.name}</div>
                <div className="delete-button" 
                        name={this.props.name}
                        onClick={this.deleteClickHandler} >
                            X
                </div>
                <div>
                    Bluetooth: <span className={ble_state} >{ble_state}</span>
                </div>
                <TrafficLightComponent lightvalues={light1_values} 
                                        name="1" onClick={this.lightClickHandler} key="1" />
                <TrafficLightComponent lightvalues={light2_values} 
                                        name="2" onClick={this.lightClickHandler} key="2" />
            </div>
        );
    }

};

export default IntersectionComponent;
