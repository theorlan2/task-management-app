
# Task Managment App
<img src="/resources/task-managment.png">

This Task Managment App project is built using [Next.js](https://nextjs.org) and provide a user-friendly platform for managing tasks efficiently.
It integrates a mock API server using `task-management-back` repository and `json-server-auth`.The API is create to help the frontend connect and manipulate data as needed.


## Initializing Mock API using task-management-back with json-server and json-server-auth

To set up a mock API using the `task-management-back` repository and `json-server-auth`, follow these steps:

1. Clone the `task-management-back` repository:

```bash
git clone https://github.com/theorlan2/task-management-back.git
cd task-management-back
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the mock API server:

```bash
npm run start
# or
yarn run start
# or
pnpm run start
```

Now, the Next.js project can connect to the mock API running on `http://localhost:4000`. You can modify the data in `src/db.json` to test the application.

## Getting Started Frontend

Now run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Running Tests and Test Coverage Analysis

To run the tests, you can use `jest` with the following command:

```bash
npm test
# or
yarn test
# or
pnpm test
```

To generate the test coverage report, use this command:

```bash
npx jest --coverage
# or
yarn test:coverage
# or
pnpm test:coverage
```

Open `coverage/lcov-report/index.html` in your browser to view the code coverage report.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


## Project Structure

Inside the project directory, you'll find some important files and directories:

- `public`: This is where static assets such as images and fonts are stored.
- `src`: This is where your application code lives. It contains several subdirectories for different types of files (stylesheets, scripts etc).
  - `app`: The businnes logic of the application.
    - `components`: The globals components of the application.
  - `context`: Contains context providers and related functions for sharing data across components.
  - `hooks`: Contains custom React hooks to reuse logic between multiple components or pages.
  - `lib`: Contains utility functions, constants, or other shared code that doesn't fit into other categories.
    - `features`: This folder will contain Redux (RTK) logic for various application features.
    - `store.tsx`: The main Redux store for the application, including configureStore function and related setup.
  - `middlewares`: Contains custom middleware functions to handle side effects or manage data in asynchronous operations.
  - `services`: Contains API clients, utilities for communicating with external systems, and data processing modules.
  - `types`: Defines interfaces, enums, and type aliases used throughout the application.
  - `index.html`: The main entry point of the application.
- `yarn.lock` : These files are used by Yarn to manage dependencies.
