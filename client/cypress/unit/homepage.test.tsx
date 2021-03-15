import { mount } from '@cypress/react'
import { Provider } from 'react-redux'
import Homepage from '../../src/components/Homepage.component'
import React from 'react'
import store from '../../src/store/store'

describe('Homepage Tests', () => {
  it('renders the homepage component', () => {
    mount(
      <Provider store={store}>
        <Homepage />
      </Provider>
    )
    cy.dataCy('homepageBox').should('exist')
  })
})
