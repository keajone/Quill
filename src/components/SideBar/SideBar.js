import React, { PureComponent } from 'react';

// Components
import LoadingAnimation from "../Animations/LoadingAnimation";

// Styling
import '../css/SideBar/SideBar.css';

/**
 * SideBar component
 */
class SideBar extends PureComponent
{  
    constructor(props)
    {
        super(props);

        // Field representing the 'score' that will get calculated
        this.score = {
                        id: "score", 
                        // containerId: this.props.containerId,
                        loadingId: this.props.loaderId,
                        amount: this.props.score
                     };
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                    }}>

                        {/* the actual score */}
                        <h6 id={this.score.id}
                            style={{
                                fontSize: '5vw',
                            }}>
                            {this.props.score}
                        </h6>

                        <LoadingAnimation id={this.props.loaderId}/>

                    </div>

                </div>
            </div>
        );
    };
};
export default SideBar;
