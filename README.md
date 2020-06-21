# React-Laravel Project

React-Laravel is a REST API based project. Laravel handel the REST API and backend part. React handel
the frontend part. The main funtionality of the project is CRUD.

REST API operations are used to handel the requests come from frontend.

C->CREATE->POST

R->READ->GET

U->UPDATE->PUT

D->DELETE->DELETE

# Technologies

Laravel, React, REST and MySql

# Installation

## Laravel API

-> Clone the laravel project from the link https://github.com/mayusuf/react-laravel-crud in your project directory and enter the project directory.

-> Install composer dependencies are written in the composer.json file reside in the root directory 
 using the following command
 
 composer install
 
-> Create a copy of .env fiel that contains database connection information using the following command

 cp .env.example .env
 
-> Generate an app encryption key writing following command

 php artisan key:generate
 
-> Create an empty database for the application in MySql

-> Add database information in the .env file to connect with your database

-> Migrate the database: php artisan migrate

-> Start the project : php artisan serve

## React

-> Clone the project in your local directory from the link https://github.com/mayusuf/react-laravel-crud-react-part

-> Enter project directory

-> Install dependencies are added in the package.json file by running the following command

  npm install
  
-> Change only the host part of the API request URL. There are few constants named API_MOVIE and API_CAT.
 These are reside in files APP.js(/src folder), Movies.js(/src/components) and EditMovie.js(/src/components).
 
-> Change the host part in the img src attribute in the file Movies.js(/src/components)

-> Start the project by running:

 npm start

# Future Update

The application is being developed. So, It will be updating time to time.  

# Authors

* **ABU YUSUF** - [mayusuf](https://github.com/mayusuf)