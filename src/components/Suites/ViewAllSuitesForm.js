// Module imports
import React from "react";
import {BsSearch} from "react-icons/bs";
import {FaPlay} from "react-icons/fa";
import { withRouter } from "react-router-dom";

// Component imports
import Suite from "./Suite";
import CaseLoadingAnimation from "../Animations/CaseLoadingAnimation";
// import {ViewAllSuitesPath, EditSuitePath} from "../../App";
import SuiteTreeView from "./SuitesTreeView";
import {runSuite} from "./SuitesTreeView";

// CSS imports
import "../css/Suites/ViewAllSuitesForm.css";

/**
 * Component for displaying the form to add a new suite.
 */
class AllSuitesForm extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            suiteList: Suite.getAll(),
            search: "",
        };
    }

    runAllSuites = async (testSuiteList) => {

        document.getElementById("run-all-suites-btn").style.display = 'none';
        CaseLoadingAnimation.toggle("run-all-suites-spnr");

        for (let i = 0; i < testSuiteList.length; i++) {
            await runSuite(testSuiteList[i]);
        }
        document.getElementById("run-all-suites-btn").style.display = 'block';
        CaseLoadingAnimation.toggle("run-all-suites-spnr");
    }

    renderRequestMethod = (method) => {
        if (method === "GET")
            return (<label className="badge badge-primary">GET</label>);
        else if (method === "POST")
            return (<label className="badge badge-success">POST</label>);
        else if (method === "PUT")
            return (<label className="badge badge-danger">PUT</label>);
        else if (method === "PATCH")
            return (<label className="badge badge-info">PATCH</label>);
        else if (method === "DELETE")
            return (<label className="badge badge-dark">DELETE</label>);
        else
            return (<label className="badge badge-warning">{method}</label>);
    }

    handleSearchChange = e => {
        this.setState({search: e.target.value});
    }

    render() {

        // Searching
        const {search} = this.state;
        var filteredSuites
        if (this.state.suiteList !== null) {
            filteredSuites = this.state.suiteList.filter(testSuite => {
                return (
                    testSuite.SuiteName.toLowerCase().indexOf(search.toLowerCase()) !== -1
                )
            });
        } else {
            filteredSuites = [];
        }
        

        return (
            <div>
                <table className="view-suites-table-header">
                    <tbody>
                        <tr>
                            {/** Search Bar */}
                            <td className="suite-search">
                                <div className="form-group has-search">
                                    <span className="form-control-feedback"><BsSearch/></span>
                                    <input className="form-control" type="text" 
                                        placeholder="Search" aria-label="Search"
                                        onChange={this.handleSearchChange}/>
                                </div>
                            </td>

                            {/** Run all suites */}
                            <td className="run-all-container">
                                <div>
                                    <button id="run-all-suites-btn" type="button" onClick={() => {this.runAllSuites(filteredSuites)}} className="btn btn-dark" data-toggle="tooltip" data-placement="top" title="Run All Tests">
                                        <FaPlay/>&nbsp;&nbsp;Run All
                                    </button>
                                    <span id="run-all-suites-spnr"><CaseLoadingAnimation id="run-all-suites-spnr"/></span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <ul className="label-header-list">
                        <li id="name"><label>Name</label></li>
                        <li id="edit"><label>Edit</label></li>
                        <li id="run"><label>Run</label></li>
                        <li id="status"><label>Status</label></li>
                    </ul>
                </div>
                
                <div className="suite-list">
                    
                    {(filteredSuites.length > 0) ? 
                    (
                        <SuiteTreeView suites={filteredSuites}/>
                    ) : 
                    (
                        // No results from search
                        <div>
                            <ul className="no-results-ul"><li><label>No Results</label></li></ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(AllSuitesForm);