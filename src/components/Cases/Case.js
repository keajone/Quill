import uuid from "uuid";
import React from "react";
import {Validator} from "jsonschema";
import Ajv from 'ajv'

import HTTP from "../../http/http";
import ErrorHTTP from "../ErrorHandling/ErrorHTTP";
import ErrorAnyResponseBody from "../ErrorHandling/ErrorAnyResponseBody";
import ErrorExpectedResponseBody from "../ErrorHandling/ErrorExpectedResponseBody";
import ErrorAnyResponseHeader from "../ErrorHandling/ErrorAnyResponseHeader";
import ErrorExpectedResponseHeader from "../ErrorHandling/ErrorExpectedResponseHeader";
import ErrorSchema from "../ErrorHandling/ErrorSchema";

export const CaseCheckOptions = {
    ONE: 'returns-any-response-body',
    TWO: 'returns-expected-response-body',
    THREE: 'returns-any-response-header',
    FOUR: 'returns-expected-response-header',
    FIVE: 'returns-response-body-schema',
};

/**
 * This class is used for representation of Case objects. 
 * It contains methods that return case configurations 
 * from default or adding a new case.
 */
class Case {

    static default_caseName = "";
    static default_method = "GET";
    static default_url = "";
    
    static default_givenRequestHeader = 
    '{\n  "Content-Type": "application/json; charset=utf-8"\n}';

    static default_givenRequestBody = "";

    static default_expectedResponseHeader = "";
    static default_expectedResponseBody = "";

    static default_errors = [];

    static cases = [];

    constructor(jsonObject) {

        try {

            // theres a bug where some "included" fields dont exist
            function removeSomeFields(obj) {
                var properties = obj["properties"]
                var required = obj["required"]
                console.log(properties)
                console.log(required)
                for (let i=0; i<required.length; i++) {
                  if (required[i] in properties) {}
                  else {
                      required.splice(i, 1)
                  }
                }
                console.log(properties)
                console.log(required)
                for (let prop in properties) {
                    if (prop.type === "object") {
                        removeSomeFields(prop);
                    }
                }
            }
            if (jsonObject.schemaBody !== "{}") {
                var s = JSON.parse(jsonObject.schemaBody)
                removeSomeFields(s)
                jsonObject.schemaBody = JSON.stringify(s);
            }
            Case.verify(jsonObject);
        }
        catch (err) {
            throw new Error(err);
        }
        this.jsonObject = jsonObject;
        this.id = jsonObject.id;
        this.caseName = jsonObject.caseName;
        this.method = jsonObject.method;
        this.url = jsonObject.url;
        this.givenRequestBody = jsonObject.givenRequestBody;
        this.givenRequestHeader = jsonObject.givenRequestHeader;
        this.expectedResponseBody = jsonObject.expectedResponseBody;
        this.expectedResponseHeader = jsonObject.expectedResponseHeader;
    }

    static verify = (caseObj) => {
        if (caseObj.id === "") {
            throw new Error("Case ID is invalid.");
        }
        if (caseObj.caseName === "") {
            throw new Error("Must give valid Case Name.");
        }
        if (caseObj.method !== "GET" &&
            caseObj.method !== "POST" &&
            caseObj.method !== "PUT" &&
            caseObj.method !== "PATCH" &&
            caseObj.method !== "DELETE") {
            throw new Error("Case method is invalid.");
        }
        if (caseObj.url === "") {
            throw new Error("Must give valid URL.");
        }

        // if (this.givenRequestHeader === "") {
        //     throw new Error("Must give valid Request Header.");
        // }

        if (caseObj.givenRequestBody === "" && caseObj.method !== "GET") {
            throw new Error("Must give valid Request-Body when using HTTP method '"+caseObj.method+"'.");
        }

        // if (this.expectedResponseHeader === "") {
        //     throw new Error("Must give valid Expected Response Header.");
        // }

        // if (this.givenRequestBody === "") {
        //     throw new Error("Must give valid Expected Response Body.");
        // }

        /** validate the passed in schema */
        if (caseObj[CaseCheckOptions.FIVE] === true) {
            
            try {
                const ajv = new Ajv()
                var k = JSON.parse(caseObj.schemaBody)

                // Get rid of some meta that could cause dumb failures (for now)
                function removeMeta(obj) {
                    for(let prop in obj) {
                      if (prop === '$schema' || prop === '$id')
                        delete obj[prop];
                      else if (typeof obj[prop] === 'object')
                        removeMeta(obj[prop]);
                    }
                }
                removeMeta(k)
                const validate = ajv.compile(k)
            } catch (err) {
                console.log(err)
                throw new Error("Must construct a valid schema.");
            }
            
                
        }
    }

