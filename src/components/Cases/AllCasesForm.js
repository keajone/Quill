// Module imports
import React from "react";
import {BsSearch} from "react-icons/bs";
import {FiEdit} from "react-icons/fi";
import {FaPlay} from "react-icons/fa";
import {FcCheckmark} from "react-icons/fc";
import {ImCross} from "react-icons/im";
import { withRouter } from "react-router-dom";

// Component imports
import Case from "../Cases/Case";
import CaseLoadingAnimation from "../Animations/CaseLoadingAnimation";
import {ViewAllCasesPath, EditCasePath} from "../../App";

// CSS imports
import "../css/Cases/AllCasesForm.css";

/**
 * Component for displaying the form to add a new case.
 */
class AllCasesForm extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            caseList: Case.getAll(),
            search: "",
        };
    }

    runCase = async (testCase) => {

        document.getElementById("pass_"+testCase.id).style.display = 'none';
        document.getElementById("fail_"+testCase.id).style.display = 'none';

        try {
            document.getElementById("run_"+testCase.id).style.display = 'none';
            CaseLoadingAnimation.toggle(testCase.id);
            var errors = await Case.execute(testCase);
            if (errors.length > 0)
                throw new Error();
            document.getElementById("pass_"+testCase.id).style.display = 'block';
        }
        catch (err) {
            document.getElementById("fail_"+testCase.id).style.display = 'block';
        }
        document.getElementById("run_"+testCase.id).style.display = 'block';
        CaseLoadingAnimation.toggle(testCase.id);
    }

    runAllCases = async (testCaseList) => {

        document.getElementById("run-all-cases-btn").style.display = 'none';
        CaseLoadingAnimation.toggle("run-all-cases-spnr");

        for (let i = 0; i < testCaseList.length; i++) {
            await this.runCase(testCaseList[i]);
        }
        document.getElementById("run-all-cases-btn").style.display = 'block';
        CaseLoadingAnimation.toggle("run-all-cases-spnr");
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

    renderCases = (testCase) => {
        return (
            <div key={testCase.id} className="case-item">
                <ul>
                    <li className="li-name" onClick={() => 
                        {   // will change page to load the case details
                            this.props.history.push(ViewAllCasesPath+"/"+testCase.id);
                        }}>
                        <label>{testCase.caseName}</label>
                    </li>
                    <li className="li-method"onClick={() => 
                        {
                            this.props.history.push(ViewAllCasesPath+"/"+testCase.id);
                        }}>
                        {this.renderRequestMethod(testCase.method)}
                    </li>
                    <li className="li-url"onClick={() => 
                        {
                            this.props.history.push(ViewAllCasesPath+"/"+testCase.id);
                        }}>
                        <label>{testCase.url}</label>
                    </li>
                    <li className="li-edit">
                        <button type="button" className="btn" data-toggle="tooltip" 
                                data-placement="top" title="Edit Test" onClick={() => 
                                {   // edit the case 
                                    this.props.history.push(EditCasePath+"/"+testCase.id);
                                }}>
                                <FiEdit/>
                        </button>
                    </li>
                    <li className="li-run" >
                        <CaseLoadingAnimation id={testCase.id}/>
                        <button id={"run_"+testCase.id} type="button" onClick={() => {this.runCase(testCase)}} className="btn" data-toggle="tooltip" data-placement="top" title="Run Test"><FaPlay/></button></li>
                    <li className="li-pass" id={"pass_"+testCase.id}>
                        <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Success"><FcCheckmark size="30"/></button>
                    </li>
                    <li className="li-fail" id={"fail_"+testCase.id}>
                        <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Failure"><ImCross color="red"/></button>
                    </li>
                </ul>
            </div>
        );
    }

    handleSearchChange = e => {
        this.setState({search: e.target.value});
    }

    render() {

        // Searching
        const {search} = this.state;
        const filteredCases = this.state.caseList.filter(testCase => {
            return (
                testCase.caseName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                testCase.url.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                testCase.method.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
        });

        return (
            <div>
                <table className="view-cases-table-header">
                    <tbody>
                        <tr>
                            {/** Search Bar */}
                            <td className="case-search">
                                <div className="form-group has-search">
                                    <span className="form-control-feedback"><BsSearch/></span>
                                    <input className="form-control" type="text" 
                                        placeholder="Search" aria-label="Search"
                                        onChange={this.handleSearchChange}/>
                                </div>
                            </td>

                            {/** Run all cases */}
                            <td className="run-all-container">
                                <div>
                                    <button id="run-all-cases-btn" type="button" onClick={() => {this.runAllCases(filteredCases)}} className="btn btn-dark" data-toggle="tooltip" data-placement="top" title="Run All Tests">
                                        <FaPlay/>&nbsp;&nbsp;Run All
                                    </button>
                                    <span id="run-all-cases-spnr"><CaseLoadingAnimation id="run-all-cases-spnr"/></span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <ul className="label-header-list">
                        <li id="name"><label>Name</label></li>
                        <li id="method"><label>Method</label></li>
                        <li id="url"><label>URL</label></li>
                        <li id="edit"><label>Edit</label></li>
                        <li id="run"><label>Run</label></li>
                        <li id="status"><label>Status</label></li>
                    </ul>
                </div>
                
                <div className="case-list">
                    {(filteredCases.length > 0) ? 
                    (
                        filteredCases.map( c => {
                            return this.renderCases(c);
                        })
                    ) : 
                    (
                        // No results from search
                        <div className="case-item">
                            <ul><li><label>No Results</label></li></ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(AllCasesForm);