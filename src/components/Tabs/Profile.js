import uuid from "uuid";

/**
 * This class is used for representation of profile tab 
 * objects. Its contains methods that return tab configurations 
 * from default or adding a new tab.
 */
class Profile {

    static default_Name = "Profile 1";
    static default_Method = "GET";
    static default_URL = "";
    
    static default_ResponseHeader = "";
    static default_ResponseHeaderMode = "javascript";
    static default_RequestHeader = 
    '{\n  "Content-Type": "application/json; charset=utf-8"\n}';
    
    static default_RequestHeaderMode = "javascript";

    static default_ResponseBody = "";
    static default_ResponseBodyMode = "javascript";
    static default_RequestBody = "";
    static default_RequestBodyMode = "javascript";

    // Returns the default tab configuration
    static getDefaultTab = () => {
        return {
            id: 1, 
            name: this.default_Name, 
            httpMethod: this.default_Method,
            url: this.default_URL,
            requestHeader: this.default_RequestHeader,
            requestBody: this.default_RequestBody,
            responseHeader: this.default_ResponseHeader,
            responseBody: this.default_ResponseBody,
            requestHeaderMode: this.default_RequestHeaderMode,
            requestBodyMode: this.default_RequestBodyMode,
            responseHeaderMode: this.default_ResponseHeaderMode,
            responseBodyMode: this.default_ResponseBodyMode,
        };
    };

    // Returns a new tab. Takes in counter value to ensure different name.
    static getNewTab = (counterValue) => {
        return {
            id: uuid(), 
            name: `Profile ${counterValue}`, 
            httpMethod: this.default_Method,
            url: this.default_URL,
            requestHeader: this.default_RequestHeader,
            requestBody: this.default_RequestBody,
            responseHeader: this.default_ResponseHeader,
            responseBody: this.default_ResponseBody,
            requestHeaderMode: this.default_RequestHeaderMode,
            requestBodyMode: this.default_RequestBodyMode,
            responseHeaderMode: this.default_ResponseHeaderMode,
            responseBodyMode: this.default_ResponseBodyMode,
        };
    };
    
}

export default Profile;