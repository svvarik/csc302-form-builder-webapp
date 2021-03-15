/* eslint-disable */
/// <reference path="../types.d.ts" />

describe('tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders initial state correctly', () => {
    cy.dataCy('homepageBox').should('exist')
    cy.dataCy('homepageTitle').contains('Dashboard')
  })

})

export {}
