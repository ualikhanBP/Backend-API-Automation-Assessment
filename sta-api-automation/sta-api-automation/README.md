🚀 Overview

This repository contains an API test automation framework built as part of the Senior Test Analyst (STA) coding challenge.

The framework validates a public OpenLibrary Books API using:

TypeScript

Playwright (API testing)

Cucumber (Gherkin / BDD)

The solution focuses on:

Clean architecture

Maintainability & scalability

Real-world API testing practices

Contract validation using JSON Schema


API Under Test

Method: GET
Endpoint:
https://openlibrary.org/api/books?bibkeys=ISBN:0201558025,LCCN:93005405,ISBN:1583762027&amp;format=json

✅ Test Coverage

The following validations are implemented:

✔ Response status code

✔ Response time threshold

✔ Number of returned books

✔ Correctness of book details

✔ Thumbnail image validation

Images downloaded from API response

Compared with baseline images stored in the repo

✔ JSON Schema validation to verify the API contract


Tech Stack
Tool	Purpose
TypeScript	for Strong typing & maintainability
Playwright	for API request handling
Cucumber	for BDD / Gherkin syntax
Chai	for Assertions
Sharp	for Image comparison
Axios	for Image downloading
Ajv + ajv-formats for JSON Schema validation (including URI support)

Project Structure
sta-api-automation/
│
├── src/
│   ├── api/
│   │   ├── clients/        # API client (request handling)
│   │   ├── pages/          # API Page Objects (POM)
│   │   └── utils/          # Helpers & test configuration
│   │
│   ├── features/           # Gherkin feature files
│   ├── steps/              # Step definitions
│   └── hooks/              # Cucumber hooks
│
├── assets/
│   └── images/             # Baseline thumbnail images
│
├── reports/                # Test execution reports
│
├── cucumber.js
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md

Design Decisions
Page Object Model (POM) for API Testing

Although commonly used for UI testing, POM is applied to API testing here to:

Encapsulate endpoint logic

Separate test intent from implementation

Improve reusability and readability

Example layers:

ApiClient → low-level HTTP handling

BooksApiPage → endpoint-specific logic

Step definitions → business-level assertions


Configuration-Driven Image Validation

Thumbnail image checks use a central configuration mapping:
imageMapping: {
  'ISBN:0201558025': 'assets/images/135182-S.jpg',
  'LCCN:93005405': 'assets/images/240726-S.jpg',
  'ISBN:1583762027': 'assets/images/14882287-S.jpg'
}

This approach:

Avoids hardcoding

Makes adding/removing books trivial

Improves long-term maintainability


Image Comparison Strategy

Compared against stored baseline images

Normalized before comparison to avoid false negatives

JSON Schema Validation

Schema defined in src/api/utils/bookSchema.ts

Validates the entire API contract for all returned books dynamically

Checks required fields:

bib_key, info_url, preview, preview_url, thumbnail_url

Uses Ajv + ajv-formats to support URI validation

Note: AJV v8+ does not include URI format by default, so we include:
import addFormats from "ajv-formats";
addFormats(ajv); // Enables uri and other common formats
This ensures strict and reliable API contract validation.

How to Run the Tests
Prerequisites

Node.js 18+

npm


Install Dependencies
npm install
npx playwright install
npm install ajv ajv-formats


TypeScript Check
npm run typecheck

Run Tests
npm test


Reports

After execution:

Results are displayed in the console

A JSON report is generated at:
reports/cucumber-report.json
This can be integrated with external reporting tools if required.