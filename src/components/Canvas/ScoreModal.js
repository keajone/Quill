import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/fontawesome-free-solid'
import { faXmark} from '@fortawesome/free-solid-svg-icons';

import '../css/Canvas/FadingAlphabet.css';

const ScoreModal = (props) => (

    /** Modal */
    <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    
                    <h5 className="modal-title" id="exampleModalLabel">
                        { 
                            props.isSuccess ?
                            
                            // SUCCESS
                            <span>Good Job!
                            <FontAwesomeIcon icon={faCheck} size="lg" 
                                             color="green"  style={{marginLeft: "10px"}}/>
                            </span>
                            :
                            // FAILURE
                            <span>Please Try Again
                            <FontAwesomeIcon icon={faXmark} size="lg" 
                                             color="red" style={{marginLeft: "10px"}}/>
                            </span> 
                        }
                    </h5>

                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div className="modal-body">
                    { 
                        props.isSuccess ? 

                        // SUCCESS
                        <div>
                            You were able to succesfully complete the series '{props.state.character}' 
                            with an average score of &nbsp;
                            <span style={{fontWeight:900}}>{props.state.score+"%"}</span>. <br/><br/>
                            You can now move onto practicing a more difficult series!
                        </div>
                        :
                        // FAILURE 
                        <div>
                            To move onto the next series you need to have achieved a score of at 
                            least 90%. <br/><br/>
                            Your score: <span style={{fontWeight:900}}>{props.state.score+"%"}</span>
                        </div>
                    }
                </div>
                
                <div className="modal-footer">
                    {
                        props.isSuccess ?

                        // SUCCESS
                        <button type="button" className="btn btn-success" 
                                data-dismiss="modal" onClick={props.handleNext}>
                            Next
                        </button>
                        :
                        // FAILURE
                        <button type="button" className="btn btn-primary" 
                                data-dismiss="modal" onClick={props.handleRetry}>
                            Retry
                        </button>
                    }
                </div>
            </div>
        </div>
    </div>
);

export default ScoreModal;