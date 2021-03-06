/* eslint-disable */
/// <reference path="../types.d.ts" />

describe('tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders initial state correctly', () => {
    cy.dataCy('fieldBox').should('exist')
    cy.dataCy('fieldTitle').contains('FIELD TITLE')
    cy.dataCy('fieldQuestion').contains('No q selected')
    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemText').click()
    cy.dataCy('fieldQuestion').contains('I am a Text Question')
    cy.dataCy('titleTextField').type('New Title 1')
    cy.dataCy('fieldTitle').contains('New Title 1')
  })
})

export {}