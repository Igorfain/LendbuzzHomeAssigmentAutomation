# TodoMVC Playwright Tests

This project contains automated tests for the [TodoMVC](https://todomvc.com/examples/react/dist/) application using [Playwright](https://playwright.dev/) and TypeScript. It includes tests for adding, completing, deleting, and filtering tasks, with reusable actions encapsulated in a dedicated class.

---

## Features
- Automated tests for TodoMVC: Covers adding, completing, deleting, and filtering tasks.
- Page Object Model (POM): Methods for reusable actions are encapsulated in todoPage.ts, with higher-level workflows in todoSteps.ts.
- Browser compatibility: Configurable to run on multiple browsers (Chromium, Firefox, WebKit).
- Debugging support: Includes Playwright Inspector for step-by-step debugging.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Git](https://github.com/)
- Install playwright and browsers to the project directory :
- npm install --save-dev @playwright/test
- npx playwright install

---

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Igorfain/LendbuzzHomeAssigmentAutomation.git

2. Run tests :  npx playwright test
3. Debug step by step : npx playwright test --debug


   
