# banka-react

Banka is a light-weight core banking application that supports a single bank and allows users create bank accounts and make withdrawals &amp; deposits by visiting a local branch. This repository contains the frontend code developed with React.

![GitHub](https://img.shields.io/github/license/tolulope-od/banka-react.svg?style=popout) [![Build Status](https://travis-ci.org/tolulope-od/banka-react.svg?branch=develop)](https://travis-ci.org/tolulope-od/banka-react) [![Coverage Status](https://coveralls.io/repos/github/tolulope-od/banka-react/badge.svg?branch=develop)](https://coveralls.io/github/tolulope-od/banka-react?branch=develop) ![GitHub language count](https://img.shields.io/github/languages/count/tolulope-od/banka-react.svg) ![GitHub top language](https://img.shields.io/github/languages/top/tolulope-od/banka-react.svg)

# Table of Contents

1. <a href="#pivotal-tracker-board">Pivotal Tracker</a>
2. <a href="#hosted-app">Hoster App</a>
3. <a href="#tech-stack-user">
4. <a href="#server-repo">Server Repository</a>
5. <a href="getting-started">Getting Started</a>

## Pivotal Tracker Board

https://www.pivotaltracker.com/n/projects/2362255

## Hosted App

https://banka-react.herokuapp.com

## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org/)
- [Html]()
- [CSS]()
- [Webpack](https://webpack.js.org/)

## Server Repository

The APII documentation and implementation for the backend of this application can be found at this address:

https://github.com/tolulope-od/banka

The API itself is hosted on: [Heroku](https://bankaa-app.herokuapp.com/api/v1)

## Getting Started

**Development**

To clone and run this application, you'll need [Git](https://git-scm.com) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/tolulope-od/banka-react.git
```

Next, you will need to install the required dependencies for the project to be up and running on a development server on your machine. Simply enter the repository and do the following:

```bash
# cd into the repository
$ cd banka-react

# install the dependencies
$ npm install

# Strat the development sever
$ npm run dev
```

Upon running the last command, a new browser window should be opened at `localhost:8080` on your machine.

**Running Tests**

Unit tests are set up on this repository with Jest and Enzyme and dependencies to enable them work are included in the `package.json` file. To run the tests, you can do the following:

```bash
# Enter the project's directory
$ cd banka-react/

# To run the available unit tests
$ npm test

# To run tests with coverage reports
$ npm run test:coverage
```
