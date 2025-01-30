# Netmatters Website


## Project Description

This is my own reproduction of the Netmatters homepage, created to help hone my skills in web design and various technologies.

The live NetMatters website that this is based on, can be found at: [https://netmatters.co.uk](https://netmatters.co.uk)

Main languages/technologies used:
- HTML5
- CSS3 (SCSS)
- JavaScript ES6+
- jQuery v3.7.1
- PHP 8.2.12+
- SQL

Only the homepage, and contact page are currently implemented, but the site is designed to be fully responsive and accessible.

## Requirements
    
- A MySQL server is required to run this site.
- The web server must be configured to use PHP 8.2.12 or higher.
- The MySQL database schema must be established before the site can be used. (Instructions below)

## Setup Details

1. Set up the Web Server and SQL Server, making sure the web server is configured to use PHP 8.2.12 or higher.

2. Establish the MySQL database using the migration script `migration.sql` found in the root folder, and configure it with a user that has the necessary permissions to select and insert data into the database on these tables. 

3. Clone the repository, and place the files in the root directory of the web server.

4. The `inc/connection.php` file handles everything to do with the database, including reading database connection details. You will need to create a `.env` file in the root of the project, and configure it with the database connection details. An example `.env` file can be found in the root of the project with the name `example.env`.

5. Navigate to the homepage in your web browser, and you should be able to view the site.