import { mount } from '@cypress/react'
import React from 'react'
import FormResponse from '../../src/components/FormResponse/FormResponse.component'

describe('FormResponse Tests', () => {
  const sectionProp = [
    {
      title: 'testSectionTitle',
      fields: [
        {
          title: 'First Name',
          fieldID: 'fdeeb66b-b399-4548-8d0f-5bce24631e52',
          type: 'TEXT',
          response: '',
          enabled: true,
          options: [''],
        },
        {
          title: 'Last Name',
          fieldID: '8b6deec7-86a2-4cbe-915b-2bb66977ed80',
          type: 'TEXT',
          response: '',
          enabled: true,
          options: [''],
        },
        {
          title: 'Age',
          fieldID: '706fa75a-1fca-4fae-8f7c-cb3f26ff95c8',
          type: 'INT',
          response: '',
          enabled: true,
          options: [''],
        },
        {
          title: 'Gender',
          fieldID: 'f7735b22-0c57-4db0-8dc5-cb99bf6c525f',
          type: 'MC',
          response: '',
          enabled: true,
          options: ['Male', 'Female'],
        },
      ],
      sectionID: '123456789',
    },
  ]

  it('renders initial state correctly', () => {
    mount(
      <FormResponse
        formTitle='title'
        formDesc='test form response'
        editableStatus={false}
        formID='1234'
        procedure='test procedure'
        procedureID='9876'
        sendForm={() => {}}
        sections={sectionProp}
      />
    )
    cy.dataCy('formBox').should('exist')
    cy.dataCy('formTitle').should('exist')
    cy.dataCy('formID').should('exist')
    cy.dataCy('formProcedure').should('exist')
    cy.dataCy('patientIDField').should('exist')
  })

  it('form displays sections correctly', () => {
    mount(
      <FormResponse
        formTitle='title'
        formDesc='test form response'
        editableStatus={false}
        formID='1234'
        procedure='test procedure'
        procedureID='9876'
        sendForm={() => {}}
        sections={sectionProp}
      />
    )
    cy.dataCy('section-response-title').should('exist')
    cy.dataCy('expandMore').click()
    cy.dataCy('fieldBox').should('exist')
  })

  it('fills in text input correctly', () => {
    mount(
      <FormResponse
        formTitle='title'
        formDesc='test form response'
        editableStatus={false}
        formID='1234'
        procedure='test procedure'
        procedureID='9876'
        sendForm={() => {}}
        sections={sectionProp}
      />
    )

    cy.dataCy('formBox').should('exist')

    cy.dataCy('patientIDField').find('input').should('have.value', '')

    cy.dataCy('patientIDField').type('54321')
    cy.dataCy('patientIDField').find('input').should('have.value', '54321')
  })
})
