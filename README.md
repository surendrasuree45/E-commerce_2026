# E-commerce_2026

Playwright + TypeScript automation for the DemoBlaze e-commerce flow, including UI and API coverage for core purchase scenarios.

## Overview

This repository contains a Playwright Test suite for the DemoBlaze store with a maintainable Page Object Model, reusable API helpers, environment configuration, and test reporting.

## What was implemented

The automation focuses on the highest-value customer journeys for the DemoBlaze product store instead of attempting to cover every UI interaction. The suite includes 20 automated tests across UI and API layers.

### UI coverage

- **Core shopping flow:** load the home page, browse Phones, Laptops, and Monitors, open product details, add products to the cart, remove products, and verify cart contents.
- **Cart and checkout:** add multiple products, retain cart state across navigation and refresh, submit a valid order, verify the purchase confirmation, and confirm the cart is empty after purchase.
- **Negative scenarios:** verify checkout rejects missing customer details, a missing customer name, and a missing credit card.
- **Edge cases:** handle an empty-cart order attempt, preserve the remaining item after removing one of two products, and preserve duplicate entries when the same product is added twice.
- **Navigation and presentation:** verify the store title, product categories, product details, and navigation between Home, category views, and Cart.

### API coverage

The API tests cover the order lifecycle using reusable request helpers:

- Authenticate with valid credentials and reject invalid credentials.
- Retrieve available products with an authenticated token.
- Create an order, retrieve it, validate its contents, and delete it during cleanup.
- Verify the unsupported update operation returns `404` and does not change the order.
- Reject order creation without authentication.
- Verify a deleted order can no longer be retrieved.

### Implementation approach

- **Page Objects:** `HomePage`, `ProductPage`, and `CartPage` encapsulate locators and reusable actions for the main user journeys.
- **API abstraction:** `ecommerceApi.ts` centralizes login, product, create, retrieve, update, and delete requests so tests describe behavior rather than request details.
- **Shared data:** `testData.ts` keeps product names, categories, customer details, credentials, and API values in one place.
- **Reliable synchronization:** tests use Playwright locator assertions, URL assertions, dialog event handling, and visibility checks instead of hard-coded sleeps.
- **Data cleanup:** API order deletion runs in a `finally` block so test data is removed even when an intermediate assertion fails.
- **Configuration and diagnostics:** the project uses environment-driven base URLs and credentials, Chromium execution, one retry, HTML reporting, a console reporter, and traces on retries.

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
