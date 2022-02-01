# Code Warehouse

Manage all your code snippets, and share them with ease

![code-warehouse-screenshot-v2](https://user-images.githubusercontent.com/30555057/151898464-d5983712-866f-4867-9177-78f2485917b2.png)

Use the app live: https://code-warehouse.herokuapp.com/

## Inspiration
Programming have improved productivity substantially in so many ways. However, for beginners, it is often hard to know all of the shortcuts/syntax by heart. Additionally, searching the right code for the task could be very time-consuming. Sometimes, it could even take hours to find for the right command. 

One solution to this problem is to create an app for programmers to share code snippets with each other. With such a platform, they can get help from other coders' code, while helping others. This way, everyone will be more productive at work.

## What it does
- This web app allows users to manage their code snippets and share snippets to everyone. 
- It categorizes snippets by languages (e.g., Python, Java, and JavaScript), and allows users to find snippets from any of these categories.
- It also allows logged-in users to share their own code snippets with the world.

## How I built it
- I used React, Tailwind.css, and Material-UI to power the web frontend. Additionally, I used Formik to simplify HTML forms.
- For the backend, I used Python (Django) to build a RESTful API backend, connected to a Postgres database.

## Setup

- Install python 3 and npm (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Install python dependencies using `pipenv`: run `pipenv shell; pipenv sync`
- Install React frontend dependencies: In the `frontend` directory, run `npm install`
- Finally, run `npm start`. A local version of the app will be up and running!


## License
MIT License
