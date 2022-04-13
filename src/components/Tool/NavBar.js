// [React]
import React from 'react';

// [CSS]
import '../css/Tool/NavBar.css';

// [Paths]
import { HomePath, FadingAlphabetPath } from '../../App';

/**
 * @returns HTML elements that render the Navigation Bar
 */
const NavBar = () => (

    <div className="NavBar">
        <ul>
            {/* Logo */}
            <li>
                <a href={"/Quill" + HomePath}>
                    <img src="/logo.png" alt="Home"/>
                </a>
            </li>

            {/* Exercise(s) Dropdown */}
            <li className="dropdown-container">
                <div className="dropdown">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
                        Exercises
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">

                        {/* Fading Alphabet Exercise */}
                        <a className="dropdown-item" href={"/Quill" + FadingAlphabetPath + "/Aa"}>Fading Alphabet</a>
                    
                    </div>
                </div>
            </li>

        </ul>
    </div>
);

export default NavBar;