# TaskTrack

## Project Title & Description
TaskTrack is a simple task management web application for students who want to keep track of their schoolwork in one place. Users can create an account and manage their tasks by adding, editing, completing, and deleting them. A simple dashboard shows users what tasks they have coming up and which tasks they have completed.

The initial release focuses on four core workflows: user authentication and profile management, task management, task filtering, and dashboard-based task tracking.

## Purpose & Target Audience
- Audience: Students who want a simple way to organize and track their schoolwork
- Purpose: Provide students with one place to record tasks, track upcoming work, and keep track of completed assignments
- Problem: Students need a simple way to organize school tasks and keep track of what they have completed
- Solution: TaskTrack provides a lightweight task management system with authentication, task status tracking, filtering, and a responsive dashboard

## User Stories

1. As a student, I want to create an account and log in so that I can securely access my personal tasks.
2. As a student, I want to log out so that my tasks and profile remain protected when I am not using the application.
3. As a student, I want to view and update my basic profile so that my account information stays current.
4. As a student, I want to create tasks so that I can keep track of my schoolwork.
5. As a student, I want to view my tasks so that I can see what schoolwork I need to complete.
6. As a student, I want to edit my tasks so that I can keep their information up to date.
7. As a student, I want to delete my tasks so that I can remove schoolwork I no longer need to track.
8. As a student, I want to mark tasks as completed or incomplete so that I can track my progress.
9. As a student, I want to filter tasks by status so that I can quickly view active or completed tasks.
10. As a student, I want to use a responsive dashboard so that I can see my upcoming and completed schoolwork on desktop or mobile devices.

## Acceptance Criteria

### Story 1: Create an account and log in
- Given a new user with valid registration information, when they submit the registration form, then an account is created and they can access the application.
- Given a registered user with valid credentials, when they log in, then they are authenticated and can access their tasks.
- Given invalid registration or login information, when the form is submitted, then the system displays a clear validation or error message without exposing sensitive information.

### Story 2: Log out
- Given an authenticated user, when they log out, then their authenticated session ends.
- Given a logged-out user, when they attempt to access protected content, then they are prevented from accessing private data.

### Story 3: Manage a profile
- Given an authenticated user, when they open their profile, then their basic profile information is displayed.
- Given an authenticated user, when they submit valid profile changes, then the updated information is saved and displayed.
- Given invalid profile information, when the form is submitted, then the system displays a validation message and does not save the invalid data.

### Story 4: Create a task
- Given an authenticated user, when they submit valid task information, then a new task is created and associated with that user.
- Given missing or invalid required task information, when the form is submitted, then the system rejects the task and identifies the invalid input.

### Story 5: View tasks
- Given an authenticated user with existing tasks, when they open their task list, then their tasks are displayed with relevant information such as title, details, due date, and status.
- Given an authenticated user with no tasks, when they open their task list, then a clear empty-state message is displayed.
- Given a user requesting another user's task, then access is denied without revealing the task data.

### Story 6: Edit and delete tasks
- Given an authenticated user with an existing task, when they submit valid changes, then the updated task information is saved and displayed.
- Given an authenticated user with an existing task, when they confirm deletion, then the task is removed from their task list.
- Given a task that does not exist, when the user attempts to modify or delete it, then the system returns an appropriate not-found response without affecting other tasks.

### Story 7: Mark tasks complete or incomplete
- Given an active task, when the user marks it completed, then the task status changes to completed.
- Given a completed task, when the user marks it incomplete, then the task status changes back to active.

### Story 8: Filter tasks
- Given a user viewing their tasks, when they select the active filter, then only active tasks are displayed.
- Given a user viewing their tasks, when they select the completed filter, then only completed tasks are displayed.
- Given a user viewing their tasks, when they select the all filter, then both active and completed tasks are displayed.
- Given a filter with no matching tasks, then the system displays a clear empty-state message instead of an error.

### Story 9: Use the dashboard
- Given an authenticated user with active and completed tasks, when they open the dashboard, then their upcoming and completed tasks are displayed.
- Given multiple active tasks, when the dashboard is opened, then upcoming tasks are displayed in order of their due date.
- Given a user on a mobile device, when they use the dashboard, then the interface remains readable and usable without horizontal scrolling.

## Technical Requirements
- Framework: Next.js using the App Router
- Language: TypeScript in strict mode
- Styling: Tailwind CSS
- Database: MongoDB
- Authentication: Clerk for sign-up, sign-in, sign-out, session management, and basic profile management
- Rendering: Use server-side and client-side rendering where appropriate
- API: At least one Next.js API Route Handler must perform a database operation and be consumed by a client component
- Components: Use at least five reusable components across multiple pages
- Design System: Use a defined color palette, type scale, and reusable component library
- Responsive Design: The application must work well on desktop and mobile devices
- Version Control: GitHub repository using a feature branch workflow
- Code Review: Pull requests must be reviewed by at least one other team member before merging
- Hosting: Vercel or a similar hosting service
- Code Quality: Follow consistent formatting, TypeScript typing, linting, and team coding standards
- Error Handling: Provide validation, loading states, error messages, and appropriate user feedback

## Core API Endpoints

### Authentication & Profile
- GET `/api/auth/session`
- GET `/api/users/me`
- PATCH `/api/users/me`

### Tasks
- GET `/api/tasks?status=all|active|completed`
- POST `/api/tasks`
- GET `/api/tasks/{taskId}`
- PATCH `/api/tasks/{taskId}`
- DELETE `/api/tasks/{taskId}`

Protected endpoints require an authenticated session and operate only on the current user's data.

## Key Entities

- User: An authenticated student with an account and basic profile information managed through Clerk.
- Task: A schoolwork item belonging to one user, containing information such as a title, optional details, due date, completion status, creation time, and update time.
- Session: The authenticated state that allows a user to access protected application resources.

## User Interfaces

The application will include at least three primary views:

1. Dashboard — Displays upcoming and completed tasks, task counts, and filtering controls.
2. Tasks — Allows users to create, view, edit, delete, and complete tasks.
3. Profile — Allows users to view and update their basic profile information.

Authentication screens such as sign-up and login will also be provided through Clerk.

## Implementation Priority
- P1: Sign up, sign in, sign out, authentication protection, and profile management
- P2: Create, read, update, delete, complete, and reopen tasks
- P3: Dashboard, task filtering, task counts, responsive design, and upcoming-task ordering

Each priority should remain independently testable and usable.