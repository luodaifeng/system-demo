import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import Login from './pages/Login/login'
import Admin from './pages/Admin/admin'


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;