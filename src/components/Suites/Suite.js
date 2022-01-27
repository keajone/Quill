import uuid from "uuid";

/**
 * This class is used for representation of Suite objects. 
 * It contains methods that return Suite configurations 
 * from default or adding a new Suite.
 */
class Suite {

    static default_SuiteName = "";
    static default_Description = "";

    static Suites = [];

    constructor(jsonObject) {

        try {
            Suite.verify(jsonObject);
        }
        catch (err) {
            throw new Error(err);
        }

        this.jsonObject = jsonObject;
        this.id = jsonObject.id;
        this.SuiteName = jsonObject.SuiteName;
    }

    static verify = (suiteObj) => {
        if (suiteObj.id === "") {
            throw new Error("Suite ID is invalid.");
        }
        if (suiteObj.SuiteName === "") {
            throw new Error("Must give valid Suite Name.");
        }
    }

    static getAll = () => {
        return JSON.parse(sessionStorage.getItem('Suites'));
    }

    addToLocalStorage = () => {
        let s = sessionStorage.getItem('Suites');
        if (s !== undefined && s !== null && s !== "null") {
            Suite.Suites = JSON.parse(sessionStorage.getItem('Suites'));
            Suite.Suites.push(this.jsonObject);
            sessionStorage.setItem('Suites',JSON.stringify(Suite.Suites));
        } else {
            sessionStorage.setItem('Suites',JSON.stringify([this.jsonObject]));   
        }
    }

    static remove = (suiteToRemove) => {
        try {

            let array = JSON.parse(sessionStorage.getItem('Suites'));
            array = array.filter(function( obj ) {
                return obj.id !== suiteToRemove.id;
            });
            sessionStorage.setItem('Suites', JSON.stringify(array));
            return true;
        }
        catch (err) {
            return false;
        }
    }

    static edit = (SuiteObj) => {
        try {
            this.verify(SuiteObj);

            let array = JSON.parse(sessionStorage.getItem('Suites'));
            if (array.length > 0) {
                for (var i in array) {
                    if (array[i].id === SuiteObj.id) {
                        array[i] = SuiteObj;
                    break;
                    }
                }
                sessionStorage.setItem('Suites', JSON.stringify(array));
                return true;
            }
        }
        catch (err) {
            throw err;
        }        
    }

    static execute = async (testSuite) => {
        
        // // make request
        // var http = new HTTP(
        //     testSuite.givenRequestHeader,
        //     testSuite.givenRequestBody,
        //     testSuite.method, testSuite.url);
        // await http.request();

        // return;
    }

    // Returns an empty Suite configuration
    static getEmptySuite = () => {
        return {
            id: uuid(), 
            SuiteName: this.default_SuiteName,
            Description: this.default_Description,
            caseList: [],
            status: '',
        };
    };
    
}

export default Suite;