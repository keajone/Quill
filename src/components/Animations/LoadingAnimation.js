// [React]
import React, { PureComponent } from 'react';

// [CSS]
import "../css/Animations/LoadingAnimation.css";

/**
 * Loading animation component
 */
class LoadingAnimation extends PureComponent
{
    constructor(props)
    {
        super(props);
        this.state = {id: props.id};
    };

    // React boilerplate
    static getDerivedStateFromProps(props)
    {
        return {id: props.id};
    };

    // Toggles a loading animation element by the given ID
    static toggle(id)
    {
        let el = document.getElementById('LA_'+id);
        if (el.style.display === 'block')
        {
            el.style.display = 'none';
        } else
        {
            el.style.display = 'block';
        }
    };

    // Renders a specific loading (spinning) animation element
    // and gives it the ID that was passed in to the constructor.
    render()
    {
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
    };
};

export default LoadingAnimation;