# Book Store (Frontend)

## A project about book store using for applying in role Fullstack Developer

This is the frontend application for the backend API, built using **React** and **TypeScript**. The application communicates with the backend through **Axios** and includes forms managed with **react-hook-form** and **Zod** for validation. It uses **TailwindCSS** for styling and **Shadcn UI** for components. The app's state management is handled with **Zustand**, and **Jest** is used for testing.

This project is designed to work with the backend API, and it requires the backend to be running in order to interact with it.

## Tech Stack

- **React** - A JavaScript library for building user interfaces.
- **TypeScript** - A statically typed superset of JavaScript.
- **Axios** - Promise-based HTTP client for making requests to the backend API.
- **react-hook-form** - Library for handling forms in React.
- **Zod** - TypeScript-first schema declaration and validation.
- **TailwindCSS** - Utility-first CSS framework for fast UI development.
- **Shadcn UI** - UI components built with TailwindCSS.
- **Zustand** - Small, fast, and scalable state management solution.
- **Jest** - JavaScript testing framework.

## Prerequisites

Before running the frontend project, ensure the following:

- **Backend API** (https://github.com/lethal1147/test-softnova-be) must be running. Please follow the backend project README to set up and run the backend.
- **Node.js** and **npm** installed. (Node.js version 16.x or 18.x recommended).

You can check your Node.js version with:

```bash
node -v
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/lethal1147/test-softnova-fe.git
cd test-softnova-fe
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm run dev
```

The frontend application will be available at http://localhost:5173.

## Usage

The application is now ready to use. You can interact with the frontend interface and it will communicate with the backend API.

Once you initialize database with seed script in backend project, you ready to login as admin by test user (email: "test@gmail.com", password: "123456aA\*")

- Run tests:
  The project includes tests using Jest for testing discount logic which is part of test. To run the tests:

```bash
npm run test
```
