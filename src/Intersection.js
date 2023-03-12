import React from 'react';
import TrafficLightComponent from "./TrafficLight.js";

export class IntersectionComponent extends React.Component {

    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);   
    }

    clickHandler(light, value) {
        console.log("Light " + light + " change to " + value);
        this.props.onClick(this.props.name, light, value);
    }

    render() {
        let light1_values = [];
        let light2_values = [];

        let light_colors = [ "red", "yellow", "green", "off" ];
        for (let l of light_colors) {
            light1_values.push([l, l == this.props.light1]);
            light2_values.push([l, l == this.props.light2]);
        }
        
        let ble_state = this.props.ble_state == "connected" ? "Connected" : "Disconnected";
        
        return (<div className="intersection-container" >

            <div className="intersection-id" >{this.props.name}</div>
            <div>Bluetooth: <span className={ble_state} >{ble_state}</span></div>
            <TrafficLightComponent lightvalues={light1_values} 
                                    name="1" onClick={this.clickHandler} key="1" />
            <TrafficLightComponent lightvalues={light2_values} 
                                    name="2" onClick={this.clickHandler} key="2" />
        </div>);
    }

};

export default IntersectionComponent;
