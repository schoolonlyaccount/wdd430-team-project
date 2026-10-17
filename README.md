This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Team Members

- Michael Kyne
- There are no others...

## Project Description

TaskTrack is a simple task management web application for students who want to keep track of their schoolwork in one place. Users can create an account and manage their tasks by adding, editing, completing, and deleting them. A simple dashboard shows users what tasks they have coming up and which tasks they have completed.


## Environment Configuration
TaskTrack uses MongoDB to store and retrieve task data. The MongoDB connection string is configured through environment variables.

# Required Environment Variables
Create a .env.local file in the root directory of the project and configure the following variables:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY     (Clerk publishable key used by the application for authentication.)
- CLERK_SECRET_KEY                      (Secret key used by the server to interact with Clerk.)
- MONGODB_URI                           (MongoDB connection string used to connect to the TaskTrack database.)

Example configuration:
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
- CLERK_SECRET_KEY=your_clerk_secret_key
- MONGODB_URI=your_mongodb_connection_string
Replace the placeholder values with the appropriate credentials from your Clerk and MongoDB configurations.

# Setup Instructions
1. Ensure you have access to a configured MongoDB database and a Clerk application.
2. Create .env.local in the project root.
3. Add the required environment variables listed above.
4. Install project dependencies by running npm install.
5. Start the development server by running npm run dev.
The application uses a reusable MongoDB connection shared by its API Route Handlers. Clerk handles user authentication, while MongoDB stores and retrieves task data.

# Security
- Never commit .env.local or actual credentials to version control.
- Keep CLERK_SECRET_KEY and MONGODB_URI server-side.
- Only use the NEXT_PUBLIC_ prefix for values intentionally exposed to the browser, such as the Clerk publishable key.
- Ensure .env.local is excluded from Git using .gitignore.