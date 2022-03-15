// [React]
import React from 'react';

// [CSS]
import '../css/Tool/NavBar.css';

// [Paths]
import { HomePath, FadingAlphabetPath } from '../../App';

const NavBar = () => (

    <div className="NavBar">
        <ul>
            {/* Logo */}
            <li>
                <a href={"/Quill" + HomePath}>
                    <img src="/logo.png" alt="Home"/>
                </a>
            </li>

            {/* Fading Alphabet Exercise */}
            <li>
                <a type="button" className="btn btn-secondary" href={"/Quill" + FadingAlphabetPath + "/Aa"}>Fading Alphabet</a>
            </li>

            {/* TODO: Use this button to implement another "handwriting exercise"
            <li>
                <a type="button" className="btn btn-secondary" href={"/Quill" + HomePath}>Exercise 2</a>
            </li>
             */}
            
            {/* TODO: Use this button to implement another "handwriting exercise"
            <li>
                <a type="button" className="btn btn-secondary" href={"/Quill" + HomePath}>Exercise 3</a>
            </li>
             */}
        </ul>
    </div>
);

export default NavBar;