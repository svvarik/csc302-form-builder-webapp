# Testing

## TDD
In regards to TDD, we will be using the Jest testing framework for our backend testing because it integrates extremely easy with React and supports Typescript. Using Jest allows us to see a rundown of how our tests performed every time we execute them, as well as code coverage reports in order to get an idea of how thorough our automated tests are. We will also be using the Cypress framework for our end-to-end testing of the application, which allows us to run end-to-end UI tests on pushes to ensure that there is no regression or unintended behaviours when adding new features to our repository.

## CI
We made these tests run in combination with Github Actions, so that during every push on a feature branch or every time a PR is created, our Jest and Cypress tests are run to ensure that the code submitted is well tested. Doing so allows us to decide on whether or not we should merge new features that are submitted through PRs.
