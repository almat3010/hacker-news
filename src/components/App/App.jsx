import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import ArticlePage from "../../pages/ArticlePage";
import './App.scss'
import ErrorComponent from "../Error/Error";

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
          <Route exact path='/article/:id'>
            <ArticlePage/>
          </Route>
          <Route exact path='/'>
            <MainPage />
          </Route>
          <Route exact path="/404">
            <ErrorComponent/> 
          </Route>
          <Route exact path="*" redirect>
            <Redirect to="/404"></Redirect>
          </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
