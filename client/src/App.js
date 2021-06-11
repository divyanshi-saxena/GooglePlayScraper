import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// IMPORTING COMPONENTS
import Home from './components/Home'
import Detail from './components/Detail'
import Error from './components/Error'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/appDetails">
          <Detail />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App