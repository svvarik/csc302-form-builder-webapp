import { mount } from '@cypress/react'
import React from 'react'
import MCInput from '../../src/components/questions/MCInput.component'

describe('Multiple Choice Input Tests', () => {
  it('renders mc field state correctly', () => {
    mount(<MCInput sendResponse={(_) => {}} />)
    cy.dataCy('mcRadioGroup').should('exist')
    cy.dataCy('addButton').should('exist')
    cy.dataCy('addPrompt').should('exist')
    cy.dataCy('mcTextField0').should('exist')
    cy.dataCy('addPrompt').contains('Add Option')
  })

  it('MC add options', () => {
    mount(<MCInput sendResponse={(_) => {}} />)
    cy.dataCy('mcTextField0').find('input').should('have.value', '')
    cy.dataCy('mcTextField0').type('New Option 1')
    cy.dataCy('mcTextField0').find('input').should('have.value', 'New Option 1')

    cy.dataCy('addButton').click()
    cy.dataCy('mcTextField1').should('exist')

    cy.dataCy('mcTextField1').find('input').should('have.value', '')
    cy.dataCy('mcTextField1').type('New Option 2')
    cy.dataCy('mcTextField1').find('input').should('have.value', 'New Option 2')

    cy.dataCy('mcTextField0').find('input').clear()
    cy.dataCy('mcTextField0').type('Newer Option 1')
    cy.dataCy('mcTextField0')
      .find('input')
      .should('have.value', 'Newer Option 1')
    cy.dataCy('mcTextField1').find('input').should('have.value', 'New Option 2')

    cy.dataCy('addButton').click()
    cy.dataCy('mcTextField2').should('exist')
    cy.dataCy('mcTextField2').type('New Option 3')

    cy.dataCy('mcTextField0')
      .find('input')
      .should('have.value', 'Newer Option 1')
    cy.dataCy('mcTextField1').find('input').should('have.value', 'New Option 2')
    cy.dataCy('mcTextField2').find('input').should('have.value', 'New Option 3')
  })
})
