# jb_toc Application

jb_toc is a web application that consists of two parts - the client and the server. The client application is a Vite TypeScript React app that includes a Table of Contents (TOC) view part. The server application is a Fastify app that serves data from a `data.json` file via the `localhost:5100/api/data` endpoint.

## Installation

To get started with jb_toc, follow these steps:

1. Go to root app folder:

```bash
cd jb_toc
```

2. Install the dependencies from the root of jb_toc:

```bash
npm install
```

## Running the Application

You can start both the client and server applications using the following command from the root of jb_toc:

```bash
npm start
```

This will run both the Fastify server and the Vite client app concurrently.

Alternatively, you can run the applications separately:

- To start the server:

```bash
cd server && npm run dev # for dev build
cd server && npm run start # for prod build
```

- To start the client app:

```bash
cd client && npm run dev # for dev build
cd client && npm run serve # for prod build
```

## Testing

jb_toc includes test suites for both the client and server applications. You can run the tests for both parts with a single command from the root of jb_toc:

```bash
npm test
```

This will execute the tests for the client and server applications respectively.

## Folder Structure

The jb_toc application is organized into two main folders:

1. `client`: Contains the Vite TypeScript React app, including the TOC and other features.

2. `server`: Contains the Fastify app that serves the `data.json` file via the `/api/data` endpoint.
