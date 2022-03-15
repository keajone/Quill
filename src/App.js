// [React]
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// [Components]
import Home from './components/Home';
import ScrollToTop from './components/Tool/ScrollToTop';
import FadingAlphabetControllerWithNavigate from './components/Canvas/FadingAlphabetController';

// [CSS]
import './App.css';

// [Paths]
const HomePath = "/";
const FadingAlphabetPath = "/FadingAlphabet";

function App() {
  return (
    <Router basename="/Quill">
      <div id="App">

        {/** This component will force page to scroll to top when route changes */}
        <ScrollToTop>
          
          <Routes>

            {/** Home */}
            <Route exact path={HomePath} element={<Home />} />

            {/** FadingAlphabet */}
            <Route exact path={FadingAlphabetPath+"/:id"} element={<FadingAlphabetControllerWithNavigate />} />

            {/** Demo adding a path with identifier in path */}
            {/** <Route exact path={DemoPath+"/:id"} element={DemoElement} /> */}

          </Routes>
        </ScrollToTop>
      </div>
    </Router>
  );
}

export default App;
export {
  HomePath,
  FadingAlphabetPath
};
