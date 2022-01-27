import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {FiEdit} from "react-icons/fi";
import {FaPlay} from "react-icons/fa";
import {FcCheckmark} from "react-icons/fc";
import {ImCross} from "react-icons/im";
import {EditSuitePath} from "../../App";
import CaseLoadingAnimation from "../Animations/CaseLoadingAnimation";
import Case from "../Cases/Case";
import Suite from './Suite';
import {DetailsPath} from "../../App";
import { withRouter } from "react-router-dom";
import { CgDetailsMore } from "react-icons/cg";

// default styles for suite dropdown menu 
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const runSuite = async (testSuite) => {

    document.getElementById("pass_"+testSuite.id).style.display = 'none';
    document.getElementById("fail_"+testSuite.id).style.display = 'none';

    try {
        document.getElementById("run_"+testSuite.id).style.display = 'none';
        CaseLoadingAnimation.toggle(testSuite.id);

        for (let i=0; i < testSuite.caseList.length; i++) {
            var errors = await Case.execute(testSuite.caseList[i]);
            if (errors.length > 0) {
                throw new Error();
            }
        }
        document.getElementById("fail_"+testSuite.id).style.display = 'none';
        document.getElementById("pass_"+testSuite.id).style.display = 'block';
        testSuite.status = "pass";
    }
    catch (err) {
        document.getElementById("pass_"+testSuite.id).style.display = 'none';
        document.getElementById("fail_"+testSuite.id).style.display = 'block';
        testSuite.status = "fail";
    }

    Suite.edit(testSuite);
    document.getElementById("run_"+testSuite.id).style.display = 'block';
    CaseLoadingAnimation.toggle(testSuite.id);
}

