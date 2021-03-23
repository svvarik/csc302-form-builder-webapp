import { mount } from '@cypress/react'
import React from 'react'
import FormTemplate from '../../src/components/FormTemplate.component'

describe('FormTemplate Tests', () => {
  it('renders initial state correctly', () => {
    mount(<FormTemplate dateCreated={Date.now} sendForm={() => {}} />)
    cy.dataCy('templateTitle').should('exist')
    cy.dataCy('templateDescription').should('exist')
    cy.dataCy('addButton').should('exist')
  })

  it('renders new section correctly', () => {
    mount(<FormTemplate dateCreated={Date.now} sendForm={() => {}} />)
    cy.dataCy('addButton').click()
    cy.get('#panel1a-header').should('exist')
  })
})
