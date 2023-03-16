# KeepYourPlanet

[Made with ❤️ by Brut2Com](https://brutdecom.fr/)
⚠️This project is stopped. Maybe, new version soon...⚠️

## Code Front-end

### Clone

Clone this repo to your local machine using

```bash
git clone https://github.com/StephaneVVr/keepYourPlanet.git
```

### Prerequisites

- node 12.16.3 _(required to use the npm commands)_
- npm 6.14.4

### Getting Started

1.  `npm install`
2.  `npm start`

### Create file ".env" at the root and fill it like this:
GOOGLE_API_KEY=googleApiKey

### Technical stack

- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [react-final-form](https://www.npmjs.com/package/react-final-form) - React library for make forms.
- [prop-types](https://www.npmjs.com/package/prop-types) - Runtime type checking for React props and similar objects.
- [react](https://create-react-app.dev/docs/getting-started/) - JavaScript library for create user interface
- [Dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file
- [ESLint](https://www.npmjs.com/package/eslint) - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [react-dom](https://www.npmjs.com/package/react-dom) - This package serves as the entry point to the DOM and server renderers for React.
- [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) - Simple reusable React error boundary component
- [react-google-maps](https://www.npmjs.com/package/react-google-maps) - React.js Google Maps integration component
- [Lodash](https://www.npmjs.com/package/lodash) - JavaScript librabry with different methods
- [react-places-autocomplete](https://www.npmjs.com/package/react-places-autocomplete) - A React component to build a customized UI for Google Maps Places Autocomplete
- [react-router](https://www.npmjs.com/package/react-router) - Declarative routing for React.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - DOM bindings for React Router.
- [npm-check](https://www.npmjs.com/package/npm-check) - Check for outdated, incorrect, and unused
dependencies.
- [formik](https://www.npmjs.com/package/formik) - Build forms in React, without the tears.
- [yup](https://www.npmjs.com/package/yup) - Yup is a JavaScript schema builder for value parsing and validation.
- [material-ui](https://www.npmjs.com/package/material-ui) - Material-UI is a set of React components that implement Google's Material Design specification.

### Folder Hierarchy

- `/node_modules` : is the folder where all the dependencies are installed. Don't touch this
- `/public`
- `/src` : where all the code is, this is the folder who get all our interest here.

### `/src`

### Folders

- `/component` : All our components are here: navbar, homePage, layout... You will also find sometimes
- `/component/evaluations` : All our components for evaluation feature are here: EvaluationForm etc.
- `/component/layout` : All our layouts components are here: ModalLayout, LoaderLayout, etc.
- `/component/navigation` : All our components for app navigation are here: RouterApp, MenuTop, etc.
- `/component/profile` : All our components for user profile feature are here: Dashboard, Profile, etc.
- `/context` : You will find the context configuration.
- `/services` : You will find the backend requests configuration.
- `/style` : You will find the css files.
- `/test` : You will find the tests

### Files

- `index.js`: is the application's entry point.

We used the [Create React App Starter](https://facebook.github.io/create-react-app/).

## Running the tests

- Executing `npm run test` for all tests
- Executing `npm run test:jest` for jest tests (components tests)
- Executing `npm run test:lint` for ESLint tests
- Executing `npm-check -u` for check lasted versions in packages

### Standards

- camelCase is the way to go here.

## Features

- Create requests for call and send datas in backend
- Use context API for manage datas in frontend
- Setting up frontend authentication
- Write components tests
- Make app navigation with router and menu 
- Make profile user feature with differents user datas
- Make evaluation feature for request google map API, and calculate CO2 emission with user datas