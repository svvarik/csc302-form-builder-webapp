import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Configure from './components/Configure.component'

import Homepage from './components/Homepage.component'

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => <Homepage />} />
          <Route
            exact
            path='/configure-new-form'
            render={() => <Configure />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
