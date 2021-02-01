// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./index.d.ts"/>
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import theme from './GlobalTheme'
import store from './store/store'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// Expose store when running Cypress
// Enables us to grab store with cy.window() for E2E tests
if (window.Cypress) {
  window.store = store
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
