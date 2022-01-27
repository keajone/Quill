import React from 'react';
// import {AiFillHome} from "react-icons/ai";

import Error from "../ErrorHandling/Error";

import '../css/Tool/ToolNav.css';

import { 
    HomePath,
    CreateNewCasePath, 
    ViewAllCasesPath, 
    CreateNewSuitePath, 
    ViewAllSuitesPath,
    TestToolPath,
} from '../../App';

const ToolNav = () => (

    <div className="ToolNav">

        <ul>
            {/* Logo */}
            <li>
                <a href={"/testful" + HomePath}>
                    <img src="/testful/logo-nav.jpg" alt="Home"/>
                </a>
            </li>

            {/* Start collapsable content */}

            {/* Create test cases */}
            <li className="dropdown-container">
                <a type="button" className="btn btn-primary" href={"/testful" + TestToolPath}>Profiles</a>                  
            </li>

            {/* Create test cases */}
            <li className="dropdown-container">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Test Cases
                    </button>
                    <div className="dropdown-menu">
                        <a href={"/testful" + CreateNewCasePath} className="dropdown-item">Create New</a>
                        <a href={"/testful" + ViewAllCasesPath} className="dropdown-item">View All</a>
                        {/* <button className="dropdown-item">Link 3</button> */}
                    </div>
                </div>
            </li>

            {/* Create test suites */}
            <li className="dropdown-container">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Test Suites
                    </button>
                    <div className="dropdown-menu">
                        <a href={"/testful" + CreateNewSuitePath} className="dropdown-item">Create New</a>
                        <a href={"/testful" + ViewAllSuitesPath} className="dropdown-item">View All</a>
                        {/* <button className="dropdown-item">Link 3</button> */}
                    </div>
                </div>
            </li>

            {/* Home link */}
            <li>
                {/* <a type="button" className="btn btn-primary" href={HomePath}><AiFillHome/></a> */}
                <a type="button" className="btn btn-primary" href={"/testful" + HomePath}>Home</a>
            </li>

        </ul>

        <Error />

    </div>

);

export default ToolNav;