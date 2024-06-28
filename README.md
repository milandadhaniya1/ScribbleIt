# Scribble it

## About
**Scribble it** is a real-time collaborative drawing and messaging application. It allows users to generate and customize avatars, communicate through messages with GIFs and emojis, and draw on a shared canvas with live cursor movement. 

## Used Frameworks / Libraries
- **Express.js**: A web application framework for Node.js.
- **Socket.io**: Enables real-time, bidirectional, and event-based communication.
- **Vue 3**: A progressive JavaScript framework for building user interfaces.
- **Typescript**: A strongly typed programming language that builds on JavaScript.
- **Vite**: A build tool that significantly improves the development experience.
- **DaisyUI**: A plugin for Tailwind CSS that provides a set of accessible and reusable UI components.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **vite-plugin-pages**: A Vite plugin for file-based routing.

## Features Covered
- **Auto Routes**: Automatic generation of routes based on the file structure.
- **Avatar Generation and Customization**: Users can create and personalize their avatars.
- **Real-Time Messaging with GIFs and Emojis**: Supports instant messaging with multimedia.
- **Real-Time Canvas Drawing with Live Cursor Movement**: Collaborate on drawings in real-time, with visible cursor movements of other users.

## To Start the Application
1. Build the project:
   ```sh
   pnpm run build
   ```
2. Start the server:
   ```sh
   pnpm run server:start
   ```
3. Open the application in your browser:
   ```
   http://localhost:4300
   ```

## To Restart the Server
To restart all server instances, run:
```sh
pnpm run server:start all
```

## To Stop the Server
To stop all server instances, run:
```sh
pnpm run server:delete all
```

## To List All Server Instances
To list all running server instances, run:
```sh
pnpm run server:list
```

## Author
Milan Dadhaniya

This guide provides the essential commands and information to get started with **Scribble it**. Happy scribbling!