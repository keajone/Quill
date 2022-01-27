// Module imports
import React from "react";
import { Formik, Field } from "formik";
import { withRouter } from "react-router-dom";

// Component imports
import Suite from "../Suites/Suite";
import Error from "../ErrorHandling/Error";
import {ViewAllSuitesPath} from "../../App";
import CaseList from "./CaseList";
import {
    getSaveButton,
    MultiLineInput,
    SingleLineInput,
} from "../Tool/FormUtils"

// CSS imports
import "../css/Suites/NewSuiteForm.css";

/**
 * Component for displaying the form to add a new Suite.
 */
class NewSuiteForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    // Attempts to add a new suite to the User's LocalStorage.
    newSuite = (data) => {

        Error.clear();
        try {
            var object = new Suite(data);
            object.addToLocalStorage();
        }
        catch (err) {
            console.log(err);
            Error.set(err.message);
            return false
        }
        return true;
    }

    render() {
        return (

            <div className="new-suite-form">
                <div className="new-suite-window">
                    <Formik 
                        initialValues={Suite.getEmptySuite()} 
                        onSubmit={(data,actions) => { 
                            var isSuccess = this.newSuite(data); 
                            actions.setSubmitting(false);
                            
                            // If successfully added, view all suites.
                            if (isSuccess)
                                this.props.history.push(ViewAllSuitesPath);
                        }}
                    >
                        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>

                                {/** Suite Name input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <SingleLineInput 
                                        name="Suite Name"
                                        placeholder='Example: "Test Suite 1"' 
                                        onChange={setFieldValue} 
                                        valueToChange="SuiteName"
                                    />
                                )}
                                </Field>

                                {/** Description input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <MultiLineInput
                                        name="Description"
                                        placeholder='Example: "This suite focuses on testing the &apos;users&apos; endpoint."'
                                        onChange={setFieldValue} 
                                        valueToChange="Description"
                                    />
                                )}
                                </Field>

                                {/** Save button */}
                                {getSaveButton(isSubmitting)}

                                {/** Add/Remove cases input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <CaseList onChange={setFieldValue} valueToChange="caseList" caseList={values.caseList}/>
                                )}   
                                </Field>

                                

                                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                            </form>
                        )}
                    </Formik>
                </div>
            </div>

        );
    }
}

export default withRouter(NewSuiteForm);