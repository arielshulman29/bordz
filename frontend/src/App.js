// import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Home } from './pages/home';
import { View } from './pages/view';
import NotFound from './components/notfound/NotFound'
import { Logout } from './components/user/Logout'
import { Login } from './components/user/Login'
import { EditModal } from './components/boards/EditModal'
import NewForm from './components/forms/NewForm'
import { useDispatch } from 'react-redux';
import { getAllBoardsThunk } from './features/board/boardSlice'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBoardsThunk())
  }, [dispatch])

  return (
    <Router>
      <Switch>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/edit/:id">
          <EditModal />
        </Route>
        <Route path="/new">
          <NewForm />
        </Route>
        <Route path="/view/:id">
          <View />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
// export default hot(App);
