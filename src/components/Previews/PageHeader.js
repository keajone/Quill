import React, { Component } from 'react';

import "../css/Previews/PageHeader.css";

/**
 * Page header component
 */
class PageHeader extends Component {
    constructor(props) {
        super(props);
        this.value = props.value;
    }
    
    render() {
        return (
            <div className="page-header">
                <h4>{this.value}</h4>
            </div>
        );
    }
}

export default PageHeader;