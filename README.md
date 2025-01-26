## Architecture

According to react [documentation](https://dev/learn/start-a-new-react-project#nextjs-app-router)
for production grade application (the way this application should be treated - according to the task description) one of the frameworks should be used.

## Styling

I’ve decided to use Tailwind CSS primarily to explore and experiment with it, Tailwind provides a great platform to make appealing interfaces fast.

## Data fetching

I've decided to use Github GraphQL server to get relevant data. If the scope of interaction with it would be broader a dedicated graphql client might have been useful. For current scope I've decided to refrain from adding it as each line of code as well as dependency in project has its price and this price comes not from adding the line or dependency but from its maintenance.

## Caching

You might notice that caching is there but there's no explicit mechanism implemented nor 3rd party solution added to handle this. This is because I've decided to use opt-in cache functionality built into fetch API exposed by Next.js.

## Getting Started

First, run the development server:

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