function SuitesTreeView(props) {

  const suites = props.suites;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

//   const runCase = async (testCase, testSuite) => {

//     // document.getElementById("pass_"+testSuite.id + "_" + testCase.id).style.display = 'none';
//     // document.getElementById("fail_"+testSuite.id + "_" + testCase.id).style.display = 'none';

//     try {
//         // document.getElementById("run_"+testSuite.id + "_" + testCase.id).style.display = 'none';
//         // CaseLoadingAnimation.toggle(testSuite.id + "_" + testCase.id);
//         await Case.execute(testCase);
//         // document.getElementById("pass_"+testSuite.id + "_" + testCase.id).style.display = 'block';
//     }
//     catch (err) {
//         throw err;
//         // document.getElementById("fail_"+testSuite.id + "_" + testCase.id).style.display = 'block';
//     }
//     // document.getElementById("run_"+testSuite.id + "_" + testCase.id).style.display = 'block';
//     // CaseLoadingAnimation.toggle(testSuite.id + "_" + testCase.id);
    
//   }

//   const runSuite = async (testSuite) => {

//     document.getElementById("pass_"+testSuite.id).style.display = 'none';
//     document.getElementById("fail_"+testSuite.id).style.display = 'none';

//     try {
//         document.getElementById("run_"+testSuite.id).style.display = 'none';
//         CaseLoadingAnimation.toggle(testSuite.id);

//         for (let i=0; i < testSuite.caseList.length; i++) {
//             await runCase(testSuite.caseList[i], testSuite);
//         }
//         document.getElementById("pass_"+testSuite.id).style.display = 'block';
//         testSuite.status = "pass";
//         // console.log("passed");
//         // console.log(testSuite);
        
//     }
//     catch (err) {
//         console.log(err);
//         document.getElementById("pass_"+testSuite.id).style.display = 'none';
//         document.getElementById("fail_"+testSuite.id).style.display = 'block';
//         testSuite.status = "fail";
//     }

//     Suite.edit(testSuite);
//     document.getElementById("run_"+testSuite.id).style.display = 'block';
//     CaseLoadingAnimation.toggle(testSuite.id);
// }

  const renderRequestMethod = (method) => {
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

  const renderCaseHeader = () => {
      return (
            <ul className="label-case-header-list">
                <li id="case-name"><label>Case</label></li>
                <li id="url"><label>URL</label></li>
                <li id="method"><label>Method</label></li>
            </ul>
      )
  }

  const renderCase = (testCase, testSuite) => {
      return (
        <TreeItem key={testSuite.id + "_" + testCase.id} nodeId={testSuite.id + "_" + testCase.id} label={
                <div className="suite-case-item">
                    <ul>
                        <li className="li-name">
                            <label>{testCase.caseName}</label>
                        </li>
                        <li className="li-url">
                            <label>{testCase.url}</label>
                        </li>
                        <li className="li-method">
                            {renderRequestMethod(testCase.method)}
                        </li>
                        <li className="li-edit">
                            {/* <button type="button" className="btn" data-toggle="tooltip" 
                                    data-placement="top" title="Edit Test" onClick={() => 
                                    {   // edit the case 
                                        this.props.history.push(EditCasePath+"/"+testCase.id);
                                    }}>
                                    <FiEdit/>
                            </button> */}
                        </li>
                        {/* <li className="li-run" >
                            <CaseLoadingAnimation id={testSuite.id + "_" + testCase.id}/>
                            <button id={"run_"+testSuite.id + "_" + testCase.id} type="button" onClick={() => {runCase(testCase, testSuite)}} className="btn" data-toggle="tooltip" data-placement="top" title="Run Test"><FaPlay/></button></li>
                        <li className="li-pass" id={"pass_"+testSuite.id + "_" + testCase.id}>
                            <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Success"><FcCheckmark size="30"/></button>
                        </li>
                        <li className="li-fail" id={"fail_"+testSuite.id + "_" + testCase.id}>
                            <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Failure"><ImCross color="red"/></button>
                        </li> */}
                    </ul>
                </div>
        }/>
      );
  }

  const Status = (props) => {
    var testSuite = props.suite;
    if (testSuite.status === 'pass') {
        return (<>
            <li className="li-pass" id={"pass_"+testSuite.id}>
                <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Success"><FcCheckmark size="30"/></button>
            </li>
            <li className="li-fail" id={"fail_"+testSuite.id} style={{display: 'none'}}>
                <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Failure"><ImCross color="red"/></button>
            </li></>
        );
    } else if (testSuite.status === 'fail') {
        return (<>
            <li className="li-pass" id={"pass_"+testSuite.id} style={{display: 'none'}}>
                <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Success"><FcCheckmark size="30"/></button>
            </li>
            <li className="li-fail" id={"fail_"+testSuite.id}>
                <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Failure"><ImCross color="red"/></button>
            </li></>
        );
    } else {
        return (<>
            <li className="li-pass" id={"pass_"+testSuite.id} style={{display: 'none'}}>
                <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Success"><FcCheckmark size="30"/></button>
            </li>
            <li className="li-fail" id={"fail_"+testSuite.id} style={{display: 'none'}}>
                <button type="button" className="btn" data-toggle="tooltip" data-placement="top" title="Failure"><ImCross color="red"/></button>
            </li></>
        );
    }
  }

  const renderSuites = (testSuite) => {

    return (
        <TreeItem key={testSuite.id} nodeId={testSuite.id} label={
            <div className="suite-item">
            <ul>
                <li className="li-name" onClick={() => 
                    {   // will change page to load the suite details
                        // this.props.history.push(ViewAllSuitesPath+"/"+testSuite.id);
                    }}>
                    <label>{testSuite.SuiteName}</label>
                </li>
                <li className="li-details">
                    <button id="details-btn" className="btn btn-primary btn-sm" onClick={() => 
                            {   // deatails of the suite 
                                props.history.push(DetailsPath+"/"+testSuite.id);
                            }}>Details&nbsp;<CgDetailsMore size="20"/></button>
                </li>
                <li className="li-edit">
                    <button type="button" className="btn" data-toggle="tooltip" 
                            data-placement="top" title="Edit Suite" onClick={() => 
                            {   // edit the suite 
                                props.history.push(EditSuitePath+"/"+testSuite.id);
                            }}>
                            <FiEdit/>
                    </button>
                </li>
                <li className="li-run">
                    <CaseLoadingAnimation id={testSuite.id}/>
                    <button id={"run_"+testSuite.id} type="button" onClick={(e) => 
                        {
                            e.preventDefault();
                            runSuite(testSuite);
                        }} 
                        className="btn" data-toggle="tooltip" data-placement="top" title="Run Test"><FaPlay/>
                    </button>
                </li>
                <Status suite={testSuite}/>
                
            </ul>
            </div>
        }>
        {renderCaseHeader()}
        {testSuite.caseList.map( (c) => renderCase(c, testSuite) )}
        <div className="suite-case-spacer"></div>
        </TreeItem>
    );
}

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
    
    {suites.map( (s) => renderSuites(s) )}
    </TreeView>
  );
}

export default withRouter(SuitesTreeView);