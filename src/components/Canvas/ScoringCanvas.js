// [React]
import React from 'react';
import CanvasDraw from "react-canvas-draw";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons'

// [Components]
import {FadingAlphabetController} from './FadingAlphabetController';
import GenericCanvas from './GenericCanvas';
import AlphabetSeriesCanvasCoordinatesUtility from './AlphabetSeriesCanvasCoordinatesUtility';

/**
 * Scoring canvas component 
 */
class ScoringCanvas extends GenericCanvas
{
    constructor(props)
    {
        super(props);

        // Boolean to keep track if mouse is 'clicking' down
        this.mouseIsDown = false;

        // Constants to control progress bar dimensions
        this.progressHeight = "30px";
        this.progressWidth = "100%";

        // utility that keeps tracking of mouse positioning and will return
        // a score when correctly dragging mouse over the coords in order.
        this.utility = new AlphabetSeriesCanvasCoordinatesUtility(this.props.character);

        // should just be an empty simple canvas with no letters
        this.imgSrc = FadingAlphabetController.getImgSrc(this.props.phase,this.props.character);

        // reference to the canvas drawing
        this.ref = undefined;

        this.state = {
            imgSrc: this.imgSrc,
            progress: 0
        };
    };

    // Executed after component has been rendered in DOM
    componentDidMount = () =>
    {
        // acquire the canvas in DOM
        var scoringCanvasDiv = document.getElementById(this.props.name+"_ScoringCanvas");
        var canvas = scoringCanvasDiv.firstChild.firstChild.childNodes[3];
        
        // add onClick function(s) to canvas for mouse tracking
        canvas.onmousemove = this.scoreMouseMovements;
        canvas.onmousedown = this.setMouseDownTrue;
        canvas.onmouseup = this.setMouseDownFalse;
    };

    // Functions to toggle when mouse is down (pen is on the canvas)
    setMouseDownTrue = (event) => {this.mouseIsDown = true}
    setMouseDownFalse = (event) => {this.mouseIsDown = false}

    // Score the movements of mouse (pen) only when mouse is down
    scoreMouseMovements = (event) =>
    {
        if (this.mouseIsDown)
        {
            var x = event.offsetX;
            var y = event.offsetY;

            // result is an integer to update progress
            var result = this.utility.scoreMouseMovement(x,y);
            
            this.setState(state => ({
                progress: state.progress += result
            }));
        }
    }

    // Clears the canvas in this component and sets progress to Zero
    clearCanvas = () =>
    {
        // mouse is NOT down...in case it hasnt already been set
        this.mouseIsDown = false;

        // empty the canvas
        if (this.ref !== undefined)
            this.ref.clear();

        // eliminate any progress made
        this.utility.clearPassed();

        // set progress to Zero
        this.setState(state => ({
            progress: 0
        }));
    };

    // Renders the ScoringCanvas component
    render = () =>
    {
        return (
            <div id={this.props.name+"_ScoringCanvas"} className={"ScoringCanvas"}>

                {/* initialize the CanvasDraw component and set the reference */}
                <div className={"ScoringCanvas_Canvas"}>
                    <CanvasDraw brushRadius={5} 
                                lazyRadius={0} 
                                brushColor="#000000" 
                                ref={ref => (this.ref = ref)}
                                canvasHeight={150}
                                canvasWidth={150}
                                imgSrc={this.state.imgSrc}
                                disabled={this.props.disabled}
                    />
                </div>

                {/** progress bar for scoring the drawing of letters */}
                <div className="progress" style={{ height: this.progressHeight }}>
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" 
                            style={{ width: this.state.progress+"%", height: this.progressHeight }}>
                            { this.state.progress + "%"}
                    </div>
                </div>

                {/** clear button for the canvas */}
                <div className="fa-scoring-button-container">
                    <div className="fa-scoring-button" >
                        <button onClick={() => this.clearCanvas()}
                            className="btn btn-secondary canvas-scoring-clear-button">
                            <FontAwesomeIcon icon={faUndoAlt} /> {/* clear the canvas*/}
                        </button>
                    </div>
                </div>

            </div>
        );
    };
};

export default ScoringCanvas;