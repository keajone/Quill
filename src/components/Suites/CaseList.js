import React from "react";
import {BsSearch} from "react-icons/bs";

import Case from "../Cases/Case";

/**
 * This class is responsible for displaying the two column list of test cases. 
 * It allows the user to add and remove test cases from the suite. It is split
 * into two parts:
 * 
 *      Added:          test cases included in the test suite
 *      Un-Addded:      test cases NOT included in the test suite
 *
 */
class CaseList extends React.Component {
    constructor(props) {
        super(props);
        this.updateAddedList = props.onChange;
        this.list = props.caseList;
        this.fieldValue = props.valueToChange;

        let tmpList = [];
        let allCases = Case.getAll();
        for (let i=0; i<allCases.length; i++) {

            // check if the case is NOT included in the given case list
            if (!this.list.some(obj => obj.id === allCases[i].id)) {
                // add it to our "not-added" list
                tmpList.push(allCases[i]);
            }
        }

        this.state = {
            cases: Case.getAll(),
            NotAddedCases: tmpList,
            AddedCases: this.list,
            search: '',
        };
    }

    // handler for search bar
    handleSearchChange = e => {
        this.setState({search: e.target.value});
    }

    // Creates the correct badge for displaying the HTTP method
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

    // This renders the list of "un-added" test cases
    generateCaseList = () => {

        // Searching
        const {search} = this.state;
        const filteredCases = this.state.NotAddedCases.filter(testCase => {
            return (
                testCase.caseName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                testCase.url.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                testCase.method.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
        });

        if (filteredCases.length > 0) {
            const allCases = filteredCases.map(testCase => {
                return (
                    <div key={testCase.id} className="case-item-new-suite">
                        <ul>
                            <li className="case-item-new-suite-name"><label>{testCase.caseName}</label></li>
                            <li className="case-item-new-suite-url"><label>{testCase.url}</label></li>
                            
                            <li className="case-item-new-suite-method">{this.renderRequestMethod(testCase.method)}</li>
                            <li className="case-item-new-suite-add">
                                <button type="button" onClick={() => {this.addToAddedList(testCase.id)}} className="btn btn-success"><label>Add</label></button>
                            </li>
                        </ul>
                    </div>
                );
            });
            return allCases;
        } else {
            return <label>No Cases</label>;
        }
    }

    // This renders the list of "added" cases
    generateAddedCaseList = () => {

        const caseList = this.state.AddedCases;

        if (caseList.length > 0) {
            const allCases = caseList.map(testCase => {
                return (
                    <div key={testCase.id} className="case-item-new-suite">
                        <ul>
                            <li className="case-item-new-suite-name"><label>{testCase.caseName}</label></li>
                            <li className="case-item-new-suite-url"><label>{testCase.url}</label></li>
                            
                            <li className="case-item-new-suite-method">{this.renderRequestMethod(testCase.method)}</li>
                            <li className="case-item-new-suite-add">
                                <button type="button" onClick={() => {this.removeFromAddedList(testCase.id)}} className="btn btn-danger"><label>Remove</label></button>
                            </li>
                        </ul>
                    </div>
                );
            });
            return allCases;
        } else {
            return <label>No Cases</label>;
        }
    }

    // Adds a test case to the "added" list
    addToAddedList = (id) => {
        let copyListNA = this.state.NotAddedCases;
        let copyListA = this.state.AddedCases;

        const element = copyListNA.find(c => c.id === id);
        if (element !== undefined) {
            copyListNA.splice(copyListNA.indexOf(element),1);
            copyListA.unshift(element)
            this.setState({
                NotAddedCases: copyListNA,
                AddedCases: copyListA,
            });
            this.updateAddedList(this.fieldValue, copyListA);
        } else {
            // TODO: fill in the error box if this happens
            console.log("Failed to add to list");   
        }
    }

    // Removes the test case from the "added" list
    removeFromAddedList = (id) => {
        let copyListNA = this.state.NotAddedCases;
        let copyListA = this.state.AddedCases;

        const element = copyListA.find(c => c.id === id);
        if (element !== undefined) {
            copyListA.splice(copyListA.indexOf(element),1);
            copyListNA.unshift(element)
            this.setState({
                NotAddedCases: copyListNA,
                AddedCases: copyListA,
            });
            this.updateAddedList(this.fieldValue, copyListA);
        } else {
            // TODO: fill in the error box if this happens
            console.log("Failed to remove to list");   
        }
    }

    render() {
        return (
            <div className="new-suite-case-list">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className="form-group case-search-new-suite">
                                    <label>Add Cases to Suite</label>
                                    <span className="form-control-feedback"><BsSearch/></span>
                                    <input className="form-control" type="text" 
                                        placeholder="Search" aria-label="Search"
                                        onChange={this.handleSearchChange}/>
                                </div>
                                <div className="to-add-list">
                                    <ul>
                                    {this.generateCaseList()}
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div className="added-list">
                                    {this.generateAddedCaseList()}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CaseList;