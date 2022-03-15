// [React]
import React from 'react';

// [CSS]
import '../css/Canvas/FadingAlphabet.css';

const FadingAlphabetInfoModal = () => (

    /** Modal */
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Fading Alphabet</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    The Fading Alphabet exercise is designed to help teach better handrwriting skills 
                    by providing an increase in visual motor difficulty while decreasing the amount of 
                    visual assist for letter formation. By providing traces of each letter under different 
                    difficulties, the user may click 'Submit' to have their final sketch scored and, if 
                    profficient enough, will be able to advance to the next letter.
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>
);

export default FadingAlphabetInfoModal;