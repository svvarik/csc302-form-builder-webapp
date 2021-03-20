import { mount } from '@cypress/react'
import TextInput from '../../src/components/questions/TextInput.component'
import React from 'react'

describe('Field Tests', () => {
it('renders the text input component', () => {
    mount(<TextInput sendResponse={_=>{}}/>)
    cy.dataCy('textInputTextField').should('exist')
  })
})