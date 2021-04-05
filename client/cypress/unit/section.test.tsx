import { mount } from '@cypress/react'
import React from 'react'
import Section from '../../src/components/FormTemplate/SectionTemplate.component'

describe('FormTemplate Tests', () => {
  it('renders initial state correctly', () => {
    mount(<Section title='' sectionID='12345678' sendData={() => {}} />)
    cy.dataCy('sectionTitle').should('exist')
  })

  it('adds new field correctly', () => {
    mount(<Section title='' sectionID='12345678' sendData={() => {}} />)
    cy.dataCy('expandMore').click()
    cy.dataCy('addButton').should('exist')
  })
})
