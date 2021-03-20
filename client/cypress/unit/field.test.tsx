import { mount } from '@cypress/react'
import Field from '../../src/components/Field.component'
import React from 'react'

describe('Field Tests', () => {
  it('renders initial state correctly', () => {
    mount(<Field fieldId='abc' sendData={(_) => {}} />)

    cy.dataCy('fieldBox').should('exist')
    cy.dataCy('fieldTitle').contains('Field Title')

    cy.dataCy('titleTextField').type('New Title 1')
    cy.dataCy('titleTextField')
      .find('input')
      .should('have.value', 'New Title 1')

    cy.dataCy('formMenuItemSelector').click()
    const fieldTypes = ['Text', 'Int', 'MC', 'TF']
    fieldTypes.forEach((type) => {
      cy.dataCy(`formMenuItem${type}`).should('exist')
    })
  })

  it('renders int field state correctly', () => {
    mount(<Field fieldId='abc' sendData={(_) => {}} />)

    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemInt').click()
    cy.dataCy('numInputNumFormat').should('exist')
  })

  it('renders mc field state correctly', () => {
    mount(<Field fieldId='abc' sendData={(_) => {}} />)

    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemMC').click()
    cy.dataCy('mcRadioGroup').should('exist')
  })

  it('renders cb field state correctly', () => {
    mount(<Field fieldId='abc' sendData={(_) => {}} />)

    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemCB').click()
    cy.dataCy('cbGroup').should('exist')
  })
})
