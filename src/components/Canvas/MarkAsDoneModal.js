// [React]
import React from 'react';

/**
 * @returns Mark As Done Modal, reminding user to fill out all 
 *          drawings before clicking the 'Mark As Done' button.
 */
const MarkAsDoneModal = (props) => (

    /** Modal */
    <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    
                    <h5 className="modal-title" id="exampleModalLabel">
                        Error
                    </h5>

                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div className="modal-body">
                    Please make sure all exercise drawings are 
                    attempted before marking as Done.
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default MarkAsDoneModal;