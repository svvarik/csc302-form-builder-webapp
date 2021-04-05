/* eslint-disable */
/// <reference path="../types.d.ts" />

describe('tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('full application  test for demo', () => {
    // Search testing on homepage
    cy.dataCy("searchContainer").should('exist')
    cy.dataCy("searchInput").type('COVID')
    cy.dataCy("newFormButton").click()
    
    cy.dataCy("searchContainer").should('not.exist')
    cy.dataCy("searchInput").should('not.exist')    
    cy.dataCy("homeButton").should('exist')
    cy.dataCy("homeButton").click()

    cy.dataCy("searchContainer").should('exist')

    // Form builder testing
    cy.dataCy('newFormButton').click()
    cy.dataCy('templateTitle').type('ER form')
    cy.dataCy('templateDescription').type('Initial Emergency Room General Info form')

    // Adding Section 
    cy.dataCy('addButton').click()
    cy.dataCy('sectionTitle').type('General Information')
    cy.get('.MuiAccordionSummary-expandIcon').click()

    // Add Fields
    cy.dataCy('addButton').first().click()
    cy.dataCy('titleTextField').type('First Name')
    cy.dataCy('formMenuItemSelector').click()
    cy.dataCy('formMenuItemText').click()
    
    cy.dataCy('addButton').first().click()
    cy.dataCy('titleTextField').last().type('Last Name')
    cy.dataCy('formMenuItemSelector').last() .click()
    cy.dataCy('formMenuItemText').click()

    
    cy.dataCy('addButton').first().click()
    cy.dataCy('titleTextField').last().type('Age')
    cy.dataCy('formMenuItemSelector').last() .click()
    cy.dataCy('formMenuItemInt').click()

    cy.dataCy('addButton').first().click()
    cy.dataCy('titleTextField').last().type('Gender')
    cy.dataCy('formMenuItemSelector').last() .click()
    cy.dataCy('formMenuItemMC').click()

    cy.get('[data-cy="mcTextField0"] input').type('Male')
    cy.dataCy('addButton').first().click()
    cy.get('[data-cy="mcTextField1"] input').type('Female') 

    cy.dataCy('publishTemplateButton').click()
    cy.reload()

    // Validate the ER Form saved 
    cy.dataCy('formCard').last().contains('ER form')

    // Opens edit form template
    cy.dataCy('EditFormCardButton').last().click()

    // Change the form title
    cy.dataCy('templateTitle').find('input').clear()
    cy.dataCy('templateTitle').type('Edditted ER Form')

    // Adding a new Section 
    cy.dataCy('addButton').last().click()

    cy.dataCy('sectionTemplate').last().within(($sectionTemplate) => {
      cy.dataCy('sectionTitle').type('Patient Information')
      cy.get('.MuiAccordionSummary-expandIcon').last().click()

      // Add Fields
      cy.dataCy('addButton').first().click()
      cy.dataCy('titleTextField').type('Blood type')
      cy.dataCy('formMenuItemSelector').click()
    }) 
    cy.dataCy('formMenuItemText').click()

    cy.dataCy('publishTemplateButton').click()
    cy.reload()

    // Validate the ER Form saved 
    cy.dataCy('formCard').last().contains('Edditted ER Form')
    cy.dataCy('deleteFormCardButton').last().click()
  })

})

export {}
