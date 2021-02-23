import React from 'react'
import { Provider } from 'react-redux'
import { mount } from '@cypress/react'
import TodoCard from '../../src/components/TodoCard.component'
import store from '../../src/store/store'

// describe('TodoCard Component Test', () => {
//   it('works', () => {
//     // cy.window()
//     //   .its('store')
//     //   .should('be.an', 'object')
//     //   .then((win) => {
//     //     mount(
//     //       <Provider store={win.store}>
//     //         <TodoCard todo='Todo1' />
//     //       </Provider>
//     //     )
//     //     cy.contains('Todo1').should('be.visible')
//     //   })
//     mount(
//       <Provider store={store}>
//         <TodoCard todo='Todo1' />
//       </Provider>
//     )
//     cy.contains('Todo1').should('be.visible')
//   })
// })
