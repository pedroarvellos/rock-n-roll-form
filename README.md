# Angular Form

This application was created in order to exemply how to create nice reusable forms in Angular with reactive forms, and also how to manage the data using NgRx. Yes, I know that for this example a reusable form sounds bit over-engineering, but the goal is to set a solid ground for an application that could grow in the feature, and have multiple pages sharing the same component and using different fields and validations.

Enjoy and feel free to provide nice inputs! 😄🖤

## How to run local

* Install all project dependencies with `npm install`
* Start the development server with `npm run start`

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Notes

* Although in a real life scenario we'd create more test cases, to make things simpler I decided to create only unit tests for the store (effects, actions, reducers and selectors), and the main e2e use cases in protractor. I believe for this purpose it covers well. 😊
