import "./App.css";
import { Route, Switch } from "react-router-dom";
import Main from "./inc/Main";
import Save from "./inc/Save";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/main" exact={true} component={Main} />
        <Route path="/save" exact={true} component={Save} />
      </Switch>
    </div>
  );
}
asd;
export default App;
