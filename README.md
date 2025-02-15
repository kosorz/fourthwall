# Architecture

## Environment

According to react [documentation](https://react.dev/learn/start-a-new-react-project#nextjs-app-router)
for production grade application (the way this application should be treated - along the task description) one of the frameworks should be used. I've selected next.js with app router.

Additionally I was trying to follow S.O.L.I.D principles.

## Styling

I’ve decided to use Tailwind CSS and shadcn/ui primarily to explore and experiment with it, Tailwind provides a great platform to make appealing interfaces fast. While shadcn/ui is a minimalistic components bundle that are highly customisable and "owned" as once invoked they become part of the project not part of library. These components are mostly dependency free. Its a different perspective after using styled components in conjunction with material-ui for few years.

## Data fetching

I've decided to use authorized way of consuming Github GraphQL server to get relevant data and particularly to avoid frequent problems with rate limiting. If the scope of interaction with some GraphQL servers would be broader a dedicated client might have been useful, for current scope I've decided to refrain from adding it.

You might notice that caching is there but there's no explicit mechanism implemented nor 3rd party solution added to handle this. This is because cache functionality built into fetch API exposed by Next.js was used.

The phase that costs us time and causes the visible delay is between user navigating to another page and our node instance responding with data. We could make the github-repositories a client component -> implement caching in the very end user browser -> still use node instance to fetch data to hide the details of the request. Thanks to slots entire route would be static and browsing would be significantly faster as the outbound network calls to node instance would be prevented in the very client. [See live version](https://fourthwall.netlify.app/) (branch: main-client). However it of course comes at a price:

- Route intersection (and possibly many more next.js features) malfunctions as the table now relies on the URL in the client - is not rendered in the server - the content changes while intersected route is used and URL changes
- The bundle size increases as more data is initially sent to client
  ...

## Security

Using server functions provides an additional layer of security. Contact with github API is done in a way that is not visible for the end user, therefore NEXT_PUBLIC_GITHUB_TOKEN is not surfaced in client browser.

# Limitations

## General

I've discoverd that REST api as well as GraphL does not support sorting by all columns mentioned in the task description. Sorting functionality was limited to name and stars(stargazers).

## Mobile specific limitations

In an effort to provide smooth mobile experience and avoid user being overwhelmed by the data density on a small screen following adjustments were made:

- only name and stars columns visible
- additional routes (parallel) to show details of each repository

# Error tracking

Error (and all activity!) is tracked via Sentry (don't get scared I won't know what you have put into search input as sensitive data is obfuscated - ethics!).

# Future improvements

- ci/cd workflows for tests and deployment
- limiting push/merge permissions
- setting up staging environment
- precommit hooks
- dark mode
- disable sorting buttons on headers when user has put a sort in search "q" as it should take precedence
- containerization and scaling (if the application would get traction)
- possible integration with [@tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr)
- while all checks are in passing zones there is always a room for improvement:
  <img width="324" alt="image" src="https://github.com/user-attachments/assets/2bb84773-1565-4a26-83c4-cd572bf0c415" />
  <img width="338" alt="image" src="https://github.com/user-attachments/assets/7b1fbb3c-cf97-45ba-9752-2602858486cf" />

# Tests

## Unit

I was able to cover majority of components with unit tests using jest and testing-library/react, those two technologies come together nicely.

## E2E tests

I picked playwright for a selfish reason of my development. I was using cypress for years so I want to give a spin to something new (and what actually competes with cypress).

# Getting started in localhost

Rename env.example file to .env.development and add missing NEXT_PUBLIC_GITHUB_TOKEN

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

~~
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Live version

Visit: [https://fourthwall-seven.vercel.app/](https://fourthwall-seven.vercel.app/)

# Running unit tests

```bash
npm test
```

```bash
yarn test
```

```bash
pnpm test
```

# Running e2e tests

```bash
npm test:e2e
```

```bash
yarn test:e2e
```

```bash
pnpm test:e2e
```
