import "./App.css";
import LandingPage from "./components/landingPage/landingPage.jsx";
import Home from "./components/home/home.jsx";
import { Route } from "react-router-dom";
import CreateActivity from "./components/addActivity/addActivity.jsx";
import CountryDetail from "./components/countryDetail/countryDetail";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/activity" component={CreateActivity} />
      <Route exact path="/home/:id" component={CountryDetail} />
    </div>
  );
}

export default App;
