// Module imports
import React from "react";
import {Formik, Field} from "formik";
import {FiEdit} from "react-icons/fi";
import { withRouter } from "react-router-dom";
import {FaPlay} from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import JsonSchemaEditor from "@optum/json-schema-editor";

// Component imports
import NumberedTextArea from "../Previews/NumberedTextArea";
import Case from "./Case";
import {CaseCheckOptions} from "./Case";
import {ViewAllCasesPath, EditCasePath, DetailsPath} from "../../App";
import CaseLoadingAnimation from "../Animations/CaseLoadingAnimation"
import Error from "../ErrorHandling/Error";
import {CheckOptions} from "../Tool/FormUtils";

// CSS imports
import "../css/Cases/ViewCaseForm.css";


/**
 * Component for displaying the form to view/modify an existing case.
 */
class ViewCaseForm extends React.Component {

    constructor(props) {
        super(props);
        let obj = props.case;
        this.state = {
            caseObject: obj,
            id: obj.id,
            caseName: obj.caseName,
            expectedResponseBody: obj.expectedResponseBody,
            expectedResponseHeader: obj.expectedResponseHeader,
            givenRequestBody: obj.givenRequestBody,
            givenRequestHeader: obj.givenRequestHeader,
            method: obj.method,
            url: obj.url,
            readOnlySchema: !obj[CaseCheckOptions.FIVE],
            
        };
        this.schema = obj.schemaBody;

        this.edit = props.edit;
    }

    goToDetails = (e) => {
        this.props.history.push(DetailsPath+"/"+this.state.id);
    }

    // Renders the request method badge based on the method type.
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

    getSaveButton = (isSubmitting) => {
        let SaveButton;
        if (isSubmitting) {
            SaveButton = 
                <div className="new-case-submit">
                    <button type="Submit" disabled className="btn btn-primary">Save</button>
                </div>
        } else {
            SaveButton = 
                <div className="new-case-submit">
                    <button type="Submit" className="btn btn-primary">Save</button>
                </div>
        }
        return SaveButton;
    }

    getDeleteButton = (isSubmitting) => {
        let DeleteButton;
        if (isSubmitting) {
            DeleteButton = 
                <div className="delete-case-submit">
                    <button type="button" disabled className="btn btn-danger">Delete</button>
                </div>
        } else {
            DeleteButton = 
                <div className="delete-case-submit">
                    <button type="button" className="btn btn-danger" onClick={ () => {
                        Error.clear();
                        let isSuccess = Case.remove(this.state.caseObject);
                        if (isSuccess)
                            this.props.history.push(ViewAllCasesPath);
                        else
                            Error.set("Failed to remove test case '"+this.state.caseObject.caseName+"'");
                                
                    }}
                    >Delete</button>
                </div>
        }
        return DeleteButton;
    }

    render() {
        return ( 
            this.edit === false ? 
            this.renderViewCase_NotEditable() : 
            this.renderViewCase_Editable()
        );
    }

    editCase = (caseObj) => {
        Error.clear();
        try {
            Case.edit(caseObj);
        }
        catch (err) {
            Error.set(err.message);
            return false;
        }
        return true;
    }

