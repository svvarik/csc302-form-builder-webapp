/// <reference types="cypress" />

// Copied an example command from https://on.cypress.io/custom-commands
Cypress.Commands.add('clickLink', (label: string | number | RegExp) => {
  cy.get('a').contains(label).click()
})

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})

export default {}
