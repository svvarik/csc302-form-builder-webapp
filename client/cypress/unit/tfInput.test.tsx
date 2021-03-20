import { mount } from '@cypress/react'
import TFInput from '../../src/components/questions/TFInput.component'
import React from 'react'

describe('True/False Input Tests', () => {
  it('renders true/false field state correctly', () => {
    mount(<TFInput sendResponse={(_) => {}} />)
    cy.dataCy('tfInputRadioGroup').should('exist')
    cy.dataCy('tfInputTrue').should('exist')
    cy.dataCy('tfInputFalse').should('exist')
  })
})
