// [React]
import React, {PureComponent} from 'react';

// [Components]
import SideBarFadingAlphabet from '../SideBar/SideBarFadingAlphabet'
import FadingAlphabetInfoModal from './FadingAlphabetInfoModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/fontawesome-free-solid'
import GenericCanvas from './GenericCanvas';
import ScoringCanvas from './ScoringCanvas';

// [CSS]
import '../css/Canvas/FadingAlphabet.css';
import '../css/Tool/Main.css';
import '../css/Canvas/Canvas.css';

/**
 * Fading Alphabet component that is configured by its 
 * controller for a specific character series.
 */
class FadingAlphabet extends PureComponent
{
    constructor(props)
    {
        super(props);
        
        // Lists of canvases for each phase
        this.phaseOneCollection = [];
        this.phaseTwoCollection = [];
        this.phaseThreeCollection = [];
        this.phaseFourCollection = [];
        this.phaseFiveCollection = [];

        this.state = {
            progressPercentageLetter: 0,
            disablePhaseOne: false,
            disablePhaseTwo: false,
            disablePhaseThree: false,
            disablePhaseFour: false,
            disablePhaseFive: false
        };
    };

    /***********************************************************************
     ** Updating the references to the individual collections of canvases.
     ** These get called when the individual canvases get rendered.
     ***********************************************************************/

    updateRefOne =   (ref) =>
    {
        if (this.phaseOneCollection.length === 3 && ref !== null)
        {
            this.phaseOneCollection.length = 0;
            this.phaseOneCollection.push(ref);
        }
        else if (ref !== null)
        {
            this.phaseOneCollection.push(ref);
        }
        return ref;
    };

    updateRefTwo =   (ref) =>
    {
        if (this.phaseTwoCollection.length === 3 && ref !== null)
        {
            this.phaseTwoCollection.length = 0;
            this.phaseTwoCollection.push(ref);
        }
        else if (ref !== null)
        {
            this.phaseTwoCollection.push(ref);
        }
    };

    updateRefThree = (ref) =>
    {
        if (this.phaseThreeCollection.length === 3 && ref !== null)
        {
            this.phaseThreeCollection.length = 0;
            this.phaseThreeCollection.push(ref);
        }
        else if (ref !== null)
        {
            this.phaseThreeCollection.push(ref);
        }
    };

    updateRefFour =  (ref) =>
    {
        if (this.phaseFourCollection.length === 3 && ref !== null)
        {
            this.phaseFourCollection.length = 0;
            this.phaseFourCollection.push(ref);
        }
        else if (ref !== null)
        {
            this.phaseFourCollection.push(ref);
        }
    };

    updateRefFive =  (ref) =>
    {
        if (this.phaseFiveCollection.length === 3 && ref !== null)
        {
            this.phaseFiveCollection.length = 0;
            this.phaseFiveCollection.push(ref);
        }
        else if (ref !== null)
        {
            this.phaseFiveCollection.push(ref);
        }
    };

    // Clear the data drawn in each canvas in the collection...subtract from progress if they were finished
    clearCanvasCollection = (collection, phaseNum) =>
    {
        // subtract if already clicked as "mark as done"
        var button = document.getElementById(this.props.character+"_phase"+phaseNum+"_doneButton");
        if (button.disabled)
        {
            this.adjustProgressPercentageLetter(-20);   // -20 is abitrary...only 5 phases CURRENTLY
            this.toggleCanvasCollection(phaseNum) // enable the phase canvas collection
            this.toggleMarkButton(phaseNum);      // enable the "mark as done button"
        } 

        // clear the canvas collection
        collection.forEach( function(canvas) { canvas.clear() } );

        // if phase 5 (scoring)
        if (phaseNum === 5)
        {
            // TODO: figure out what to do here...nothing?
        }
    };

    // Enable the given phase collection of canvases
    toggleCanvasCollection = (phaseNum) =>
    {
        switch(phaseNum)
        {
            case 1: this.setState(state => ({ disablePhaseOne:   !state.disablePhaseOne })); break;
            case 2: this.setState(state => ({ disablePhaseTwo:   !state.disablePhaseTwo })); break;
            case 3: this.setState(state => ({ disablePhaseThree: !state.disablePhaseThree })); break;
            case 4: this.setState(state => ({ disablePhaseFour:  !state.disablePhaseFour })); break;
            case 5: this.setState(state => ({ disablePhaseFive:  !state.disablePhaseFive })); break;
            default: throw Error("Error toggling canvas for phase "+phaseNum);
        }
    };

