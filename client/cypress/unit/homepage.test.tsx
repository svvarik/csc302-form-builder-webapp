import { mount } from '@cypress/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import Homepage from '../../src/components/Homepage.component'
import store from '../../src/store/store'

describe('Homepage Tests', () => {
  it('renders the homepage component', () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>
      </Provider>
    )
    cy.dataCy('homepageBox').should('exist')
  })
})
