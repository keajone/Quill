// React
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// Components
import Home from './components/Home';

// Styling
import './App.css';

// Route paths
const HomePath = "/";

// Demo adding a path
// const TmpPath = "/tmp";

function App() {
  return (
    <Router basename="/MemoryTomatoes">
      <div id="App">
        <Routes>

          {/** Home */}
          <Route exact path={HomePath} element={<Home />} />

          {/** Demo adding a path with identifier in path */}
          {/** <Route exact path={DetailsPath+"/:id"} element={Details} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
export {
  HomePath
};
