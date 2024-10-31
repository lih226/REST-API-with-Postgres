# CSE264 Project 3: Building a REST API with Postgres
## Due: Monday, Nov 13, 2024 at 11:59 PM
## Add your full name and Lehigh email address to this README!

In this assignment, you will use Node.js, Express.js and Postgres to create your own REST API for Films, and Film Reviews. You will also write some frontend javascript code to test your REST API.

All the code and packages you need is in this GitHub Classroom repo. Do not install any other packages.

### REST API
Your API will have two tables: "films_{id}" and "reviews_{id}" where id is your six alphanumeric lehigh login (i.e. ma0523)

You will need to implement the following URI routes:

* POST - /films
  * This should accept a JSON body and create a new film element in the film collection
  * ID and DATE should be created server side, which means it is not provided or given by the client (ID should be a number, date should be Data.now)
  * Any invalid data upload (missing fields) should return a 400 error
  * The only field that has to be unique is Film ID, but the client never gives this (only made by the server)
  * This `film_id` field is set to be not null
* GET - /films
  * Return a JSON listing of all films in Database.
* GET - /films/[film_id]
  * This should return in JSON the contents on this film. If no such film exists, it should return a 404. If any reviews are in this film, it should return all of them as well.
* PUT - /films/[film_id]
  * This should accept a JSON body and update the film by [film_id]. If this film does not exist, it should create it.
  * This PUT can have Date included by the client, unlike the POST request. ID should not be in JSON body, as it is already in the URL.
* DELETE - /films/[film_id]
  * This should delete the film. Return 404 if no such film exists.
* POST - /films/[film_id]/reviews
  * This should accept a JSON body and create a review element in the reviews table of the film identified by [film_id].
  * ID and DATE should be created server side (ID should be a number)
  * Any invalid data upload (missing fields) should return a 400 error
  * Same rules from POST /films apply here has well
* GET - /films/[film_id]/reviews
  * Return a JSON listing of all reviews from the film identified by [film_id].
* GET - /films/[film_id]/reviews/[review_id]
  * This should return in JSON the review on this film. If no such review exists, it should return a 404
* PUT - /films/[film_id]/reviews/[review_id]
  * This should accept a JSON body and update the review identified by [review_id]. If this review does not exist, it should create it.
* DELETE - /films/[film_id]/reviews/[review_id]
  * This should delete the review. Return 404 if no such review exists.

Also create search functionality for your API.
* GET - /films?search=[search_Query]
  * Return a JSON listing of all films that have [search_Query] in the Title or Body.
* GET - /films/[film_id]/reviews?search=[search_Query]
  * Return a JSON listing of all reviews from the post identified by [film_id] that have [search_Query] in the Title or Body.

Table for Film
* `film_id` (Primary Key)
  * ID for Film - remember this is only created server side, should never be in the body of a POST/PUT
* `title`
  * Title of the Film (limited to 255 characters)
* `body`
  * Description of the Film
* `date`
  * Date when Film was added to API. Created server side, never in POST, can be in PUT.

The JSON should be in this format (i.e. same names)
```json
{
   "FilmID":12, 
   "Title":"Citizen Kane", 
   "Body":"Rosebud!",
   "Date":"Wed, 24 Mar 2021 15:37:46 GMT",
} 
```

Table for Review
* `review_id` (Primary Key)
  * ID for Review - remember this is only created server side, should never be in the body of a POST/PUT
* `film_id` (Foreign Key)
  * ID for the Film this review is for
* `title`
  * Title of Review
* `body`
  * Body of Review
* `date`
  * Date when Review was created. Created server side, never in POST, can be in PUT.

The JSON should be in this format (i.e. same names)
```json
{
   "ReviewID":21, 
   "Title":"Citizen LAME!!!", 
   "Body":"It's just his stupid sled! That's it! I saved you 3 hours.",
   "Date":"Wed, 24 Mar 2021 15:37:46 GMT"
} 
```

The two tables can either be joined on `film_id` or using a given film's id, you can create the nested JSON below.

```json
{
   "FilmID":12, 
   "Title":"Citizen Kane", 
   "Body":"Rosebud!",
   "Date":"Wed, 24 Mar 2021 15:37:46 GMT",
   "Reviews":[
    {
     "ReviewID":21, 
     "Title":"Citizen LAME!!!", 
     "Body":"It's just his stupid sled! That's it! I saved to 3 hours.",
     "Date":"Wed, 24 Mar 2021 15:37:46 GMT"
    } 
   ]
} 
```


### Frontend Testing
You will also need to test all the routes listed above, using similar fetch requests you used in Project 1 and 2. I want to see 4 examples of Create, Read, Update, and Destroy on the Film Table (be sure to add reviews to your Film test as well). You can hard code this with any information you want. I just want to see four examples of you using your own API. A basic index.pug page with some buttons have been created for you in this project. The code in /public/javascripts/main.js will fire when pressing these buttons. Feel free to add new buttons to create more events, or test other behaviour. Write comments in main.js to describe your tests and what expected output is. 

### Install and Run
You must have node.js running on your machine. Once you have cloned this project you can run `npm install` to install all the packages for this project. Then running `npm run dev` will run the dev version of this code, which will run this project with nodemon. Nodemon auto-restarts the node server every time you make a change to a file. Very helpful when you are writing and testing code.

### .env and Postgres Installation
A Postgres instance has been provided to you.  Your username for the database is your 6 character alphanumeric lehigh id.  Your password for the database is your 6 character alphanumeric lehigh id followed by '_lehigh'.

You will need to cretae a .env from the .env.example 
You can do this by `cp .env.example .env`

Then store your Database credentials in your  `.env` file.

**Note:** Never EVER push private information (like credientials) to a Git Repo. We use .env to store this connection inforation and ensure that git (using .gitignore) never pushs this private information in the repo. Never ever store real credentials in `.env.example` or anywhere that is not `.env` as you may push these changes to your git repo.

### Grading
* **70 Points** - REST API works as described in this README. All routes and search works as expected. All inputs are validated and correct errors are returned to client
* **15 Points** - Frontend Test Create, Read, Update, Destory on Film collection.
* **10 Points - Create a 5 minute video and include a link to it in this README that covers and explains how your code works. 
* **5 Points** - Backend and Frontend code is well commented and easy to read/follow.

* If code doesn't run/compile you can get no more than a 65. But please write comments and a README to explain what you were trying to do. 


