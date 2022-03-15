// [React]
import React from 'react';
import CanvasDraw from "react-canvas-draw";

// [Components]
import {FadingAlphabetController} from './FadingAlphabetController';

/**
 * Generic canvas component for drawing on.
 * Background image is determined by whichever character
 * series is being passed in through props.
 */
class GenericCanvas extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            imgSrc: FadingAlphabetController.getImgSrc(this.props.phase,this.props.character)
        };
    };

    // Renders the GenericCanvas component
    render = () =>
    {
        return (
            <div id={this.props.name+"_GenericCanvas"} className={"GenericCanvas"}>

                {/* initialize the CanvasDraw component and set the reference */}
                <CanvasDraw brushRadius={5} 
                            lazyRadius={0} 
                            brushColor="#000000"

                            // Allows parent component to keep track of this canvas by reference
                            ref={ref => (this.ref = this.props.updateRef(ref))}
                            canvasHeight={150}
                            canvasWidth={150}
                            imgSrc={this.state.imgSrc}

                            // This is typically set to 'true' when user marks it as done/submitting
                            disabled={this.props.disabled}
                />

            </div>
        );
    };
};

export default GenericCanvas;