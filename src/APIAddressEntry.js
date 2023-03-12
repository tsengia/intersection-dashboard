import React from 'react';

class APIAddressEntryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.url_input = React.createRef();
        this.onAddressConnect = this.onAddressConnect.bind(this);
    }

    onAddressConnect(e) {
        // Called when the user presses the connect button
        this.props.connectCallback(this.url_input.current.value);
        e.preventDefault();
    }

    render() {
        return ( 
        <form className="api-input" onSubmit={this.onAddressConnect} >
            <label>
                API Address: <input type="text" defaultValue={this.props.defaultURL} ref={this.url_input} /> 
            </label>
            <input type="submit" value="Connect" />
        </form>
        );
    }
}

export default APIAddressEntryComponent;
