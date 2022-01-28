import React from 'react';

import NavBar from "./Tool/NavBar"
import Main from "./Tool/Main"

import './css/Home.css';

function Home() {

    return (

        <div className="home-container">
            
            <NavBar />
            {/** PageHeader? */}
            <Main />

        </div>
    );
}

export default Home;