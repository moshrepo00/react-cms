import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import CreateSurvey from "./sections/create-survey";
import Question from "./sections/question";
import SurveyListing from "./sections/survey-listing";
import EditSurvey from "./sections/edit-survey";
function App() {
  return (
      <main>
          <Router>
              <Switch>

                  <Route path="/create-survey">
                      <div>
                          <CreateSurvey />
                      </div>
                  </Route>
                  <Route path="/survey/:sid/question/:id">
                      <div>
                          <Question />
                      </div>
                  </Route>

                  <Route path="/survey/:id">
                      <div>
                          <EditSurvey/>
                      </div>
                  </Route>
                  <Route path="/">
                      <div>
                          <SurveyListing />
                      </div>
                  </Route>
              </Switch>
          </Router>
      </main>


  );
}

export default App;
