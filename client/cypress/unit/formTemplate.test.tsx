import { mount } from '@cypress/react'
import FormTemplate from '../../src/components/FormTemplate.component'
import React from 'react'

describe('FormTemplate Tests', () => {
    it('renders initial state correctly', () => {
      mount(<FormTemplate dateCreated={Date.now} sendForm={() => {}} />)
  
      cy.dataCy('templateTitle').should('exist')
      cy.dataCy('templateDescription').should('exist')
      cy.dataCy('addSection').should('exist')
    })

    it('renders new section correctly', () => {
      mount(<FormTemplate dateCreated={Date.now} sendForm={() => {}} />)
      cy.dataCy('addSection').click()
      cy.get('#panel1a-header').should('exist')
    })
  })
  