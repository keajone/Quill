// Module imports
import React from "react";
import { Formik, Field } from "formik";
import { withRouter } from "react-router-dom";
import JsonSchemaEditor from "@optum/json-schema-editor";

// Component imports
import NumberedTextArea from "../Previews/NumberedTextArea";
import Case from "./Case";
import Error from "../ErrorHandling/Error";
import {ViewAllCasesPath} from "../../App";

// CSS imports
import "../css/Cases/NewCaseForm.css";
import { CheckOptions } from "../Tool/FormUtils";

/**
 * Component for displaying the form to add a new case.
 * 
 * https://www.youtube.com/watch?v=FD50LPJ6bjE&ab_channel=BenAwad
 */
class NewCaseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            readOnlySchema: true,
            schema: "{}",
        };
    }

    schema = "{}";

    newCase = (data) => {

        Error.clear();
        try {
            var object = new Case(data);
            object.addToLocalStorage();
        }
        catch (err) {
            console.log(err);
            Error.set(err.message);
            return false
        }
        return true;
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

    // static getDerivedStateFromProps(props) {
    //     return {tabs: props.tabs, currentTab: props.currentTab};
    // }

    render() {
        return (

            <div className="new-case-form">
                <div className="new-case-window">
                    <Formik 
                        initialValues={Case.getEmptyCase()} 
                        onSubmit={(data,actions) => {
                            data.schemaBody = this.schema;
                            var bool = this.newCase(data); 
                            actions.setSubmitting(false);
                            if (bool)
                                this.props.history.push(ViewAllCasesPath);
                        }}
                    >
                        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>

                                <div className="edit-buttons">
                                    {this.getSaveButton(isSubmitting)}
                                </div>

                                {/** Case Name input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <div className="form-group">
                                        <label htmlFor="CaseNameInput">Case Name</label>
                                        <input type="input" className="form-control" 
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
                                        <input type="input" className="form-control" 
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
                                        <select onChange={e => setFieldValue("method", e.target.value)} 
                                                className="form-control">
                                            <option>GET</option>
                                            <option>POST</option>
                                            <option>PUT</option>
                                            <option>PATCH</option>
                                            <option>DELETE</option>
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
                                            optionValues={[false, false, false, false, false]}
                                            readOnlySchema={bool => {
                                                this.setState({readOnlySchema: bool});
                                            }}
                                        />
                                    )}
                                </Field>

                                <Field>
                                    {({ form: { setFieldValue } }) => (
                                        <JsonSchemaEditor 
                                            data={{}}
                                            key={this.state.readOnlySchema} 
                                            schemaRoot="http://json-schema.org/draft-07/schema" 
                                            onSchemaChange={e => {
                                                this.schema = e
                                                console.log(e);
                                            }} 
                                            readOnly={this.state.readOnlySchema}
                                        />
                                    )}
                                </Field>

                                <br />
                                <table className="new-case-form-table"><tbody>
                                <tr>
                                <td>
                                    {/** Request header input */}
                                    <NumberedTextArea title="Request Header" name="givenRequestHeader" value={values.givenRequestHeader}/>
                                </td>
                                <td>
                                    {/** Request body input */}
                                    <NumberedTextArea title="Request Body" name="givenRequestBody"/>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    {/** Response header input */}
                                    <NumberedTextArea title="Expected Response Header" name="expectedResponseHeader"/>
                                </td>

                                <td>
                                    {/** Response body input */}
                                    <NumberedTextArea title="Expected Response Body"name="expectedResponseBody"/>
                                </td>
                                </tr>
                                </tbody></table>

                                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                            </form>
                        )}
                    </Formik>
                </div>
            </div>

        );
    }
}

export default withRouter(NewCaseForm);