    static getAll = () => {
        if (sessionStorage.getItem('cases') !== null)
            return JSON.parse(sessionStorage.getItem('cases'));
        else
            return [];
    }

    addToLocalStorage = () => {
        if (sessionStorage.getItem('cases')) {
            Case.cases = JSON.parse(sessionStorage.getItem('cases'));
            Case.cases.push(this.jsonObject);
            sessionStorage.setItem('cases',JSON.stringify(Case.cases));
        } else {
            sessionStorage.setItem('cases',JSON.stringify([this.jsonObject]));   
        }
    }

    static remove = (caseObj) => {
        try {
            let array = JSON.parse(sessionStorage.getItem('cases'));
            array = array.filter(function( obj ) {
                return obj.id !== caseObj.id;
            });
            sessionStorage.setItem('cases', JSON.stringify(array));

            let array2 = JSON.parse(sessionStorage.getItem('Suites'));
            for (let i=0; i < array2.length; i++) {
                array2[i].caseList = array2[i].caseList.filter(function (obj) {
                    return obj.id !== caseObj.id;
                })
            }
            sessionStorage.setItem('Suites', JSON.stringify(array2));
            return true;
        }
        catch (err) {
            console.log(err)
            return false;
        }
    }

    static edit = (caseObj) => {
        try {

            // theres a bug where some "included" fields dont exist
            function removeSomeFields(obj) {
                var properties = obj["properties"]
                var required = obj["required"]
                if (required !== undefined) {
                    for (let i=0; i<required.length; i++) {
                        if (required[i] in properties) {}
                        else {
                            required.splice(i, 1)
                        }
                    }
                }
                console.log(properties)
                console.log(required)
                if (properties !== undefined) {
                    for (let prop in properties) {
                        if (prop.type === "object") {
                            removeSomeFields(prop);
                        }
                    }
                }
            }
            if (caseObj.schemaBody !== "{}") {
                var s = JSON.parse(caseObj.schemaBody)
                removeSomeFields(s)
                removeSomeFields(s)
            }
            caseObj.schemaBody = JSON.stringify(s);


            // verify the change
            this.verify(caseObj);

            // Update test case
            let array = JSON.parse(sessionStorage.getItem('cases'));
            if (array.length > 0) {
                for (var i in array) {
                    if (array[i].id === caseObj.id) {
                        array[i] = caseObj;
                        break;
                    }
                }
                sessionStorage.setItem('cases', JSON.stringify(array));
                
                // Update the case lists inside suites
                let array2 = JSON.parse(sessionStorage.getItem('Suites'));
                if (array2 !== null) {
                    for (let j=0; j < array2.length; j++) {
                        for (var h in array2[j].caseList) {
                            if (array2[j].caseList[h].id === caseObj.id) {
                                array2[j].caseList[h] = caseObj;
                                break;
                            }
                        }
                    }
                }
                sessionStorage.setItem('Suites', JSON.stringify(array2));
            }
        }
        catch (err) {
            console.log(err)
            throw err;
        }
        return false;
        
    }

