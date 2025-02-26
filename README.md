# Groqiphy Compliance Training Prototype

This prototype showcases the use of real-time simulation with scenario broken into several stages and the use of AI for context-aware hints. User is under a time limit and must progress through each stage until completion or failure. 

By using Game mechanics we can simulate real life scenarios in a controlled and safe environment to help train personnel on compliance requirements and to build good habits and preparedeness for real life threats.

## Architecture
In this monolith repository you will find a frontend and a backend directory containing the entire prototype application. Below is a list of our choice of technologies used to build this prototype.

### Front End

For our Front End we chose ReactJS. ReactJS is very popular and has been around since 2013, that means we have access to a large pool of developers who are experienced in it and can hit the ground running. We also have access to a large amount of public knowledge and experience we can use to help us and the open source community has built a lot of tools and libraries on the ReactJS Framework that we can tap into.

Since this is a simple prototype, we're just using the built in Context API and Custom Hooks to manage the state that components can subscribe to as needed. We could use Redux for a more complex state management.

Material-UI helps with a lot of the heavy lifting for UI Components so we can focus more on the business logic and less on handling UI logic (like open/close a dialog).

Socket IO is needed for our real-time bidirectional communication over websockets. This is very useful to handle user actions and manage most of the game logic on the server-side to prevent user manipulation on the client-side and persistence of the game state.

- ReactJS
- Context API and Custom Hooks
- Socket.IO Client
- Material-UI
- Typescript

### Back End

For our Back End we chose NodeJS and ExpressJS as it is great for handling a large number of requests through the non-blocking event loop. Since we're using Javascript on Front End and Back End this allows for easy onboarding of new developers and allows them to contribute on both sides of the stack. ExpressJS gives us a lightweight framework to allow us to add middlewares and other tooling for handling API requests. This will be more useful when we start building out the Administration application.

We use Socket.IO to handle the bidirectional communication between the client and the server and storing the user-state and game-state in-memory for this prototype. This allows for fast lookups and response for real-time simulations.

MongoDB was added but not used as part of the prototype. The use case for MongoDB is to store the Game Scenarios that Organizations will build for their Compliance training. By using MongoDB we can store large JSON datasets for complex scenarios and send the subset of data as needed for the client to render. MongoDB also provides a lot of out of the box tooling, schema definitions and querying tools through the mongoose library.

- NodeJS
- ExpressJS
- MongoDB
- Socket.IO
- Typescript

We chose Typescript to help with type safety at build time and for easy reference on both Front End and Back End.

## Setup
To setup and run on your local machine, follow the instructions below for each directory.

### Front End
- run `npm install` to install all dependencies

- create a `.env` file and fill in the required values, see `.env.sample` for all required key/values

- run `npm run dev` to run the application

### Back End
- run `npm install` to install all dependencies

- create a `.env` file and fill in the required values, see `.env.sample` for all required key/values

- run `npm run dev` to run the application

## Future Features
This solution allows us to offer more advanced features in the future. I was thinking why limit the game to a single player? what if we could introduce a group and create a group scenario where several players are playing the scenario and each has their own part. By using Websockets we can create a group and assign them the same `GameStage` with which all players can interact.

The current implementation has a very simple Game Scenario, we can expand this scenario to something more branched with several paths. So when a user picks the wrong path, instead of terminating the game we could take them to a scenario that is now worse, e.x. more systems have been breached or affected, and give users options to try and recover from it.

Administration App would be how our clients can self serve and manage their game scenarios and publish them to their employees to partake in. This app could also be useful to review employee success rate, statistics, leaderboard, etc.