import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";

import { Planner, Manage } from "./pages";

const App = () => {
  return (
    <>
      <Link to="/">/home</Link>
      <Switch>
        <Route exact path="/:date" component={Planner} />
        <Route exact path="/" component={Manage} />
      </Switch>
    </>
  );
};

export default App;