    // Update the progress bar if all drawings are completed for a specific phase
    updateProgress = (phaseNum) =>
    {
        // set a checker boolean to whether or not all canvases have been drawn on
        let allCanvasesDrawnOn = arr => arr.every(v => JSON.parse(v.getSaveData()).lines.length > 0);

        if ( 
            (phaseNum === 1 && allCanvasesDrawnOn(this.phaseOneCollection))   ||
            (phaseNum === 2 && allCanvasesDrawnOn(this.phaseTwoCollection))   ||
            (phaseNum === 3 && allCanvasesDrawnOn(this.phaseThreeCollection)) ||
            (phaseNum === 4 && allCanvasesDrawnOn(this.phaseFourCollection))  ||
            (phaseNum === 5 && allCanvasesDrawnOn(this.phaseFiveCollection)) 
           )
        {
            this.toggleMarkButton(phaseNum);
            this.adjustProgressPercentageLetter(20); // 20 is abitrary...only 5 phases CURRENTLY
            this.toggleCanvasCollection(phaseNum);
            return;
        }
        else
        {
            throw Error("Please make sure all exercise squares are attempted before marking as done!");
        }
    };

    // Toggle mark as done button for specific phase....does both "disabled" and "enabled"
    toggleMarkButton = (phaseNum) =>
    {
        let el = document.getElementById(this.props.character+"_phase"+phaseNum+"_doneButton");
        if (el.disabled) { el.disabled = false; } 
        else { el.disabled = true; }
    };

    // Adjust the percentage in the progress bar per LETTER
    adjustProgressPercentageLetter = (num) =>
    {
        this.setState(state => ({
            progressPercentageLetter: state.progressPercentageLetter += num
        }));
    };

    // Renders the FadingAlphabet component
    render = () =>
    {
        return (
            <div className="main-container">

                <div className="side-container">
                    <SideBarFadingAlphabet percentageLetter={this.state.progressPercentageLetter}
                                           percentageOverall={this.props.progressPercentageOverall} 
                                           character={this.props.character}
                                           sideBarLoaderId={this.props.sideBarLoaderId}
                                           characterBoxID={this.props.characterBoxID}/>
                </div>

                <div className="FadingAlphabet canvas-container">
                    <h3 id="canvas-header">
                        Fading Alphabet
                        
                        <button className="btn btn-secondary info-button" 
                                data-toggle="modal" data-target="#exampleModal">
                            <FontAwesomeIcon icon={faInfo} />
                        </button>
                    </h3>

                    {/** hidden by default */}
                    <FadingAlphabetInfoModal />

                    <div>

                        {/** Trace inside of each letter */}
                        <GenericCanvas name={this.props.character+"_1_phase1"} phase={1} character={this.props.character} updateRef={this.updateRefOne} disabled={this.state.disablePhaseOne} imgSrc={"/fadingAlphabet/phase"+1+"/letter_"+this.props.character+".png"}/>
                        <GenericCanvas name={this.props.character+"_2_phase1"} phase={1} character={this.props.character} updateRef={this.updateRefOne} disabled={this.state.disablePhaseOne} imgSrc={"/fadingAlphabet/phase"+1+"/letter_"+this.props.character+".png"}/>
                        <GenericCanvas name={this.props.character+"_3_phase1"} phase={1} character={this.props.character} updateRef={this.updateRefOne} disabled={this.state.disablePhaseOne} imgSrc={"/fadingAlphabet/phase"+1+"/letter_"+this.props.character+".png"}/>
                            <div className="fa-button-container" >
                            <button onClick={() => this.clearCanvasCollection(this.phaseOneCollection, 1)}
                                className="btn btn-secondary canvas-clear-button">
                                Clear {/* clear the canvas group*/}
                            </button>
                            <button id={this.props.character+"_phase1_doneButton"} onClick={() => this.updateProgress(1)}
                                className="btn btn-primary canvas-clear-button">
                                Mark as Done {/* clear the canvas group*/}
                            </button>
                            </div>
                    </div>
                    <br/>
                    <div>

                        {/** Trace each letter -- solid */}
                        <GenericCanvas name={this.props.character+"_1_phase2"} phase={2} character={this.props.character} updateRef={this.updateRefTwo} disabled={this.state.disablePhaseTwo} />
                        <GenericCanvas name={this.props.character+"_2_phase2"} phase={2} character={this.props.character} updateRef={this.updateRefTwo} disabled={this.state.disablePhaseTwo} />
                        <GenericCanvas name={this.props.character+"_3_phase2"} phase={2} character={this.props.character} updateRef={this.updateRefTwo} disabled={this.state.disablePhaseTwo} />
                            <div className="fa-button-container" >
                            <button onClick={() => this.clearCanvasCollection(this.phaseTwoCollection, 2)}
                                className="btn btn-secondary canvas-clear-button">
                                Clear {/* clear the canvas group*/}
                            </button>
                            <button id={this.props.character+"_phase2_doneButton"} onClick={() => this.updateProgress(2)}
                                className="btn btn-primary canvas-clear-button">
                                Mark as Done {/* clear the canvas group*/}
                            </button>
                            </div>
                    </div>
                    <br/>
                    <div>

                        {/** Trace each letter -- dotted */}
                        <GenericCanvas name={this.props.character+"_1_phase3"} phase={3} character={this.props.character} updateRef={this.updateRefThree} disabled={this.state.disablePhaseThree} />
                        <GenericCanvas name={this.props.character+"_2_phase3"} phase={3} character={this.props.character} updateRef={this.updateRefThree} disabled={this.state.disablePhaseThree} />
                        <GenericCanvas name={this.props.character+"_3_phase3"} phase={3} character={this.props.character} updateRef={this.updateRefThree} disabled={this.state.disablePhaseThree} />
                            <div className="fa-button-container" >
                            <button onClick={() => this.clearCanvasCollection(this.phaseThreeCollection, 3)}
                                className="btn btn-secondary canvas-clear-button">
                                Clear {/* clear the canvas group*/}
                            </button>
                            <button id={this.props.character+"_phase3_doneButton"} onClick={() => this.updateProgress(3)}
                                className="btn btn-primary canvas-clear-button">
                                Mark as Done {/* clear the canvas group*/}
                            </button>
                            </div>
                    </div>
                    <br/>
                    <div>
                    
                        {/** Write each letter with starting dot */}
                        <GenericCanvas name={this.props.character+"_1_phase4"} phase={4} character={this.props.character} updateRef={this.updateRefFour} disabled={this.state.disablePhaseFour} />
                        <GenericCanvas name={this.props.character+"_2_phase4"} phase={4} character={this.props.character} updateRef={this.updateRefFour} disabled={this.state.disablePhaseFour} />
                        <GenericCanvas name={this.props.character+"_3_phase4"} phase={4} character={this.props.character} updateRef={this.updateRefFour} disabled={this.state.disablePhaseFour} />
                            <div className="fa-button-container" >
                            <button onClick={() => this.clearCanvasCollection(this.phaseFourCollection, 4)}
                                className="btn btn-secondary canvas-clear-button">
                                Clear {/* clear the canvas group*/}
                            </button>
                            <button id={this.props.character+"_phase4_doneButton"} onClick={() => this.updateProgress(4)}
                                className="btn btn-primary canvas-clear-button">
                                Mark as Done {/* clear the canvas group*/}
                            </button>
                            </div>
                    </div>
                    <br/>
                    <span style={{marginLeft: "10px", fontFamily: "chalkboard", fontSize: "20px"}}>Scoring</span>
                    <div>
                        {/** Write each letter with no starting dot */}
                        <ScoringCanvas name={this.props.character+"_1_phase5"} phase={5} character={this.props.character} updateRef={this.updateRefFive} disabled={this.state.disablePhaseFive} />
                        <ScoringCanvas name={this.props.character+"_2_phase5"} phase={5} character={this.props.character} updateRef={this.updateRefFive} disabled={this.state.disablePhaseFive} />
                        <ScoringCanvas name={this.props.character+"_3_phase5"} phase={5} character={this.props.character} updateRef={this.updateRefFive} disabled={this.state.disablePhaseFive} />
                        {/** phase 5 (scoring) takes care of its own buttons */}
                    </div>

                    <button id={this.props.character+"_submitButton"} 
                            onClick={() => {
                                this.props.handleSubmit(this.phaseFiveCollection);
                                
                                // Clear off all canvases that were previously drawn on.
                                // This should happen no matter if "next" or "retry" was clicked.
                                this.clearCanvasCollection(this.phaseOneCollection, 1);
                                this.clearCanvasCollection(this.phaseTwoCollection, 2);
                                this.clearCanvasCollection(this.phaseThreeCollection, 3);
                                this.clearCanvasCollection(this.phaseFourCollection, 4);
                                this.clearCanvasCollection(this.phaseFiveCollection, 5);
                            }}
                            className="btn btn-success canvas-submit-button"
                            // TODO: uncomment this. its just easier to debug without disabling everything!
                            // disabled={!(this.state.disablePhaseOne && 
                            //             this.state.disablePhaseTwo && 
                            //             this.state.disablePhaseThree && 
                            //             this.state.disablePhaseFour && 
                            //             this.state.disablePhaseFive)}
                            >
                            Submit
                    </button>
                </div>
            </div>
        );
    };
};

export default FadingAlphabet;