import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import ArticlePage from "../../pages/ArticlePage";
import './App.scss'

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
          <Route exact path='/:id'>
            <ArticlePage/>
          </Route>
          <Route exact path='/'>
            <MainPage />
          </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
