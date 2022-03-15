// [React]
import React, {PureComponent} from 'react';

// [Components]
import Canvas from '../Canvas/Canvas'
import SideBar from '../SideBar/SideBar'
import LoadingAnimation from "../Animations/LoadingAnimation";
import HTTP from "../../http/http";

// [CSS]
import '../css/Tool/Main.css';

class Main extends PureComponent
{
    constructor(props)
    {
        super(props);

        this.sideBarLoaderId = "side-bar-loader";

        this.state = {
            score: 0,
            string: '',
            predictedString: ''
        };

        this.scoreCanvasDrawing = this.scoreCanvasDrawing.bind(this);
    };

    // Function to toggle a loading animation to signal that 
    // the image is being sent to backend and scored.
    toggleLoadingAnimation = () =>
    {
        LoadingAnimation.toggle(this.sideBarLoaderId);
    };

    // Send request to backend to score drawing, then set new score
    scoreCanvasDrawing = async (imageURL) =>
    {
        // Send request to backend of the image
        try
        {
            var method = "POST";
            
            //Get the URL
            var url = "http://127.0.0.1:5000/";
            if (url.length === 0)
                throw Error("Error with url");

            //Get the request header
            var header
            try { header = "" }
            catch (err) { throw Error("Error creating request header. " + err.message); }

            //Get the request body
            var body
            try
            {
                body =  { "URL": imageURL };
                
                //DEBUGGING
                // body = "";
            }
            catch (err) { throw Error("Error creating request body. " + err.message); }

            //Make request
            var http = new HTTP(header, body, method, url);
            await http.request();

            //Check the predicted string to see if anything was predicted
            if (http.responseBody.predictedString === '') throw Error("Nothing was predicted.");

            console.log(http.responseBody);
        }
        catch (err)
        { 
            console.log(err);
            http.setScore("N/A");
        }

        // Set the score in the SideBar
        this.setState(state => ({
            score: http.responseBody.score
        }));
    }

    // Renders the Main component consisting of a side bar
    // and the main drawing canvas.
    render = () =>
    {
        return (
            <div className="Main">

                <div className="main-container">

                    <div className="side-container">
                        <SideBar loaderId={this.sideBarLoaderId} 
                                 score={this.state.score} />
                    </div>

                    <div className="canvas-container">
                        <Canvas toggleLoadingAnimation={this.toggleLoadingAnimation} 
                                scoreCanvasDrawing={this.scoreCanvasDrawing} />
                    </div>

                </div>

            </div>
        );
    };
};

export default Main;