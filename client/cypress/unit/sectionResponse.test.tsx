import { mount } from '@cypress/react'
import React from 'react'
import SectionResponse from '../../src/components/FormResponse/SectionResponse.component'

describe('FormResponse Section Tests', () => {

  const sectionDataProp = {
    title: 'testTitle',
    fields: [
      {
        fieldID: 'abc',
        editableStatus: true,
        currResponse: 'False',
        currTitle: 'Field Title',
        currType: 'TF',
        sendData: () => {},
        currOptions: [],
      },
      {
        fieldID: 'abc',
        editableStatus: true,
        currTitle: 'Test title',
        currResponse: 'Blood Test',
        currType: 'CB',
        currOptions: ['Blood Test', 'Urine Test'],
        sendData: () => {},
      },
      {
        fieldID: 'abc',
        editableStatus: true,
        currTitle: 'Test title',
        currResponse: ['Blood Test', 'Urine Test'],
        currType: 'CB',
        currOptions: ['Blood Test', 'Urine Test', 'Skin Test'],
        sendData: () => {},
      },
    ],
  }
  
  it('renders initial state correctly', () => {
    mount(<SectionResponse 
        title="title"
        editableStatus={false}
        sectionID="1234" 
        sendData={() => {}}
        sectionData= {sectionDataProp}
        />)
    cy.dataCy('section-response-title').should('exist')
  })

  it('displays field correctly', () => {
    mount(<SectionResponse 
      title="title"
      editableStatus={false}
      sectionID="1234" 
      sendData={() => {}}
      sectionData= {sectionDataProp}
      />)
    cy.dataCy('expandMore').click()
    cy.dataCy('fieldBox').should('exist')
  })
})

