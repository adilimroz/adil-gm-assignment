# Gerimedica Assignment

This repository hosts automated tests for Demo QA, a platform demonstrating both UI and API functionalities. The tests cover a range of scenarios on Demo QA's [UI](https://demoqa.com/) and [API](https://demoqa.com/swagger), instructed in the assignment document.

## Automation tool used
- [Playwright](https://playwright.dev/)

## Requirements
- Node.js 16+
- Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
- MacOS 12 Monterey or MacOS 13 Ventura.
- Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04.

## Project Structure

#### Config Files
- [UI config](playwright-ui.config.ts):
	- fullyParallel: To run tests in parallel
	- baseURL: Base URL for UI tests
- [API config](playwright-api.config.ts):
	- baseURL: base endpoint for all requests.

#### Test Data

- [UI test data](resources/testDataUI.ts): Test data for UI tests
- [API test data](resources/testDataAPI.ts): Test data for API tests

#### Page Objects

- [UI pages](pages) - It contains UI page objects with elements and related menthods.

#### Utilities

- [API helpers](apiUtility/utils.ts) - It contains API endpoint helpers .

#### Test Suites

- [UI tests](tests/ui/demoQA.spec.ts) - Contains frontend tests for test cases mentioned in the assignment document.
- [API tests](tests/api/bookStore.spec.ts) - Contains API tests of user account and bookstore APIs mentioned in the assignment document.


## Installation

To install the project dependencies, please run the command:
```
npm install
```

## Execution
To execute UI test cases on **Chrome**:
```
npm run tests:ui:chrome
```
To execute UI test cases on **Firefox**:
```
npm run tests:ui:firefox
```
To execute UI test cases on **Webkit**:
```
npm run tests:ui:webkit
```
To execute UI test cases on all browsers:
```
npm run tests:ui
```
To execute API test cases:
```
npm run tests:api
```

## Test Report

To genrate report after test execution, run the following command:
```
npx playwright show-report
```
Alternatively test report can be found [playwright-report/index.html](playwright-report/index.html)