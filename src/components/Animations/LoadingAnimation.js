// Module imports
import React from "react";

import "../css/Animations/LoadingAnimation.css";


/**
 * Loading animation for when the profile is being run.
 * 
 * CaseLoadingAnimation could be made generic enough to 
 * replace this component, but other things took priority.
 */
class LoadingAnimation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {id: props.id};
    }

    static getDerivedStateFromProps(props) {
        return {id: props.id};
    }

    static toggle(id) {
        let el = document.getElementById('LA_'+id);
        if (el.style.display === 'block') {
            el.style.display = 'none';
        } else {
            el.style.display = 'block';
        }
    }

    render() {
        return (
            <div className="text-center" id={"LA_"+this.state.id}>
                <div 
                    className="spinner-border text-primary LA" 
                    style={{width: "10rem", height: "10rem"}}
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default LoadingAnimation;