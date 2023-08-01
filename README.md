# README

## Introduction

github-setup-chef-s_choice created by GitHub Classroom

Our application is designed to help the user manage their recipes efficiently and access them from anywhere by utilizing a database. This database containsfour individual tables holding details regarding the Recipes, Ingredients, the correlation between the two, and the User who wishes to utilize them. First and foremost our application will allow the user to View, Create, Update, Insert, and Delete attributes in the main three tables (Recipe, Ingredients, and User).

## Requirements

This code has been run and tested on:

- PostgreSQL - v15.3
- npm (Node Package Manager) - v9.5.0
- Nodejs - v18.15.0

## External Deps

- Heroku CLI - Download latest version at https://devcenter.heroku.com/articles/heroku-cli
- Git - Download latest version at https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- GitHub Desktop (Not needed, but HELPFUL) at https://desktop.github.com/

## Installation

Download this code repository by using git:

`git clone https://github.com/Summer23-CSCE-310-Database-Systems/github-setup-chef-s_choice.git`
 or 
`gh repo clone Summer23-CSCE-310-Database-Systems/github-setup-chef-s_choice`

## Tests

So far there is no formal way to test it using an external application, the only tests conducted are stress tests to see whether the functions perform as intended.

## Execute Code

Run the following commands in two seperate instances in Powershell if using windows or the terminal using Linux/Mac

Instance 1: 

` cd ...\github-setup-chef-s_choice\backend`

`npm start`

Instance 2: 

`cd ...\github-setup-chef-s_choice\frontend\my-react-app`

`npm start`

The application can also be seen using a browser and navigating to http://localhost:3000/

## Deployment

1. For this assignment you should clone the gitHub repository.

2. Make sure you have both node and npm installed by usinf the commands
    npm -v
    node -v
   If these commands come up with errors or no result follow the instructions here for both npn and Node: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

3. In order to obtain the correct tables to run any functionality tests, open a command prompt and change the current directory (CD) into
   ...\github-setup-chef-s_choice\create_tables, go into the "server.js" file, change the password into your own PostgreSQL password, create a database "chefschoice" in any PostgreSQL DBMS you prefer (pgAdmin4, DBeaver, etc...) and run the command 'npm start' to create your tables.

4. Fill in the newly created tables with whatever attributes you want so long as they fulfill the set data types.

6. In order for the backend to connect seamlessly you first need to change the "Password" variable in the backend folder for the 
   "server. js", "ingredients_api.js", and "ingredients.js" (this one's in the api folder) files.

5. Now, open up another command prompt and change the current directory (CD) to ...\github-setup-chef-s_choice\backend 
   and run the command 'npm start' to run the backend server.

6. Open up another command prompt and change the current directory (CD) to ...\github-setup-chef-s_choice\frontend\my-react-app 
   and run the command 'npm start' to run the   backend server.

7. From here the application should open on it's own, in the event that it does not, open up your browser and enter:
   'http:localhost:3000' in order to load the front-end, already connected to the back-end

8. As of now no login specification has been enables so enter any User ID you want and continue into the following pages.

