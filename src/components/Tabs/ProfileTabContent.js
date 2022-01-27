// Module imports
import React from "react";
import HTTP from "../../http/http";

// Component imports
import Tabs from "./Tabs";
import TextEditor from "../Previews/TextEditor";
import RenameModal from "./RenameModal";
import LoadingAnimation from "../Animations/LoadingAnimation";
import ErrorHandler from "../ErrorHandling/Error";

class ProfileTabContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tabs: props.tabs, currentTab: props.currentTab};
        this.handleEditorChange = props.handleEditorChange;
        this.handleHttpChange = props.handleHttpChange;
        this.handleUrlChange = props.handleUrlChange;
        this.handleNameChange = props.handleNameChange;
    }

    static getDerivedStateFromProps(props) {
        return {tabs: props.tabs, currentTab: props.currentTab};
    }

    // Handler function for when the send button is clicked.
    handleSendClick = async (e) => {
        var method, url, header, body;

        // Start loading animation
        this.toggleLoadingAnimation();

        // Hide error box (if it wasn't already)
        ErrorHandler.clear();

        try {
            //Get the method
            method = this.state.currentTab.httpMethod.toUpperCase();
            if (method !== "GET" &&
                method !== "POST" &&
                method !== "PUT" &&
                method !== "PATCH" &&
                method !== "DELETE")
                throw new Error("Must give valid HTTP method.");

            //Get the URL
            url = this.state.currentTab.url;
            if (url.length === 0)
                throw new Error("Must give valid URL.");

            //Get the request header
            try {
                if (this.state.currentTab.requestHeader.length > 0)
                    header = JSON.parse(this.state.currentTab.requestHeader);
            }
            catch (err) {
                throw new Error("Error parsing request header.");
            }

            //Get the request body
            try {
                if (this.state.currentTab.requestBody.length > 0)
                    body = JSON.parse(this.state.currentTab.requestBody);
            }
            catch (err) {
                throw new Error("Error parsing request body.");
            }

            //TODO: Add other options for an HTTP request. Put them here.
            //credentials
            //what else?

            //Make request
            // var http = new HTTP({}, {}, "GET", "https://api.github.com");
            var http = new HTTP(header, body, method, url);
            await http.request();

            //Set response header
            this.setResponseHeader(http.responseHeader);

            //Set response body
            this.setResponseBody(http.responseBody);
        }
        catch (err) {
            console.log(err);
            ErrorHandler.set(err.message);
        }
        
        // End loading animation
        this.toggleLoadingAnimation();
    }

    // Toggles loading animation to signal that a request has been made.
    toggleLoadingAnimation = () => {
        LoadingAnimation.toggle(this.state.currentTab.id);
    }

    // Updates the response header preview window.
    setResponseHeader = (value) => {
        // Currently I just set the response header 'as-is'
        this.handleEditorChange(value, "value", "responseHeader");
    }

    // Updates the response body preview window.
    setResponseBody = (value) => {
        try {
            // This works for JSON
            var object = JSON.parse(value);
            var newValue = JSON.stringify(object, null, 2);
            this.handleEditorChange(newValue, "value", "responseBody");
            this.handleEditorChange("javascript", "mode", "responseBody");
        }
        catch (err) {
            // Everything else...TODO: setting it to HTML preview for now.
            this.handleEditorChange(value, "value", "responseBody");
            this.handleEditorChange("htmlmixed", "mode", "responseBody");
        }
    }

    render() {
        return (
        <div className="tab-content">
            <div>
            <div className="tabs-content">

                    {/**  Rename modal  */}
                    <div className="form-group rename-btn">
                        <button type="button" className="btn btn-primary btn-sm" 
                                data-toggle="modal" data-target="#renameModal">
                                    Rename
                        </button>
                        <RenameModal handleNameChange={this.handleNameChange} tabs={this.state.tabs} currentTab={this.state.currentTab}/>
                    </div>

                    {/**  Method select  */}
                    <div className="form-group request-method-select">
                        <label>HTTP Method</label>
                        <select onChange={this.handleHttpChange} value={this.state.currentTab.httpMethod} className="form-control">
                            <option>GET</option>
                            <option>POST</option>
                            <option>PUT</option>
                            <option>PATCH</option>
                            <option>DELETE</option>
                        </select>
                    </div>

                    {/**  URL input */}
                    <div className="form-group request-url">
                        <label>URL</label>
                        <input onChange={this.handleUrlChange} value={this.state.currentTab.url} type="text" className="form-control" placeholder='Example: "https://api.github.com"' name="url-input" />
                    </div>

                    {/**  Send button  */}
                    <div className="form-group send-btn">
                        <button type="button" onClick={this.handleSendClick} className="btn btn-primary">SEND</button>
                    </div>
                    
                    <h4 id="request-header">Request</h4>
                    <h4 id="response-header">Response</h4>
                    <br/>
                    <Tabs tabType="tabs-request">

                        {/**  Request Body editor  */}
                        <div label="Body">
                            <TextEditor name="requestBody" readOnly={false} 
                                value={this.state.currentTab.requestBody} 
                                mode={this.state.currentTab.requestBodyMode} 
                                onValueChange={this.handleEditorChange} 
                                onModeChange={this.handleEditorChange}/>
                        </div>

                        {/**  Request Header editor  */}
                        <div label="Header">
                            <TextEditor name="requestHeader" readOnly={false} 
                                value={this.state.currentTab.requestHeader} 
                                mode={this.state.currentTab.requestHeaderMode} 
                                onValueChange={this.handleEditorChange} 
                                onModeChange={this.handleEditorChange}/>
                        </div>
                    </Tabs>
                    <Tabs tabType="tabs-response">

                        {/**  Response Body editor (Cannot edit)  */}
                        <div label="Body">
                            <TextEditor name="responseBody" readOnly="nocursor" 
                                value={this.state.currentTab.responseBody} 
                                mode={this.state.currentTab.responseBodyMode} 
                                onValueChange={this.handleEditorChange} 
                                onModeChange={this.handleEditorChange}/>
                        </div>

                        {/**  Response Header editor (Cannot edit)  */}
                        <div label="Header">
                            <TextEditor name="responseHeader" readOnly="nocursor" 
                                value={this.state.currentTab.responseHeader} 
                                mode={this.state.currentTab.responseHeaderMode} 
                                onValueChange={this.handleEditorChange} 
                                onModeChange={this.handleEditorChange}/>
                        </div>
                    </Tabs>
                    <LoadingAnimation id={this.state.currentTab.id}/>                
            </div>
            </div>
        </div>
        )
    }
}

export default ProfileTabContent;