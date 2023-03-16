# KeepYourPlanet


## Code Back-end

### Clone

Clone this repo to your local machine using

```bash
git clone https://github.com/StephaneVVr/keepYourPlanet.git
```

### Prerequisites

- node 12.16.3 _(required to use the npm commands)_
- npm 6.14.4
- MongoDB 4.4

### Getting Started

1.  `npm install`
2.  `npm start`

### Create file ".env" at the root and fill it like this:
MONGODB_URI=databaseURL SECRET_KEY=secretKeyForToken GOOGLE_API_KEY=googleApiKey

### Technical stack

- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.
- [Chai](https://www.npmjs.com/package/chai) - Chai is a BDD / TDD assertion library for node
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser) - Parse Cookie header and populate req.cookies
- [Cors](https://www.npmjs.com/package/cors) - CORS is a node.js package for providing a Connect/Express middleware
- [Dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file
- [ESLint](https://www.npmjs.com/package/eslint) - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [Express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
- [JSDoc](https://www.npmjs.com/package/jsdoc) - An API documentation generator for JavaScript.
- [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.
- [Lodash](https://www.npmjs.com/package/lodash) - JavaScript librabry with different methods
- [Mocha](https://www.npmjs.com/package/mocha) - JavaScript test framework
- [Mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [Nodemon](https://www.npmjs.com/package/nodemon) - Automatically restarting the node application
- [npm-check](https://www.npmjs.com/package/npm-check) - Check for outdated, incorrect, and unused dependencies.
- [Passport.js](https://www.npmjs.com/package/passport) - Passport is Express-compatible authentication middleware for Node.js.

### Folder Hierarchy

- `/out` : allows you to recover doc from jsdoc by executing `jsdoc <filename>` in the folder contain the file, then run index.html (or one file .html) on your browser
- `/node_modules` : is the folder where all the dependencies are installed. Don't touch this
- `/backend` : where all the code is, this is the folder who get all our interest here
- `/test` : all tests are here, with mocha and chai

### `/backend`

### Folders

- `/config` : Contain the different configuration for the project 
- `/controllers` : Contain controllers for the different routes
- `/database` : Contain database config and mongoose models
- `/datas` : Contains differents ADEME datas
- `/queries` : Contains the different queries for controllers
- `/routes` : Contains the different routes

### Files

- `/.env` : Environment variables for app
- `/.eslintrc.js` : ESLint config file
- `/app.js` : Server config file

## Running the tests

- Executing `npm run test` for all tests
- Executing `npm run test:mocha` for mocha tests
- Executing `npm run test:lint` for ESLint tests
- Executing `npm-check -u` for check lasted versions in packages

### Standards

- camelCase is the way to go here.

## Features

- Create models for database with mongoose, and connect and configure MongoDB database
- Create authentication feature (signin, signup, signout) and verify auth, with Passport.js and token strategy
- Create routes, controllers and queries for update database (user and result models)
- Create function for config application (security, datas verifications, impact calculs)
- Write JSDoc for code documentation
- Write tests with mocha and chai

## Authors

* **Stéphane Vivier** - *Initial work* - [StephaneVVr](https://github.com/StephaneVVr)