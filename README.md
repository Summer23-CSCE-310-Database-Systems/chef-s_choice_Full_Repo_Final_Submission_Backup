# README

## Introduction

github-setup-chef-s_choice created by GitHub Classroom

Our application is designed to help the user manage their recipes efficiently and access them from anywhere by utilizing a database. This database containsfour individual tables holding details regarding the Recipes, Ingredients, the correlation between the two, and the User who wishes to utilize them. First and foremost our application will allow the user to View, Create, Update, and Delete attributes in the main three tables (Recipe, Ingredients, and User).

## Requirements

This code has been run and tested on:

- PostgreSQL - v15.3
- npm (Node Package Manager) - v9.5.0
- Nodejs - v18.15.0
- Yarn - v0.32+git

## External Deps

- Git - Download latest version at https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- GitHub Desktop (Not needed, but HELPFUL) at https://desktop.github.com/

## Installation

Download this code repository by using git:

`git clone https://github.com/Summer23-CSCE-310-Database-Systems/github-setup-chef-s_choice.git`
 or 
`gh repo clone Summer23-CSCE-310-Database-Systems/github-setup-chef-s_choice`

Make sure you have both node and npm installed by using the commands

   `npm -v`
   `node -v`

   If these commands come up with errors or no result follow the instructions here for both npn and Node: 
   `https://docs.npmjs.com/downloading-and-installing-node-js-and-npm`

Also have <u><b>React-scripts</b></u> installed, if you don't simply use the command:

`npm install -g react-scripts`

Other helpful installs for npm we've come across that are required to run the code:

<u><b>Axios:</b></u>   

`npm install axios`

<u><b>React-Router:</b></u>       

`npm install react-router-dom`

<u><b>React-Icons:</b></u>       

`npm install react-icons`

<u><b>Styled Components:</b></u>  

`npm install styled-components`

## Tests

For testing we decided to run individual components such as each functionality of CRUD for the Recipe and Ingredients pages, making sure that nothing broke along the way of our implementations. None of us were comfortable or knowledgeable in creating individual test cases so we created a system. Before a git pull we would individually check the application for any existing bugs, if none were found we performed the pull and checked again, if new bugs appeared we knew where to check and could systematically remove them from our application.

## Execute Code

Run the following commands in two seperate instances in Powershell if using windows or the terminal using Linux/Mac

Instance 1: 

`cd ...\github-setup-chef-s_choice\backend`

`npm start`

Instance 2: 

`cd ...\github-setup-chef-s_choice\frontend\my-react-app`

`npm start`

The application can also be seen using a browser and navigating to http://localhost:3000/

To create the tables in the database follow these steps:

In order To obtain the correct tables to run any functionality tests, open a command prompt and change the current directory (CD) into:

`...\github-setup-chef-s_choice\create_tables`

From here, in your Visual Studio code go to the "password.js" file in the create_tables folder, change the password into your own PostgreSQL password, create a database "chefschoice" in any PostgreSQL DBMS you prefer (pgAdmin4, DBeaver, etc...) and run the command `npm start` in the command prompt above to create your tables.

## Deployment

1. For this assignment you should clone the gitHub repository.

2. In order for the backend to connect seamlessly you first need to change the "Password" variable in the backend folder for the 
   "password.js" file to your own PostgreSQL password.

3. Now, open up another command prompt and change the current directory (CD) to `...\github-setup-chef-s_choice\backend`
   and run the command 'npm start' to run the backend server.

4. Open up another command prompt and change the current directory (CD) to `...\github-setup-chef-s_choice\frontend\my-react-app` 
   and run the command 'npm start' to run the backend server.

5. From here the application should open on it's own, in the event that it does not, open up your browser and enter:
   `http:localhost:3000` in order to load the front-end, already connected to the back-end

6. From the login page you may sign in using any name, this name will be given a set User ID which will permanently stick to    
   that name and be added to the Database.

7. After submitting to the Login page you can move on to the Recipe page using the Navigation bar, here we have implemented the CRUD functionality, making it so that you may Add, View, Update, or Delete any of the tuples in the Recipe database.

8. To complete this function, simply type in any information into the provided Text Boxes and select "Add Recipe", this will add it to 
   the Recipe table and display itself around the top of the page to be clicked on and viewed inside those same text boxes at any time. 

9. In order to run the Update and Delete commands, you simply click on the "View" button next to their name at the top of the page, if    
   you want to update them you type in the new information and click the "Update Recipe" button. If you want to delete the recipe from the table all you need to hit is "Delete Recipe" after you're viewing it.

10. An exclusive functionality to the Recipe table is also available, at the bottom of the page you can select the specific categories you've created and only those recipes will be displayed below.

11. Steps 7 through 9 are the same for the Ingredients page as it has the same functionality.

12. Lastly you can navigate to the Recipe-Ingredient page, here you can select between any of the Recipes or Ingredients you've created and manipulate the quantity of said ingredients. After doing so you may add them to the database using the "Add" button on the side or Update/Delete them by first pressing "view" next to your entries and then clicking either of the corresponding buttons (You must change the quamtity of an Ingredient for it to actually Update).

13. NOTE: Upon deletion of a specific Recipe or Ingredient, any relation in the Recipe-Ingredient Table/page will also be deleted.

14. After you are satisfied with the tables and any changes you may have made, you may return to the "Login" Page and Logout your User.

## Final Thoughts

We are satisfied with the end result of this project, although we were unable to implement every functionality we were previously intending to in our design we were still able to create a well-functioning application that connects to each table in our database. CRUD has been implemented extensively for the Recipe, Ingredient, and combined Recipe-Ingredient tables with it being implemented slightly less for the User table which was utilized mostly in the backend to add connections between the tables. We had to depart from a few additional implementations such as the Ingredients selection and the Favorites feature as these were either already partially or fully implemented or proved too troublesome to complete on time. Our team worked tirelessly over these last couple weeks to try and supply the best product we could in the time given, and if this Final Code Submission is what we have to show for it then we believe we succeeded.
