// Module imports
import React from "react";

// Component imports
import ErrorHandler from "../ErrorHandling/Error";

/**
 * Component for managing the modal used for changing profile names.
 */
class RenameModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tabs: props.tabs, currentTab: props.currentTab};
        this.handleNameChange = props.handleNameChange;
    }

    static getDerivedStateFromProps(props) {
        return {tabs: props.tabs, currentTab: props.currentTab};
    }

    // Handles the 'save changes' of the modal. 
    // Performs checks on new name, and calls the passed in handler.
    changeTabName = () => {
        var newName = document.getElementById('modal-input').value;
        document.getElementById('modal-input').value = '';

        try {
            ErrorHandler.clear();
            if (newName === '') {
                // Empty name
                throw new Error("Invalid profile name.")
            } 
            else if (this.checkDuplicateName(newName)) {
                // Name already exists
                throw new Error("Cannot change profile name to '"+ newName +"'. Another profile already has this name.");
            }
            else {
                this.handleNameChange(newName);
            }
        }
        catch (err) {
            ErrorHandler.set(err.message);
        }
    }

    // Checks if other tabs share the same name.
    checkDuplicateName = (value) => {
        let tabs = this.state.tabs;
        var isMatch = false;
        for(let i = 0; i < tabs.length; i++)
            if (tabs[i].name === value) { isMatch = true; }
        return isMatch;
    }

    render() {
        return (
            /** Modal */
            <div className="modal fade" id="renameModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Change Profile Name</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input 
                                id="modal-input"  
                                type="text" className="form-control" 
                                placeholder="New Profile Name" 
                                name="new-profile-name-input" 
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" 
                                    onClick={this.changeTabName}>
                                        Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RenameModal;