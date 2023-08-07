import Error from "../../../../pages/error";
import Constructor from "../../../../pages/constructor";
import Cabinet from "../../../../pages/cabinet";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

const AppLoader = () => {
    return (
        <Switch>
      <Route path ='/constructor'>
        <Constructor/>
      </Route>
      <Route path='/cabinet'>
      <Cabinet/>
      </Route>
      <Route path='/error'>
      <Error/>
      </Route>
      <Redirect to='/error'/>
      </Switch>
    )
}

export default AppLoader