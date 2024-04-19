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
router.get("/", (req, res) => {
	res.send({
		message: "It's alive!🦖",
	});
});

 * Register a user /register
router.post("/register", createUserRules, registerUser);

 * Login a user and generate a JWT
router.post("/login", loginUser);

 * Get a users profile /profile
router.get("/profile", jwtAuthMiddleware, getProfile);

 * Edit a users profile /profile/edit
router.patch('/profile/edit', jwtAuthMiddleware, updateUserRules ,editProfileHandler);

 * Delete a users profile /profile/delete
router.delete("/profile", jwtAuthMiddleware, deleteProfileHandler);

 * Create a progress /progress
router.post("/progress", jwtAuthMiddleware, createProgressRules, createProgressHandler);

 * Get all of a users progress /progress
router.get("/progress", jwtAuthMiddleware, getUserProgressHandler);

 * Get a single progress of a user /progress/:progressId
router.get("/progress/:progressId", jwtAuthMiddleware, getOneProgressHandler);

 * Update a single progress of a user /progress/:progressId
router.patch("/progress/:progressId", jwtAuthMiddleware, updateProgressRules, updateProgressHandler);

 * Delete a single progress of a user /progress/:progressId
router.delete("/progress/:progressId", jwtAuthMiddleware, deleteProgressHandler);
