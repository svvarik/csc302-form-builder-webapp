import { mount } from '@cypress/react'
import Section from '../../src/components/Section.component'
import React from 'react'

describe('FormTemplate Tests', () => {
    it('renders initial state correctly', () => {
      mount(<Section title="" sectionId={"12345678"} sendData={() => {}} />)
      cy.dataCy('sectionTitle').should('exist') 
    })

    it('adds new field correctly', () => {
      mount(<Section title="" sectionId={"12345678"} sendData={() => {}} />)
      cy.dataCy('expandMore').click()
      cy.dataCy('addButton').should('exist')
    })
  })
  