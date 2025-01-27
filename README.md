## Architecture

According to react [documentation](https://dev/learn/start-a-new-react-project#nextjs-app-router)
for production grade application (the way this application should be treated - according to the task description) one of the frameworks should be used. I've selected next.js with app router.

## Styling

I’ve decided to use Tailwind CSS and shadcn primarily to explore and experiment with it, Tailwind provides a great platform to make appealing interfaces fast. While shadcn/ui is a minimalistic components that are highly customisable and somehow "owned" as they are a part of the project not part of library (mostly - not considering indirect dependencies).

## Data fetching

I've decided to use Github GraphQL server to get relevant data. If the scope of interaction with it would be broader a dedicated graphql client might have been useful. For current scope I've decided to refrain from adding it.

You might notice that caching is there but there's no explicit mechanism implemented nor 3rd party solution added to handle this. This is because opt-in cache functionality built into fetch API exposed by Next.js was used

## Limitations

I've discoverd that REST api as well as GraphQl does not support sorting by each all columns mentioned in the task description. Sorting functionality was limited to name and stars(stargazers).

## Mobile specific limitations

In an effort to provide smooth mobile experience and avoid user being overwhelmed by the data density on a small screen following adjustments were made:

- sorting limited to name
- additional routes to show details of each repository

## Error tracking

Error (and all activity!) is tracked via Sentry (don't get scared I won't know what you have put into search input as sensitive data is obfuscated - ethics!).

## Security

Using server components approach provides an additional layer of security. Contact with github API is done in a way that is not visible for the end user, therefore NEXT_PUBLIC_GITHUB_TOKEN is not surfaced for the end user.

## Future improvements

- ci/cd workflows for tests
- limiting push/merge permissions
- setting up staging environment

## Getting started in localhost

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

## Live version

Visit: [https://fourthwall-seven.vercel.app/](https://fourthwall-seven.vercel.app/)

## Running unit tests

```bash
npm test
```

```bash
yarn test
```

```bash
pnpm test
```

## Running e2e tests

```bash
npm test:e2e
```

```bash
yarn test:e2e
```

```bash
pnpm test:e2e
```
