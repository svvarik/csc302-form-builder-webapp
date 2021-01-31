/* eslint-disable */
/// <reference path="../types.d.ts" />

describe('tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })


  it('renders initial page correctly', () => {
    cy.dataCy('pageTitle').contains('CSC302H Starter')
    cy.dataCy('todoCard').should('not.exist')
    cy.dataCy('todoTextField').should('exist')
    cy.dataCy('addTodoButton').should('exist')
  })

  it('typing in the input updates and can add cards', () => {
    cy.dataCy('todoTextField').should('exist')
    cy.dataCy('todoCard').should('not.exist')

    cy.dataCy('todoTextField').type('New Todo 1')
    cy.dataCy('addTodoButton').click()

    cy.dataCy('todoCard').should('exist')
    cy.dataCy('todoTextField').should('have.value', '')

    cy.dataCy('todoTextField').type('New Todo 2')
    cy.dataCy('addTodoButton').click()
    cy.dataCy('todoTextField').type('New Todo 3')
    cy.dataCy('addTodoButton').click()

    cy.dataCy('todoCard').should('have.length', 3)

  })

  it('renders an error message when input is invalid', () => {
    cy.contains('Please enter something you would like to get done today.')
    cy.dataCy('addTodoButton').click()
    cy.contains('Please enter a valid todo')

  })

  it('removes todos by clicking on the delete icon', () => {
    cy.dataCy('todoTextField').should('exist')
    cy.dataCy('todoCard').should('not.exist')

    cy.dataCy('todoTextField').type('New Todo 1')
    cy.dataCy('addTodoButton').click()

    cy.dataCy('todoCard').should('exist')

    cy.dataCy('todoTextField').type('New Todo 2')
    cy.dataCy('addTodoButton').click()
    cy.dataCy('todoTextField').type('New Todo 3')
    cy.dataCy('addTodoButton').click()
    cy.dataCy('todoTextField').type('New Todo 4')
    cy.dataCy('addTodoButton').click()
    cy.dataCy('todoTextField').type('New Todo 5')
    cy.dataCy('addTodoButton').click()

    cy.dataCy('deleteTodoButton').first().click()
    cy.dataCy('deleteTodoButton').first().click()
    cy.dataCy('todoCard').should('have.length', 3)
  })
})

export {}