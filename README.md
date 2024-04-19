This is a rest-api i made for my site `https://trainingtracker.net/`. It is writen in Typescript/node and made mainly with Prisma, Express, Bcrypt, JWT.

To run this localy, you follow this steps below.
1. Clone or download this repo.
2. Create a `.env` and follow the example file.
3. Set up a `MySql` and dont forget to put your `DATABASE_URL` to your own in the `.env`.
4. Run `npm install` in terminal (root of the project).
5. Run `npx prisma generate`.
6. Start your `Mamp`.
7. Run `npm run dev` in the root of the project via your terminal.
8. Now you can use the api locally!

To run against the deployed api, do request to `https://testapi-production-f5d2.up.railway.app`

Routes you can use, see bellow

 * To see that api is working you can test this one.
`Get "/"`

 * Register a user `POST /register` with a body of {"first_name": "examplename", "last_name": "examplename", "email": "example@example.com", "password": "example123", "weight": 72, "height": 172}


 * Login a user and generate a JWT `POST /login` with the body of {"email": "example@example.com", "password": "example123"} in response you will get your JWT that you need to send in auth header in all the other requests.


 * Get a users profile `GET /profile` `auth: bearer token, token: your JWT`

 * Edit a users profile `PATCH /profile/edit`  `auth: bearer token, token: your JWT` and in the body the fields you want to update.


 * Delete a users profile `DELETE /profile/delete` `auth: bearer token, token: your JWT`

 * Create a progress `POST /progress` `auth: bearer token, token: your JWT` with the body of {"data": "YYYY-MM-DD", "exercise": "example", "weight": 1337, "reps": 1337}

 * Get all of a users progress `GET /progress` `auth: bearer token, token: your JWT`


 * Get a single progress of a user`GET /progress/:progressId` `auth: bearer token, token: your JWT`

 * Update a single progress of a user `PATCH /progress/:progressId` `auth: bearer token, token: your JWT` and in the body the fields you want to update.

 * Delete a single progress of a user `DELETE /progress/:progressId` `auth: bearer token, token: your JWT`
