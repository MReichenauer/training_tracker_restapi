# Traing Tracker (back-end)

## Project Overview
Back-end reprository for Training Tracker. 
Training Tracker is a web application where users can add, edit, and delete their training records. 

## Tech Stack
TypeScript, Node.js, Express, JWT, Bcrypt, Prisma, Express Validator.

### How to run this project locally
1. Clone reprository.
2. Create a MySQL database.
3. Run `npm i` in the root folder.
4. Create a .env file according to the .env.example
5. Run `npx prisma generate` in the root folder. 
6. Run `npm run dev`

**NOTE:** To run this project you need to clone and run the back-end as well,
this can be found at: https://github.com/MReichenauer/training_tracker_restapi

To run this localy, you follow this steps below.
1. Clone or download this repo.
2. Create a `.env` and follow the example file.
3. Set up a `MySql` and dont forget to put your `DATABASE_URL` to your own in the `.env`.
4. Run `npm install` in terminal (root of the project).
5. Run `npx prisma generate`.
6. Start your `Mamp`.
7. Run `npm run dev` in the root of the project via your terminal.
8. Now you can use the api locally!


#### Available routes
The documentation for the response lacks. It was a long time ago i created this project, and at that point in time i didn't do accurate documentation. I will clone this repo and go through all the endpoints to update the documentation.

 * Register a new user 
  * Method: POST
  * Endpoint: /register
  * Request body should include following keys: 
    * key: "first_name", type: string.
    * Key: "last_name", type: string.
    * Key: "email", type: string.
    * Key: "password", type: string.
    * key: "weight", type: string.
    * key: "height", type: string.

 * Login a regisered user
  * Method: Post `POST /login` with the body of {"email": "example@example.com", "password": "example123"} in response you will get your JWT that you need to send in auth header in all the other requests.
  * Endpoint: /login
  * Request body should include following keys:
    * Key: "email", type: string.
    * Key: "password", type: string.
  * The response will provide you with a JWT token.
  
* Get profile information
  * Method: GET
  * Endpoint: /profile
  * Headers: Key: auth, type: bearer token, value: JWT

* Update profile information
  * Method: PATCH
  * Endpoint: /profile/edit
  * Headers: Key: auth, type: bearer token, value: JWT
  * Request body: The proifle information key-value pair that should be updated.

* Delete a profile
  * Method: DELETE
  * Endpoint: /profile/delete
  * Headers: Key: auth, type: bearer token, value: JWT

 * Add a training record
  * Method: Post
  * Headers: Key: auth, type: bearer token, value: JWT
  * Request body should inclide the following keys:
    * Key: "date", type string (YYYY-MM-DD format)
    * Key: "exercise", type: string
    * Key: "weight", type: number
    * Key: "reps", type: number

* Get all training records
  * Method: GET
  * Endpoint: /progress
  * Headers: Key: auth, type: bearer token, value: JWT

* Get a single training record by id
  * Method: GET
  * Endpoint: /progress/:progressId
  * Headers: Key: auth, type: bearer token, value: JWT

* Update a training record
  * Method: PATCH
  * Endpoint: /progress/:progressId
  * Headers: Key: auth, type: bearer token, value: JWT
  * Request body: The training record key-value pair that should be updated.

* Delete a training record
  * Method: Delete
  * Endpoint: /progress/:progressId
  * Headers: Key: auth, type: bearer token, value: JWT

