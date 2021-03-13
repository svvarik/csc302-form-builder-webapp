/* eslint-disable */
/// <reference path="../types.d.ts" />

describe('tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders initial state correctly', () => {
    cy.dataCy('fieldBox').should('exist')
    cy.dataCy('fieldTitle').contains('Field Title')

    cy.dataCy('titleTextField').type('New Title 1')
    cy.dataCy('titleTextField').find("input").should('have.value', 'New Title 1')

    cy.dataCy('formMenuItemSelector').click()
    const fieldTypes = ['Text', 'Int', 'MC', 'TF']
    fieldTypes.forEach(type => {
      cy.dataCy(`formMenuItem${type}`).should('exist')
    })
  })

  it('renders text field state correctly', () => {
    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemText').click()
    cy.dataCy('textInputTextField').should('exist')
  })

  it('renders int field state correctly', () => {
    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemInt').click()
    cy.dataCy('numInputNumFormat').should('exist')
  })

  it('renders mc field state correctly', () => {
    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemMC').click()
    cy.dataCy('mcRadioGroup').should('exist')
    cy.dataCy('addButton').should('exist')
    cy.dataCy('addPrompt').should('exist')
    cy.dataCy('mcTextField0').should('exist')
    cy.dataCy('addPrompt').contains('Add Option')
  })

  it('MC add options', () => {
    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemMC').click()

    cy.dataCy('mcTextField0').find("input").should('have.value', '')
    cy.dataCy('mcTextField0').type('New Option 1')
    cy.dataCy('mcTextField0').find("input").should('have.value', 'New Option 1')

    cy.dataCy('addButton').click()
    cy.dataCy('mcTextField1').should('exist')

    cy.dataCy('mcTextField1').find("input").should('have.value', '')
    cy.dataCy('mcTextField1').type('New Option 2')
    cy.dataCy('mcTextField1').find("input").should('have.value', 'New Option 2')
    
    cy.dataCy('mcTextField0').find("input").clear()
    cy.dataCy('mcTextField0').type('Newer Option 1')
    cy.dataCy('mcTextField0').find("input").should('have.value', 'Newer Option 1')
    cy.dataCy('mcTextField1').find("input").should('have.value', 'New Option 2')

    cy.dataCy('addButton').click()
    cy.dataCy('mcTextField2').should('exist')
    cy.dataCy('mcTextField2').type('New Option 3')

    cy.dataCy('mcTextField0').find("input").should('have.value', 'Newer Option 1')
    cy.dataCy('mcTextField1').find("input").should('have.value', 'New Option 2')
    cy.dataCy('mcTextField2').find("input").should('have.value', 'New Option 3')
  })

  it('renders cb field state correctly', () => {
    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemCB').click()
    cy.dataCy('cbGroup').should('exist')
    cy.dataCy('addButton').should('exist')
    cy.dataCy('addPrompt').should('exist')
    cy.dataCy('cbTextField0').should('exist')
    cy.dataCy('addPrompt').contains('Add Option')
  })

  it('CB add options', () => {
    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemCB').click()

    cy.dataCy('cbTextField0').find("input").should('have.value', '')
    cy.dataCy('cbTextField0').type('New Option 1')
    cy.dataCy('cbTextField0').find("input").should('have.value', 'New Option 1')

    cy.dataCy('addButton').click()
    cy.dataCy('cbTextField1').should('exist')

    cy.dataCy('cbTextField1').find("input").should('have.value', '')
    cy.dataCy('cbTextField1').type('New Option 2')
    cy.dataCy('cbTextField1').find("input").should('have.value', 'New Option 2')
    
    cy.dataCy('cbTextField0').find("input").clear()
    cy.dataCy('cbTextField0').type('Newer Option 1')
    cy.dataCy('cbTextField0').find("input").should('have.value', 'Newer Option 1')
    cy.dataCy('cbTextField1').find("input").should('have.value', 'New Option 2')

    cy.dataCy('addButton').click()
    cy.dataCy('cbTextField2').should('exist')
    cy.dataCy('cbTextField2').type('New Option 3')

    cy.dataCy('cbTextField0').find("input").should('have.value', 'Newer Option 1')
    cy.dataCy('cbTextField1').find("input").should('have.value', 'New Option 2')
    cy.dataCy('cbTextField2').find("input").should('have.value', 'New Option 3')
  })

  it('renders true/false field state correctly', () => {
    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemTF').click()
    cy.dataCy('tfInputRadioGroup').should('exist')
    cy.dataCy('tfInputTrue').should('exist')
    cy.dataCy('tfInputFalse').should('exist')
  })
})

export {}