### Online Coding Web Application
https://codeblock-ten.vercel.app/

## Overview
This project is an online coding web application designed to facilitate real-time remote coding sessions between a mentor and a student. The application features a lobby for selecting code blocks and a collaborative coding environment where the mentor can observe the student's code changes in real-time.

# Features
Lobby Page

- Displays a list of at least four code blocks.
- Each code block is represented by a name 
- Clicking on a code block takes the user to the corresponding code block page.
  
Code Block Page
Allows two users to enter: one mentor and one student.
The mentor sees the code block in read-only mode.
The student can edit the code block. Code changes are displayed in real-time. 

Each code block may have a different "solution" defined.
When the student's code matches the solution, a big smiley face is displayed on the screen.
(If its hard there is a hint button 😉)

Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
WebSocket: Socket.IO
Syntax Highlighting: react-textarea-code-editor
Database: MongoDB 
Deploy
Client - vercel.com
Server Render.com

## Installation
1. npm install
2. npm start (server & client)
