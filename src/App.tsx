import { Route, Switch } from "react-router";

import { Planner, Manage, Header } from "./pages";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/:date" component={Planner} />
        <Route exact path="/" component={Manage} />
      </Switch>
    </>
  );
};

export default App;
