# TaskTrack GitHub Copilot Instructions

## Project Overview

TaskTrack is a student task management web application for organizing and tracking schoolwork.

## Technology Stack

- Next.js using the App Router
- TypeScript in strict mode
- Tailwind CSS
- MongoDB
- Clerk for authentication and basic profile management
- Next.js API Route Handlers for server-side database operations

## Authentication

- Use Clerk for sign-up, sign-in, sign-out, and session management.
- Use the authenticated Clerk user ID as the application's user identifier.
- Protected pages include `/dashboard`, `/tasks`, and `/profile`.
- Protected API Route Handlers must verify the authenticated user.
- Users must only be able to access their own application data.
- Never expose authentication secrets or environment variables in client-side code.

## Data Model

### User

User identity and authentication are managed by Clerk.

Relevant information may include:
- `clerkUserId`
- `displayName`
- `createdAt`
- `updatedAt`

### Task

Tasks are stored in MongoDB.

Each task contains:
- `_id`
- `userId`
- `title`
- `details`
- `dueDate`
- `status`
- `createdAt`
- `updatedAt`

`userId` stores the authenticated Clerk user ID.

One user can have many tasks, and each task belongs to one user.

## Database

- Use MongoDB for application data.
- Store the MongoDB connection string in environment variables.
- Never commit database credentials or secrets to GitHub.
- Use a reusable MongoDB connection rather than creating unnecessary connections.
- Database operations should be performed through server-side code or API Route Handlers.

## API

Task API endpoints follow this structure:

- `GET /api/tasks?status=all|active|completed`
- `POST /api/tasks`
- `GET /api/tasks/[taskId]`
- `PATCH /api/tasks/[taskId]`
- `DELETE /api/tasks/[taskId]`

API Route Handlers must:
- Verify authentication.
- Validate input.
- Restrict data access to the authenticated user.
- Return appropriate error responses.
- Never expose another user's tasks.

## Component Architecture

Prefer reusable components instead of duplicating UI.

Important shared components include:
- `Header`
- `TaskCard`
- `TaskForm`
- `TaskList`
- `TaskStatusToggle`
- `FilterBar`
- `EmptyState`

Use Server Components for pages and data that do not require client-side interaction.

Use Client Components for interactive functionality such as:
- Task forms
- Task editing
- Completing/reopening tasks
- Filtering
- Interactive buttons and controls

## Pages

Primary application pages:

- `/dashboard` — task overview, counts, upcoming tasks, and completed tasks
- `/tasks` — task creation and task management
- `/profile` — profile information and display name management

## Task Rules

- Task status is either `active` or `completed`.
- Active tasks should be ordered by due date on the dashboard.
- The closest upcoming deadline should appear first.
- Users can create, edit, delete, complete, and reopen their own tasks.
- Do not allow users to access or modify another user's tasks.

## Styling and Design

Use Tailwind CSS consistently throughout the application.

### Color Palette

- Primary: Blue
- Primary Hover: Dark Blue
- Background: Light Gray
- Cards/Surfaces: White
- Text: Dark Gray
- Secondary Text: Gray
- Completed/Success: Green
- Error: Red
- Upcoming/Warning: Amber

### Typography

- Use a clean sans-serif font such as Roboto.
- Maintain a consistent type scale.
- Use stronger font weights for headings.
- Prioritize readability on desktop and mobile.

### Layout

- Use responsive centered containers.
- Use consistent spacing between sections and components.
- Use reusable card, form, button, and status styles.
- Support desktop and mobile layouts.
- Avoid horizontal scrolling on mobile.

## Code Quality

- Use TypeScript strict mode.
- Follow consistent TypeScript typing.
- Use ESLint and Prettier.
- Keep components focused and reusable.
- Handle loading, validation, empty, and error states.
- Do not use `any` unless there is a clear justification.
- Keep secrets and environment variables out of source code.

## Git Workflow

- Use feature branches for development.
- Submit changes through pull requests.
- Pull requests should be reviewed by at least one other team member before merging.
- Keep commits focused on the related feature or fix.