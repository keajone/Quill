import React from 'react';
import {} from 'react-router-dom';

import ToolNav from './ToolNav';
import ToolMain from './ToolMain';
import PageHeader from "../Previews/PageHeader";

import '../css/Tool/TestTool.css';

function TestTool() {

    return (

        <div className="test-tool-container">

            <ToolNav />
            <PageHeader value="Profiles"/>
            <ToolMain />

        </div>
    );
}

export default TestTool;