    // Renders the test case in edit mode
    renderViewCase_Editable() {
        return (

            <div className="new-case-form">
                <div className="new-case-window">
                    <Formik 
                        initialValues={this.state.caseObject} 
                        onSubmit={(data,actions) => { 
                            data.schemaBody = this.schema;
                            console.log(data);
                            var bool = this.editCase(data);
                            actions.setSubmitting(false);
                            if (bool)
                                this.props.history.push(ViewAllCasesPath+"/"+this.state.id);
                        }}
                    >
                        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>

                                <div className="edit-buttons">
                                    {this.getSaveButton(isSubmitting)}
                                    {this.getDeleteButton(isSubmitting)}
                                </div>

                                {/** Case Name input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <div className="form-group">
                                        <label htmlFor="CaseNameInput">Case Name</label>
                                        <input defaultValue={this.state.caseName} type="input" className="form-control" 
                                               aria-describedby="CaseName" placeholder='Example: "Test Case 1"' 
                                               onChange={e => setFieldValue("caseName", e.target.value)}
                                        />
                                    </div>
                                )}
                                </Field>

                                {/** URL input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <div className="form-group">
                                        <label htmlFor="URL-Input">URL</label>
                                        <input defaultValue={this.state.url} type="input" className="form-control" 
                                               aria-describedby="URL" placeholder='Example: "https://api.github.com"' 
                                               onChange={e => setFieldValue("url", e.target.value)}
                                        />
                                    </div>
                                )}
                                </Field>

                                {/** HTTP Method input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <div className="form-group new-case-method-select">
                                        <label htmlFor="HTTP-method">HTTP Method</label>
                                        <select defaultValue={this.state.method} onChange={e => setFieldValue("method", e.target.value)} 
                                                className="form-control">
                                            <option value="GET">GET</option>
                                            <option value="POST">POST</option>
                                            <option value="PUT">PUT</option>
                                            <option value="PATCH">PATCH</option>
                                            <option value="DELETE">DELETE</option>
                                        </select>
                                    </div>
                                )}
                                </Field>

                                <Field>
                                    {({ form: { setFieldValue } }) => (
                                        <CheckOptions 
                                            name="Checks"
                                            onChange={setFieldValue} 
                                            valueToChange="checks"
                                            optionValues={[
                                                values[CaseCheckOptions.ONE],
                                                values[CaseCheckOptions.TWO],
                                                values[CaseCheckOptions.THREE],
                                                values[CaseCheckOptions.FOUR],
                                                values[CaseCheckOptions.FIVE]
                                            ]}
                                            readOnlySchema={bool => {
                                                this.setState({readOnlySchema: bool});
                                            }}
                                        />
                                    )}
                                </Field>

                                <Field>
                                    {({ form: { setFieldValue } }) => {
                                        var s;
                                        try {
                                            s = JSON.parse(this.schema)
                                        } catch (err) {
                                            s = {}
                                        }
                                        return (
                                        <JsonSchemaEditor 
                                            data={s}
                                            key={this.state.readOnlySchema} 
                                            schemaRoot="http://json-schema.org/draft-07/schema" 
                                            onSchemaChange={e => {
                                                this.schema = e;
                                            }} 
                                            readOnly={this.state.readOnlySchema}
                                        />)
                                    }}
                                </Field>

                                <table className="new-case-form-table"><tbody>
                                <tr>
                                <td>
                                    {/** Request header input */}
                                    <NumberedTextArea value={this.state.givenRequestHeader} title="Request Header" name="givenRequestHeader"/>
                                </td>
                                <td>
                                    {/** Request body input */}
                                    <NumberedTextArea value={this.state.givenRequestBody} title="Request Body" name="givenRequestBody"/>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    {/** Response header input */}
                                    <NumberedTextArea value={this.state.expectedResponseHeader} title="Expected Response Header" name="expectedResponseHeader"/>
                                </td>

                                <td>
                                    {/** Response body input */}
                                    <NumberedTextArea value={this.state.expectedResponseBody} title="Expected Response Body"name="expectedResponseBody"/>
                                </td>
                                </tr>
                                </tbody></table>

                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }

    runCase = async (testCase) => {

        document.getElementById("pass_"+testCase.id).style.display = 'none';
        document.getElementById("fail_"+testCase.id).style.display = 'none';
        document.getElementById("run_"+testCase.id).style.display = 'none';
        CaseLoadingAnimation.toggle(testCase.id);
        
        var errors = await Case.execute(testCase);
        if (errors.length === 0)
            document.getElementById("pass_"+testCase.id).style.display = 'block';
        else {
            document.getElementById("fail_"+testCase.id).style.display = 'block';
        }
        console.log(errors);
        // testCase.errors = errors;
        // Case.edit(testCase);

        CaseLoadingAnimation.toggle(testCase.id);
        document.getElementById("run_"+testCase.id).style.display = 'block';
        document.getElementById("details-btn").style.display = 'inline-block';
    }

    // Renders the test case in View Mode (not-editable)
    renderViewCase_NotEditable() {
        return (

            <div className="case-form">
                <div className="case-window">
                    <table className="case-info-table">
                        <tbody>
                            <tr>
                                <td className="info-table-method">{this.renderRequestMethod(this.state.method)}</td>
                                <td className="info-table-url"><div>{this.state.url}</div></td>
                                <td className="info-table-edit-btn">
                                    <button type="button" className="btn" 
                                            data-toggle="tooltip" data-placement="top" 
                                            title="Edit Test" onClick={() => {
                                                this.props.history.push(EditCasePath+"/"+this.state.id);
                                            }}><FiEdit/>
                                    </button>
                                </td>
                                <td className="td-run" >
                                    <CaseLoadingAnimation id={this.state.id}/>
                                    <button id={"run_"+this.state.id} type="button" onClick={() => {this.runCase(this.state.caseObject)}} className="btn" data-toggle="tooltip" data-placement="top" title="Run Test"><FaPlay/></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="status-container">
                        <div className="td-pass" id={"pass_"+this.state.id}>
                            <label className="badge badge-success">PASSED</label>
                        </div>
                        <div className="td-fail" id={"fail_"+this.state.id}>
                            <label className="badge badge-danger">FAILED</label>
                        </div>
                        <button id="details-btn" className="btn btn-primary btn-sm" onClick={this.goToDetails}>Details&nbsp;<CgDetailsMore size="20"/></button>
                    </div>
                    <br/>
                    <br/>
                    <Formik>
                    <table>
                        <tbody>
                            <tr className="tr-view-header-body">
                                <td className="view-header-body">
                                    {/** Request header input */}
                                    <NumberedTextArea value={this.state.givenRequestHeader} title="Request Header" name="view-header-body" edit="false"/>
                                </td>
                                <td className="view-header-body">
                                    {/** Request body input */}
                                    <NumberedTextArea value={this.state.givenRequestBody} title="Request Body" name="view-header-body" edit="false"/>
                                </td>
                                </tr>
                                <tr>
                                <td className="view-header-body">
                                    {/** Response header input */}
                                    <NumberedTextArea value={this.state.expectedResponseHeader} title="Expected Response Header" name="view-header-body" edit="false"/>
                                </td>

                                <td className="view-header-body">
                                    {/** Response body input */}
                                    <NumberedTextArea value={this.state.expectedResponseBody} title="Expected Response Body"name="view-header-body" edit="false"/>
                                </td>
                                </tr>
                        </tbody>
                    </table>
                    </Formik>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewCaseForm);