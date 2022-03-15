// [React]
import React from 'react';

// [Components]
import LoadingAnimation from "../Animations/LoadingAnimation";

// [CSS]
import '../css/SideBar/SideBar.css';
import SideBar from './SideBar';

/**
 * SideBarFadingAlphabet component
 * Manages the individual letter progress as 
 * well as the overall progress. Also, this side bar
 * will update a text box with the current 
 * letter series that is being practiced.
 */
class SideBarFadingAlphabet extends SideBar
{  
    constructor(props)
    {
        super(props);
        
        // some constants for progress bar dimensions
        this.progressHeight = "30px";
        this.progressWidth = "100%";
    }

    // Renders the side bar of the main page. This side bar
    // will container a score that gets generated after
    // the image has been saved and scored by backend.
    render = () =>
    {
        return (
            <div>
                <h3 id="side-bar-header">Score</h3>
                <div id="side-bar-score-container">

                    
                    {/* score container */}
                    <div id="score-container"
                         style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                    }}>
                        <br/>

                        {/** Progress of just the current letter */}
                        <div style={{marginLeft: "10px"}}>Letter:</div>
                        <div className="progress" style={{ height: this.progressHeight }}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" 
                                 style={{ width: this.props.percentageLetter+"%", height: this.progressHeight }}>
                                 { this.props.percentageLetter + "%"}
                            </div>
                        </div>

                        <br/>

                        {/** Overall progress bar (out of all characters) */}
                        <div style={{marginLeft: "10px"}}>Overall:</div>
                        <div className="progress" style={{ height: this.progressHeight }}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" 
                                 style={{ width: this.props.percentageOverall+"%", height: this.progressHeight }}>
                                 { this.props.percentageOverall + "%"}
                            </div>
                        </div>

                        {/** A centered image of the 'character' being used */}
                        <div id={this.props.characterBoxID} style={{ padding: "25px" }}>
                            <p style={{ fontFamily: "chalkboard", 
                                        fontSize: "10vw", 
                                        backgroundColor: "#eeeeee",
                                        textAlign: "center",
                                        border: "solid 2px black",
                                        marginTop: "25px"}}>
                                {this.props.character}
                            </p>
                        </div>

                        {/** loading animation that is hidden, unless waiting on backend response */}
                        <LoadingAnimation id={this.props.sideBarLoaderId} />

                    </div>

                </div>
            </div>
        );
    };
};
export default SideBarFadingAlphabet;
