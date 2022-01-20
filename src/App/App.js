import "./App.css";
import "../styles/global.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MatchPage from "../component/Pages/MatchPage/MatchPage";
import CompetitionsPage from "../component/Pages/CompetitionsPage/CompetitionsPage";
import CompetitionPage from "../component/Pages/CompetitionPage/CompetitionPage";
import TeamsPage from "../component/Pages/TeamsPage/TeamsPage";
import MatchesPage from "../component/Pages/MatchesPage/MatchesPage";
import TeamMatches from "../component/Pages/TeamMatches/TeamMatches";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>               
      <Route exact path="/" component={CompetitionsPage} />
        <Route exact path="/competitions/:id" component={CompetitionPage} />
        <Route exact path="/competitions/:id/teams" component={TeamsPage} />
        <Route exact path="/matches" component={MatchesPage} />
        <Route exact path="/matches/:id" component={MatchPage} />
        <Route exact path="/teams/:id/matches" component={TeamMatches} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
