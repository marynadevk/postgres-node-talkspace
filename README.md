# Talk Space

## Description

Talk Space is a real-time messaging application that allows users to communicate through individual and group chats. It leverages modern web technologies to provide a seamless and interactive user experience.


## Main Technologies Used
- **PostgreSQL**: As the database for storing user data, conversations, and messages, ensuring data persistence and reliability.
- **Express.js**: For building the backend server and handling API requests.
- **Prisma**: As the ORM for database operations, making it easier to work with the database.
- **Socket.IO**: For enabling real-time, bidirectional and event-based communication between the web clients and the server.
- **React**: Used in the frontend for building the user interface in a declarative way with efficient updates and rendering.
- **TypeScript**: Used both in the frontend and backend for adding static type definitions to JavaScript, enhancing code quality and understandability.


## Getting Started

To set up the project, follow these steps:

1. **Clone the repository:**

```sh
 git clone https://github.com/marynadevk/postgresql-nodejs-talkspace.git
 cd <project_directory>
```

2. **Install dependencies:**

```sh
  npm install
```

3. **Create a .env file with the same variables as in .env.example**


4. **Build the application for production:**

```sh
npm run build
```

5. **Start the application:**

```sh
npm start
```

## API Endpoints

### Authentication
| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| GET    | `/api/auth/me`     | Retrieves the current user's information |
| POST   | `/api/auth/signup` | Creates a new user account      |
| POST   | `/api/auth/login`  | Logs in a user                   |
| POST   | `/api/auth/logout` | Logs out a user                  |

### Messages
| Method | Endpoint                     | Description                                 |
| ------ | ---------------------------- | ------------------------------------------- |
| GET    | `/api/messages/conversations`| Lists conversations for the sidebar        |
| GET    | `/api/messages/:id`          | Retrieves messages with a specific user ID  |
| POST   | `/api/messages/send/:id`     | Sends a message to a specific user ID       |