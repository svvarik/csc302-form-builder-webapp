/* eslint-disable @typescript-eslint/triple-slash-reference */
// /// <reference types="cypress" />
/// <reference path="../node_modules/cypress/types/cy-blob-util.d.ts" />
/// <reference path="../node_modules/cypress/types/cy-bluebird.d.ts" />
/// <reference path="../node_modules/cypress/types/cy-moment.d.ts" />
/// <reference path="../node_modules/cypress/types/cy-minimatch.d.ts" />
/// <reference path="../node_modules/cypress/types/lodash/index.d.ts" />
/// <reference path="../node_modules/cypress/types/sinon/index.d.ts" />
/// <reference path="../node_modules/cypress/types/jquery/index.d.ts" />
/// <reference path="../node_modules/cypress/types/cypress.d.ts" />
/// <reference path="../node_modules/cypress/types/cypress-type-helpers.d.ts" />
/// <reference path="../node_modules/cypress/types/cypress-global-vars.d.ts" />

declare namespace Cypress {
  // add custom Cypress command to the interface Chainable<Subject>
  interface Chainable {
    // let TS know we have a custom command cy.clickLink(...)
    clickLink(label: string | number | RegExp): void

    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>
  }

  // add properties the application adds to its "window" object
  // by adding them to the interface ApplicationWindow
  interface ApplicationWindow {
    // let TS know the application's code will add
    // method window.add with the following signature
    add(a: number, b: number): number
  }
}

interface AUTWindow {
  store?: import('../src/store/store').Tstore
}