    static execute = async (testCase) => {

        var errors = [];
        
        try {
            // make request
            var http = new HTTP(
                testCase.givenRequestHeader,
                testCase.givenRequestBody,
                testCase.method, testCase.url);
            await http.request();
        }
        catch (err) {
            console.log(err.stack)
            // testCase.responseBody = http.responseBody;
            errors.push(<ErrorHTTP case={testCase} message={err.stack}/>);
            return errors;
        }
        testCase.responseBody = http.responseBody;
        testCase.responseHeader = http.responseHeader;

        /**
         * Perform checks based on configuration of test case
         */

        // Any response body was returned
        if (testCase[CaseCheckOptions.ONE] === true) {
            if (testCase.responseBody.length === 0)
                // throw new Error("No response body returned.");
                errors.push(<ErrorAnyResponseBody case={testCase} message="No response body returned."/>);
        }
        // Expected response body
        if (testCase[CaseCheckOptions.TWO] === true) {
            if (
                JSON.stringify(JSON.parse(testCase.responseBody), null, 2) !== 
                JSON.stringify(JSON.parse(testCase.expectedResponseBody), null, 2)
            )
                errors.push(<ErrorExpectedResponseBody case={testCase} message="Response body doesn't match the expected value."/>);
            
        }
        // Any response header was returned
        if (testCase[CaseCheckOptions.THREE] === true) {
            if (testCase.responseHeader.length === 0)
                // throw new Error("No response header(s) returned.");
                errors.push(<ErrorAnyResponseHeader case={testCase} message="No response header(s) returned."/>);
        }
        // Expected response header
        if (testCase[CaseCheckOptions.FOUR] === true) {
            if (
                JSON.stringify(JSON.parse(testCase.responseHeader), null, 2) !== 
                JSON.stringify(JSON.parse(testCase.expectedResponseHeader), null, 2)
            )
                // throw new Error();
                errors.push(<ErrorExpectedResponseHeader case={testCase} message="Response header(s) doesn't match the expected value."/>);
        }
        // Response Body Schema
        if (testCase[CaseCheckOptions.FIVE] === true) {
            let v = new Validator();
            try {
                var instance = JSON.parse(testCase.responseBody);
                // var instance = {one: 1, two: 2};
                var schema = JSON.parse(testCase.schemaBody);

                // Get rid of some meta that could cause dumb failures (for now)
                function removeMeta(obj) {
                    for(let prop in obj) {
                      if (prop === '$schema' || prop === '$id')
                        delete obj[prop];
                      else if (typeof obj[prop] === 'object')
                        removeMeta(obj[prop]);
                    }
                }
                removeMeta(schema)
                console.log(schema);                
                var errorList = v.validate(instance, schema).errors;
                if (errorList.length > 0) {
                    errors.push(<ErrorSchema case={testCase} message="Schema validation failed." errors={errorList}/>)
                }
            } catch (err) {
                console.log(err)
                var errorList = [{ message: "Response body not in JSON format." }]
                errors.push(<ErrorSchema case={testCase} message="Schema validation failed." errors={errorList}/>)
            }
        }

        return errors;
    }

    // Returns an empty case configuration
    static getEmptyCase = () => {
        var emptyCase = {
            id: uuid(), 
            caseName: this.default_caseName,
            url: this.default_url,
            method: this.default_method,
            givenRequestBody: this.default_givenRequestBody,
            givenRequestHeader: this.default_givenRequestHeader,
            expectedResponseHeader: this.default_expectedResponseHeader,
            expectedResponseBody: this.default_expectedResponseBody,
            errors: this.default_errors,
            schemaBody: "{}",
        };
        emptyCase[CaseCheckOptions.ONE] = false;
        emptyCase[CaseCheckOptions.TWO] = false;
        emptyCase[CaseCheckOptions.THREE] = false;
        emptyCase[CaseCheckOptions.FOUR] = false;
        emptyCase[CaseCheckOptions.FIVE] = false;

        return emptyCase;
    };
    
}

export default Case;