import React from 'react';
import {Link} from 'react-router-dom';

import {TestToolPath} from '../App';

import './css/Home.css';

function Home() {

    return (

        <div className="header-container">
            
            <div id="container-nav" >
                <ul className="navBar-left">
                    <li id="get-started"><Link to={TestToolPath}>Get Started</Link></li>
                    <li><a href="#about-header">About</a></li>
                    <li id="dev-info"><a href="#dev-info-header">Developer Info</a></li>
                </ul>
            </div>

            <div className="top-header-container"> 
                <img className="header-mountain-pic" src="/testful/mountains.jpg" alt="Testful"/>
            </div>
            <div id="about-header">
                <h2>About</h2><hr />
            </div>
            <div className="about-content">
                <p>
                Being a Master’s student, I was wishing to create a Verification/Validation tool
                that was aimed at testing the API’s created by developers. I imagine this tool being
                an easy to use, web-app that a developer could access and be given multiple options
                for how to make requests to an API. These options could be either individual requests
                by the user and then provided the response (output) , or the user could create test case/suites
                that would run multiple requests across different endpoints to make sure the responses (outputs)
                meet the API’s specifications, while also providing feedback to the developer on any
                “unexpected” or “incorrect” responses. This tool would primarily meet the project requirements
                by being a <b>Validation</b> tool, and would contribute to <b>Security</b> testing by making sure an API –
                </p><br/>
                <ul>
                    <li>Provides expected output for a given input</li>
                    <li>Rejects inputs that don’t fall in a particular range</li>
                    <li>Rejects any empty or null input whenever it is needed</li>
                    <li>Rejects Incorrectly sized input</li>
                </ul>
                <br/><p>
                These kinds of testing would help eliminate the possibility of security risks. 
                <b>Command/SQL injections</b> could be harmful to a host’s operating system or databases. <b>Unauthorized endpoints</b> – It’s important to
                make sure some endpoints are strictly for developers only so that data, networks, devices, etc. aren’t exposed.
                <b>Unhandled HTTP requests</b> are a vulnerability/flaw to any API and should be tested. I really can see this
                project as being very security minded, and possibly popular among software developers today.
                As API’s continue to be created, they also continue to get enhanced by techniques such as <b>REST</b> and <b>SOAP</b> which 
                could require additional testing.  
                </p>
            </div>
            {/* <div id="dev-info-header">
                <h2>Developer Info</h2><hr />
            </div>
            <div className="dev-info-content">
                <p>
                    <a className="btn btn-primary" href="https://gitlab.com/keajone/testful/">Source Code</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" className="btn btn-primary">Documentation</button><br/>
                </p><br/>
                <h3>Quick Tutorial:</h3>
            </div> */}
        </div>
    );
}

export default Home;