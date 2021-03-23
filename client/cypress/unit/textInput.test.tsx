import { mount } from '@cypress/react'
import React from 'react'
import TextInput from '../../src/components/questions/TextInput.component'

describe('Field Tests', () => {
  it('renders the text input component', () => {
    mount(<TextInput sendResponse={(_) => {}} />)
    cy.dataCy('textInputTextField').should('exist')
  })
})
