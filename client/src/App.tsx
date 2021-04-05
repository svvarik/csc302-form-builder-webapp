import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Configure from './components/FormTemplate/Configure.component'
import Navbar from './components/Navbar.component'
import Homepage from './components/Homepage.component'

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <>
                <Homepage />
              </>
            )}
          />
          <Route exact path='/configure-form' render={() => <Configure />} />
          <Route
            path='/configure-form/:formID'
            render={(props) => <Configure formID={props.match.params.formID} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
