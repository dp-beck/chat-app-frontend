# Chat! (Front-End)

## Important Note
Chat! is hosted for FREE on Render. Render spins down a free web service that goes 15 minutes without receiving any inbound traffic. Render spins the service back up whenever it next receives a request to process.

Spinning up a service takes up to a minute, which causes a noticeable delay for incoming requests until the service is back up and running. IT MAY TAKE UP TO ONE MINUTE FOR THE APPLICATION TO LOAD, UPON START UP. Please be patient. 

## Description
Chat! is a no-frills realtime chat application that supports two-person conversations between registered users.

You can access the site at [Chat!](https://chat-app-frontend-0wt0.onrender.com/),  where you can sign in, create a new user, or explore the application using the provided "test" username.

## Technologies Used:

* **React** -Javascript library used to build the user interface for the chat application
* **React Router** - React library to handle client-side routing.
* **Bootstrap** - A front-end styling framework for building a responsive visual layout for the application.
* **Socket.io** - Event-driven library for handling realtime communication between client and server; enables chat messages to be sent and received in real time.
* **Render** - Cloud service used to host the application.

## Back-End Information

A REST API written using Express (a popular Node.js framework) handles basic create, read, update, and delete operations. The data for the application is stored in a MongoDB database (a NoSQL database). For more information, please refer to the separate repository for this application's back-end [Chat! Back-end](https://github.com/dp-beck/chat-app-backend).
