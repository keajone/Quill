import React from 'react';

import Error from "../ErrorHandling/Error";

import '../css/Tool/NavBar.css';

import { 
    HomePath
} from '../../App';

const NavBar = () => (

    <div className="NavBar">
        testing
        <ul>
            {/* Logo */}
            <li>
                <a href={"/MemoryTomatoes" + HomePath}>
                    <img src="/MemoryTomatoes/logo.png" alt="Home"/>
                </a>
            </li>

            {/* Start collapsable content */}

            {/* Demo collapsable from testful */}
            {/* Create test suites */}
            {/*<li className="dropdown-container">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Test Suites
                    </button>
                    <div className="dropdown-menu">
                        <a href={"/testful" + CreateNewSuitePath} className="dropdown-item">Create New</a>
                        <a href={"/testful" + ViewAllSuitesPath} className="dropdown-item">View All</a>
                    </div>
                </div>
            </li>*/}

        </ul>

        <Error />

    </div>

);

export default NavBar;