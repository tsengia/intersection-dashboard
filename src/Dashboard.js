import React from "react";
import { API, graphqlOperation } from "@aws-amplify/api"
import { Hub } from "@aws-amplify/core"
import { CONNECTION_STATE_CHANGE, ConnectionState } from "@aws-amplify/pubsub"
import { intersectionList } from "./graphql/queries.ts";
import { addIntersection, removeIntersection } from './graphql/mutations.ts';
import { addedIntersection, removedIntersection } from "./graphql/subscriptions.ts";

import aws_settings from "./aws-exports.js"

import { IntersectionComponent } from "./Intersection.js";

class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = { intersections: [] };

        this.priorConnectionState = ConnectionState.Disconnected;
        this.subscriptions = [];

        this.deleteIntersectionAction = this.deleteIntersectionAction.bind(this);
        this.addIntersectionAction = this.addIntersectionAction.bind(this);
        this.fetchIntersections = this.fetchIntersections.bind(this);
    }

    componentDidMount() {
        API.configure(aws_settings);

        Hub.listen("api", (data) => {
            const { payload } = data;
            if (payload.event === CONNECTION_STATE_CHANGE) {
              if (this.priorConnectionState === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
                this.fetchIntersections();
              }
              this.priorConnectionState = payload.data.connectionState;
            }
        });

        // Subscription for removed intersections
        let processsRemoveNotification = (response) => {
            const removed = response.value.data.removedIntersection.name;
            let i = this.state.intersections;
            delete i[removed];
            this.setState({
                intersections: i
            });
        };
        processsRemoveNotification = processsRemoveNotification.bind(this);

        this.subscriptions.push(
            API.graphql(
                graphqlOperation(removedIntersection)
            ).subscribe({
                next: processsRemoveNotification
            })
        );

        // Subscription for added intersections
        let processAddNotification = (response) => {
            const new_intersection = response.value.data.addedIntersection;
            let i = this.state.intersections;
            i[new_intersection.name] = new_intersection;
            this.setState({ 
                intersections: i
            });
        };
        processAddNotification = processAddNotification.bind(this);

        this.subscriptions.push(
            API.graphql(
                graphqlOperation(addedIntersection)
            ).subscribe({
                next: processAddNotification
            })
        );
    }

    componentWillUnmount() {
        for (let s of this.subscriptions) {
            s.unsubscribe();
        }
    }

    fetchIntersections() {
        API.graphql( {
            query: intersectionList
        }).then((result) => {
            let intersection_name_map = {};
            for (let i of result.data.intersectionList) {
                intersection_name_map[i.name] = i;
            }
            this.setState({ intersections: intersection_name_map });
        }).catch((error) => {
            console.error(error);
        });
    }

    deleteIntersectionAction(name) {
        const deleted_name = name;
        console.log(`Removing ${name}`);

        API.graphql({
            query: removeIntersection,
            variables: {
                name: deleted_name
            }
        }).then((response) => {
            let removed_model = response.data.removeIntersection;
            console.log(`Removing ${removed_model.name}`);
            if (removed_model !== null && deleted_name === removed_model.name) {
                let i = {...this.state.intersections};
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

    addIntersectionAction() {
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
                    deleteCallback={this.deleteIntersectionAction}
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
                    <button type="button" onClick={this.addIntersectionAction} >+</button>
                </div> 
            </div>
        );
    }

}

export default DashboardComponent;
