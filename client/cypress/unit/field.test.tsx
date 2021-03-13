import { mount } from '@cypress/react'
import Field from '../../src/components/Field.component'
import TextInput from '../../src/components/questions/TextInput.component'
import NumInput from '../../src/components/questions/NumInput.component'
import MCInput from '../../src/components/questions/MCInput.component'
import TFInput from '../../src/components/questions/TFInput.component'
import React from 'react'
import CBInput from '../../src/components/questions/CBInput.component'

describe('Field Tests', () => {
  it('renders the field component', () => {
    mount(<Field sendData={_=>{}}/>)
    cy.dataCy('fieldBox').should('exist')
  })

  it('renders the text input component', () => {
    mount(<TextInput sendResponse={_=>{}}/>)
    cy.dataCy('textInputTextField').should('exist')
  })
  
  it('renders the int input component', () => {
    mount(<NumInput sendResponse={_=>{}}/>)
    cy.dataCy('numInputNumFormat').should('exist')
  })

  it('renders the mc input component', () => {
    mount(<MCInput sendResponse={_=>{}}/>)
    cy.dataCy('mcRadioGroup').should('exist')
  })

  it('renders the cb input component', () => {
    mount(<CBInput sendResponse={_=>{}}/>)
    cy.dataCy('cbGroup').should('exist')
  })

  it('renders the true/false input component', () => {
    mount(<TFInput sendResponse={_=>{}}/>)
    cy.dataCy('tfInputRadioGroup').should('exist')
  })
})