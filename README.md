# E-commerce_2026

Playwright + TypeScript automation for the DemoBlaze e-commerce flow, including UI and API coverage for core purchase scenarios.

## Overview

This repository contains a Playwright Test suite for the DemoBlaze store with a maintainable Page Object Model, reusable API helpers, environment configuration, and test reporting.

## Prerequisites

- Node.js 18 or newer
- npm
- Chromium browser support through Playwright
- Internet access to https://www.demoblaze.com and the API hosted at https://rahulshettyacademy.com

## Installation

From the project directory:

```powershell
npm install
npx playwright install chromium
```

## Environment Configuration

The project includes a public training account in `.env.example` so the API tests can run without personal secret values. If you need to override the defaults, create a local env file and set your own values.

```powershell
Copy-Item .env.example .env.qa
$env:TEST_ENV="qa"
```

The default values are:

- `WEB_BASE_URL=https://www.demoblaze.com`
- `API_BASE_URL=https://rahulshettyacademy.com/api/ecom`
- `RSA_API_EMAIL=rahulshettyacademy@gmail.com`
- `RSA_API_PASSWORD=learning`

You may replace them with your own credentials by setting `RSA_API_EMAIL` and `RSA_API_PASSWORD` in `.env.qa` or the process environment.

## Run the suite

Run the full Chromium suite:

```powershell
npx playwright test --project=chromium
```

Run the UI suite:

```powershell
npx playwright test tests/ui --project=chromium
```

Run the API checks only:

```powershell
npx playwright test tests/api/orderApi.spec.ts --project=chromium
```

Run a single test by name:

```powershell
npx playwright test tests/ui/product.spec.ts -g "should display product details correctly"
```

Show the latest HTML report:

```powershell
npx playwright show-report
```

## Project structure

```text
tests/
  api/
    orderApi.spec.ts
  pages/
    HomePage.ts
    cartPage.ts
    productPage.ts
  ui/
    *.spec.ts
  utils/
    apiConfig.ts
    ecommerceApi.ts
    environment.js
    testData.ts
reporters/
  consoleReporter.ts
playwright.config.js
.env.example
README.md
```

## Notes and design decisions

- The UI suite uses stable locators and Playwright assertions rather than fixed timeouts.
- The API suite validates a real login flow, product retrieval, order creation, order deletion, and the expected `404` response for the unsupported update route.
- `.env` and `.env.*` files are ignored by Git; only `.env.example` is tracked.
- The suite is configured to run Chromium with retries enabled and HTML reporting.

## Validation

This project was validated with:

```powershell
npx playwright test --project=chromium --reporter=line
```

Result: 20 passed (39.1s)
