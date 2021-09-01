import "./App.css";
import { Route, Switch } from "react-router-dom";
import Main from "./inc/Main";
import Save from "./inc/Save";
import Modify from "./inc/Modify";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/main" exact={true} component={Main} />
        <Route path="/save" exact={true} component={Save} />
        <Route path="/modify" exact={true} component={Modify} />
      </Switch>
    </div>
  );
}
export default App;
