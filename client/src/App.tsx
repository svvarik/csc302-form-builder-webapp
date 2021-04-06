import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Configure from './components/FormTemplate/Configure.component'
import Navbar from './components/Navbar.component'
import Homepage from './components/Homepage.component'
import ConfigureFormResponse from './components/FormResponse/ConfigureFormResponse.component'

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
          <Route
            exact
            path='/patient-forms'
            render={() => <Homepage isPatientList />}
          />
          <Route
            exact
            path='/fill-in-form/:id'
            render={(props) => <ConfigureFormResponse {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
