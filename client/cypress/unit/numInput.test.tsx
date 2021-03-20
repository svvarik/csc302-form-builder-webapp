import { mount } from '@cypress/react'
import NumInput from '../../src/components/questions/NumInput.component'
import React from 'react'

describe('Num Input Tests', () => {

  it('renders the num input component', () => {
    mount(<NumInput sendResponse={_=>{}}/>)
    cy.dataCy('numInputNumFormat').should('exist')
  }) 

})