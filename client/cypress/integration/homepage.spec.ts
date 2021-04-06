/* eslint-disable */
/// <reference path="../types.d.ts" />

describe('tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders initial state correctly', () => {
    cy.dataCy('homepageBox').should('exist')
    cy.dataCy('homepageTitle').contains('Dashboard')


    // Changing roles + card changes
    cy.dataCy('userRole').should('exist')
    cy.dataCy('userRole').contains('Admin ITN')
    cy.dataCy('deleteFormCardButton').should('exist')

    cy.dataCy('userSwitch').click()
    cy.dataCy('userRole').contains('Dr. ITN')
    cy.dataCy('deleteFormCardButton').should('not.exist')
    cy.dataCy('formCardAction').contains('FILL IN')

    cy.dataCy('userSwitch').click()
    cy.dataCy('userRole').contains('Admin ITN')
    cy.dataCy('deleteFormCardButton').should('exist')
    cy.dataCy('formCardAction').contains('EDIT')
  })

  it('renders patient cards correctly', () => {
    cy.dataCy('userSwitch').click()
    cy.dataCy('patientCard').should('not.exist')
    cy.dataCy('newFormButton').click()
    cy.dataCy('patientCard').should('exist')
  })

})

export { }
