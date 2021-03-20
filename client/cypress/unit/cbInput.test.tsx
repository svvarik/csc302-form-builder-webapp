import { mount } from '@cypress/react'
import CBInput from '../../src/components/questions/CBInput.component'
import React from 'react'

describe('Checkbox Input Tests', () => {
  it('renders cb field state correctly', () => {
    mount(<CBInput sendResponse={(_) => {}} />)
    cy.dataCy('cbGroup').should('exist')
    cy.dataCy('addButton').should('exist')
    cy.dataCy('addPrompt').should('exist')
    cy.dataCy('cbTextField0').should('exist')
    cy.dataCy('addPrompt').contains('Add Option')
  })

  it('CB add options', () => {
    mount(<CBInput sendResponse={(_) => {}} />)

    cy.dataCy('cbTextField0').find('input').should('have.value', '')
    cy.dataCy('cbTextField0').type('New Option 1')
    cy.dataCy('cbTextField0').find('input').should('have.value', 'New Option 1')

    cy.dataCy('addButton').click()
    cy.dataCy('cbTextField1').should('exist')

    cy.dataCy('cbTextField1').find('input').should('have.value', '')
    cy.dataCy('cbTextField1').type('New Option 2')
    cy.dataCy('cbTextField1').find('input').should('have.value', 'New Option 2')

    cy.dataCy('cbTextField0').find('input').clear()
    cy.dataCy('cbTextField0').type('Newer Option 1')
    cy.dataCy('cbTextField0')
      .find('input')
      .should('have.value', 'Newer Option 1')
    cy.dataCy('cbTextField1').find('input').should('have.value', 'New Option 2')

    cy.dataCy('addButton').click()
    cy.dataCy('cbTextField2').should('exist')
    cy.dataCy('cbTextField2').type('New Option 3')

    cy.dataCy('cbTextField0')
      .find('input')
      .should('have.value', 'Newer Option 1')
    cy.dataCy('cbTextField1').find('input').should('have.value', 'New Option 2')
    cy.dataCy('cbTextField2').find('input').should('have.value', 'New Option 3')
  })
})
