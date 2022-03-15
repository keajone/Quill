// [React]
import React, {PureComponent} from 'react';
import { useNavigate } from "react-router-dom";

// [Components]
import NavBar from "../Tool/NavBar"
import FadingAlphabet from './FadingAlphabet';
import LoadingAnimation from '../Animations/LoadingAnimation';
import HTTP from '../../http/http';
import ScoreModal from './ScoreModal';

// [Paths]
import { FadingAlphabetPath } from '../../App';

// [CSS]
import '../css/Canvas/FadingAlphabet.css';

/**
 * Controller for the Fading Alphabet Exercise.
 */
class FadingAlphabetController extends PureComponent
{
    constructor(props)
    {
        super(props);

        // take character series from URL
        this.character = window.location.pathname.split('/')[3];
        
        // characters that will be practiced
        this.characters = [
            "Aa","Bb","Cc","Dd","Ee","Ff",
            "Gg","Hh","Ii","Jj","Kk","Ll",
            "Mm","Nn","Oo","Pp","Qq","Rr",
            "Ss","Tt","Uu","Vv","Ww","Xx",
            "Yy","Zz"
        ];

        // ID for side bar loading animation
        this.sideBarLoaderId = "fading-alphabet-side-bar-loader";

        // ID for side bar character series box
        this.characterBoxID = "fading-alphabet-character-box";

        // Acceptable score for moving onto next character series
        this.acceptableScore = 90;

        this.state = {
            character: this.character,
            progressPercentageOverall: 0
        };

        this.scoreCanvasDrawings = this.scoreCanvasDrawings.bind(this);
        this.score = undefined;
    };

    // Called whenever component DOM updates, i.e. URL path changes
    componentDidUpdate()
    {
        // Reset the character series after URL path changes
        //
        // .../FadingAlphabet/Aa   --->   "Aa"
        // .../FadingAlphabet/Cc   --->   "Cc"
        //
        this.setState({
            character: window.location.pathname.split('/')[3]
        });
    };

    // Toggle a loading animation to signal that 
    // the image is being sent to backend and scored.
    toggleLoadingAnimation = () =>
    {
        LoadingAnimation.toggle(this.sideBarLoaderId);
    };

    // Toggle disabling/enabling of main submit button
    toggleSubmitButton = () =>
    {
        let el = document.getElementById(this.state.character+"_submitButton");
        el.disabled = !el.disabled ? true : false;
    };

    // Toggle display of character box
    toggleCharacterBox = () =>
    {
        let el = document.getElementById(this.characterBoxID);
        if (el.style.display === 'block' || el.style.display === '')
            el.style.display = 'none';
        else if (el.style.display === 'none')
            el.style.display = 'block';
    };

    // Adjust the percentage in the progress bar OVERALL
    adjustProgressPercentageOverall = (num) =>
    {
        this.setState(state => ({
            progressPercentageOverall: state.progressPercentageOverall += num
        }));
    };

    // Handle the action of when submit is clicked on the canvas
    handleSubmitClick = (drawingRefs) =>
    {
        // Disable the Submit button
        this.toggleSubmitButton();

        // Make room for the spinner
        this.toggleCharacterBox();

        // Toggle the Loading Animation in the SideBar
        this.toggleLoadingAnimation();

        // Send request for a score of canvas drawings
        this.scoreCanvasDrawings(drawingRefs);

        // Toggles
        this.toggleLoadingAnimation();
        this.toggleCharacterBox();
        this.toggleSubmitButton();

        // Trigger the correct modal
        if (this.score >= this.acceptableScore)
        {
            window.$("#SuccessScoreModal").modal();
        }
        else
        {
            window.$("#FailureScoreModal").modal();
        }
    };

    // Handle navigating to next letter series
    handleNext = () =>
    {
        // find index of next character series
        let nextCharIndex = this.characters.findIndex(x=>x===this.state.character)+1;
        // navigate there
        this.props.navigate(FadingAlphabetPath+"/"+this.characters[nextCharIndex]);
        // adjust percentage of overall score
        this.adjustProgressPercentageOverall(20); // 20 is ARBITRARY, only 5 letters so far
    };

    // Handle the retry of the current character series
    handleRetry = () =>
    {
        this.props.navigate(FadingAlphabetPath+"/"+this.state.character);
    };

    // Send request to backend to score the drawings, then set new score
    scoreCanvasDrawings = async (drawingRefs) =>
    {
        // Send request to backend of the image
        try
        {
            var method = "POST";
            var url = "http://127.0.0.1:5000/FadingAlphabet/";
            var header = "";
            var body = {
                        "URL_1": drawingRefs[0].getDataURL(),
                        "URL_2": drawingRefs[1].getDataURL(),
                        "URL_3": drawingRefs[2].getDataURL()
                       };
            
            // Make the request
            var http = new HTTP(header, body, method, url);
            //await http.request();

            // Check the predicted string to see if anything was predicted
            if (http.responseBody.predictedString === '') throw Error("Nothing was predicted.");

            console.log(http.responseBody);
        }
        catch (err)
        { 
            console.log(err);
            http.setScore("N/A");
        }

        // Set the score in the SideBar
        this.score = 90;
        this.setState(state => ({
            score: this.score
        }));
    }

    // Renders the FadingAlphabetController component
    render = () =>
    {
        return (
            <div className="FadingAlphabetController">

                <NavBar />
                {this.characters.includes(this.state.character)
                    
                    ?   <FadingAlphabet character={this.state.character}
                                        progressPercentageOverall={this.state.progressPercentageOverall}
                                        handleSubmit={this.handleSubmitClick}
                                        sideBarLoaderId={this.sideBarLoaderId}
                                        characterBoxID={this.characterBoxID}/>
                    
                    :   // Trying to navigate to a series that doesn't exst.
                        // i.e. 'Ab' or '&*'
                        "Problem with URL: "+this.state.character+" was not found."
                }

                {/** Modals are hidden until submit button is clicked */}
                <ScoreModal id={"SuccessScoreModal"} state={this.state} 
                            handleNext={this.handleNext} isSuccess={true}/>
                <ScoreModal id={"FailureScoreModal"} state={this.state}
                            handleRetry={this.handleRetry}/>

            </div>
        );
    };

    // Constructs image source filename from Phase and Character
    static getImgSrc(phase, character)
    {
        if (phase === 4 || phase === 5)
            return "/fadingAlphabet/letter_BLANK.png";
        else if (phase > 5 || phase < 1)
            // Shouldnt happen in this 'proof of concept' version.
            // undefined will create empty grid with no error.
            return undefined

        return "/fadingAlphabet/phase"+phase+"/letter_"+character+".png";
    };
};

/**
 * See https://stackoverflow.com/questions/63786452/react-navigate-router-v6-invalid-hook-call 
 * for why I decided to wrap my component with this function component.
 * 
 * It was so I would be able to use 'useNavigate' hook succesfully.
 */
function FadingAlphabetControllerWithNavigate(props) {
    let navigate = useNavigate();
    return <FadingAlphabetController navigate={navigate} />
};

export default FadingAlphabetControllerWithNavigate;
export {FadingAlphabetController};