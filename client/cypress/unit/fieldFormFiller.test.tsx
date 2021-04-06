import { mount } from '@cypress/react'
import React from 'react'
import FieldFormFiller from '../../src/components/FormResponse/FieldFormFiller.component'

describe('Form Filler Field Tests', () => {
  it('renders read-only state correctly', () => {
    mount(
      <FieldFormFiller
        fieldId='abc'
        editableStatus={false}
        currTitle='Test Title'
        currResponse='False'
        currType='TF'
        sendData={(_) => {}}
      />
    )

    cy.dataCy('fieldBox').should('exist')

    cy.dataCy('titleTextField').find('input').should('have.value', 'Test Title')
    cy.dataCy('titleTextField').find('input').should('be.disabled')

    cy.dataCy('tfInputTrue').find('input').should('not.to.be.checked')
    cy.dataCy('tfInputFalse').find('input').should('be.checked')
  })

  it('renders read-only filled in combobox correctly', () => {
    mount(
      <FieldFormFiller
        fieldId='abc'
        editableStatus={false}
        currTitle='Test Title'
        currResponse='Blood Test'
        currType='CB'
        currOptions={['Blood Test', 'Urine Test']}
        sendData={(_) => {}}
      />
    )

    cy.dataCy('fieldBox').should('exist')

    cy.dataCy('titleTextField').find('input').should('have.value', 'Test Title')
    cy.dataCy('titleTextField').find('input').should('be.disabled')

    cy.dataCy('checkbox0').find('input').should('be.checked')
    cy.dataCy('checkbox1').find('input').should('not.to.be.checked')
  })

  it('selects comboboxes correctly', () => {
    mount(
      <FieldFormFiller
        fieldId='abc'
        editableStatus
        currTitle='Test Title'
        currResponse='Blood Test'
        currType='CB'
        currOptions={['Blood Test', 'Urine Test']}
        sendData={(_) => {}}
      />
    )

    cy.dataCy('fieldBox').should('exist')

    cy.dataCy('titleTextField').find('input').should('have.value', 'Test Title')
    cy.dataCy('titleTextField').find('input').should('be.disabled')

    cy.dataCy('checkbox0').click()
    cy.dataCy('checkbox1').click()
    cy.dataCy('checkbox0').find('input').should('be.checked')
    cy.dataCy('checkbox1').find('input').should('be.checked')
  })

  it('renders read-only filled in multiple choice correctly', () => {
    mount(
      <FieldFormFiller
        fieldId='abc'
        editableStatus={false}
        currTitle='Test Title'
        currResponse='Blood Test'
        currType='MC'
        currOptions={['Blood Test', 'Urine Test']}
        sendData={(_) => {}}
      />
    )

    cy.dataCy('fieldBox').should('exist')

    cy.dataCy('titleTextField').find('input').should('have.value', 'Test Title')
    cy.dataCy('titleTextField').find('input').should('be.disabled')

    cy.dataCy('mcRadio0').find('input').should('be.checked')
    cy.dataCy('mcRadio1').find('input').should('not.to.be.checked')
  })

  it('fills in editable multiple choice correctly', () => {
    mount(
      <FieldFormFiller
        fieldId='abc'
        editableStatus
        currTitle='Test Title'
        currType='MC'
        currOptions={['Blood Test', 'Urine Test']}
        sendData={(_) => {}}
      />
    )

    cy.dataCy('fieldBox').should('exist')

    cy.dataCy('titleTextField').find('input').should('have.value', 'Test Title')
    cy.dataCy('titleTextField').find('input').should('be.disabled')

    cy.dataCy('mcRadio0').click()
    cy.dataCy('mcRadio0').find('input').should('be.checked')
    cy.dataCy('mcRadio1').find('input').should('not.to.be.checked')
  })

  it('renders read-only filled in number input correctly', () => {
    mount(
      <FieldFormFiller
        fieldId='abc'
        editableStatus={false}
        currTitle='What is your age?'
        currResponse='12'
        currType='INT'
        sendData={(_) => {}}
      />
    )

    cy.dataCy('fieldBox').should('exist')

    cy.dataCy('titleTextField')
      .find('input')
      .should('have.value', 'What is your age?')
    cy.dataCy('titleTextField').find('input').should('be.disabled')

    cy.dataCy('numInputNumFormat').should('have.value', '12')
    cy.dataCy('numInputNumFormat').should('be.disabled')
  })

  it('fills in number input correctly', () => {
    mount(
      <FieldFormFiller
        fieldId='abc'
        editableStatus
        currTitle='What is your age?'
        currType='INT'
        sendData={(_) => {}}
      />
    )

    cy.dataCy('fieldBox').should('exist')

    cy.dataCy('titleTextField')
      .find('input')
      .should('have.value', 'What is your age?')
    cy.dataCy('titleTextField').find('input').should('be.disabled')

    cy.dataCy('numInputNumFormat').should('be.enabled')

    cy.dataCy('numInputNumFormat').type('12')
    cy.dataCy('numInputNumFormat').should('have.value', '12')
  })

  it('renders read-only filled in text input correctly', () => {
    mount(
      <FieldFormFiller
        fieldId='abc'
        editableStatus={false}
        currTitle='What is your name?'
        currResponse='Bill'
        currType='TEXT'
        sendData={(_) => {}}
      />
    )

    cy.dataCy('fieldBox').should('exist')

    cy.dataCy('titleTextField')
      .find('input')
      .should('have.value', 'What is your name?')
    cy.dataCy('titleTextField').find('input').should('be.disabled')

    cy.dataCy('textInputTextField').find('input').should('have.value', 'Bill')
    cy.dataCy('textInputTextField').find('input').should('be.disabled')
  })

  it('fills in text input correctly', () => {
    mount(
      <FieldFormFiller
        fieldId='abc'
        editableStatus
        currTitle='What is your name?'
        currType='TEXT'
        sendData={(_) => {}}
      />
    )

    cy.dataCy('fieldBox').should('exist')

    cy.dataCy('titleTextField')
      .find('input')
      .should('have.value', 'What is your name?')
    cy.dataCy('titleTextField').find('input').should('be.disabled')

    cy.dataCy('textInputTextField').type('Bill')
    cy.dataCy('textInputTextField').find('input').should('have.value', 'Bill')
  })
})
