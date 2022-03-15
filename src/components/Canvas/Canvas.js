// [React]
import React, { PureComponent } from 'react';
import CanvasDraw from "react-canvas-draw";

// [CSS]
import '../css/Canvas/Canvas.css';

/**
 * Canvas drawing component
 */
class Canvas extends PureComponent
{  
    constructor(props)
    {
        super(props);
        
        //reference to the drawing canvas
        this.drawing = undefined;

        //target string for canvas
        //by default its in a testing state
        this.targetString = '%_TESTING_%';
    }

    // Handle the action of when submit is clicked on the canvas
    handleSubmitClick = () =>
    {
        // Disable the Submit button
        this.toggleSubmitButton();

        // Toggle the Loading Animation in the SideBar
        this.toggleLoadingAnimation();

        // Save the image to localstorage
        localStorage.setItem("savedDrawing", this.drawing.getSaveData());

        // Send request for a score of canvas drawing
        this.props.scoreCanvasDrawing(this.drawing.getDataURL());

        // Toggle the Loading Animation in the SideBar --- maybe SideBar should do this during #6?
        this.toggleLoadingAnimation();

        // Enable the Submit button
        this.toggleSubmitButton();
    }

    toggleLoadingAnimation = () =>
    {
        this.props.toggleLoadingAnimation();
    };

    toggleSubmitButton = () =>
    {
        let el = document.getElementById('canvas-submit-button-for-toggling');
        console.log(el.disabled);
        if (!el.disabled)
        {
            el.disabled = true;
        } else
        {
            el.disabled = false;
        }
    };

    render = () =>
    {
        return (
            <div>
                <h3 id="canvas-header">Canvas</h3>
                <div id="canvas-drawing-container">
                    
                    {/* initialize the canvas component and set the reference */}
                    <CanvasDraw brushRadius={5} 
                                lazyRadius={0} 
                                brushColor="#000000" 
                                ref={ref => (this.drawing = ref)}
                                // imgSrc="letter_A.png"
                                // hideGrid={true}
                    />
                    
                    {/* button to clear the canvas */}
                    <button onClick={() => this.drawing.clear()}
                        className="btn btn-secondary canvas-clear-button">
                        Clear
                    </button>

                    {/* button to save the canvas */}
                    <button 
                        onClick={() => this.handleSubmitClick()}
                        className="btn btn-success canvas-submit-button"
                        id="canvas-submit-button-for-toggling">
                        Submit
                    </button>
                    
                </div>
            </div>
        );
    };
}
export default Canvas;
