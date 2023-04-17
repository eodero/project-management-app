# Project-Management-App API
This a RESTful API for a project management app built using Node.js, Express, and MongoDB. This app allows you manage your projects, tasks within the projects and your team or app users. The app has the following in-build features:

- User registration and authentication
- Project creation, reading, update and deletion.
- Assigning projects to users

API Endpoints
User
 - POST /api/users - register new user
 
 Project
 - GET api/projects - list all projects for authenticated user
 - GET api/projects/:id - get a project by id
 - POST api/projects - create a new project
 - PUT api/projects/:id - update a project
 - DELETE api/projects/:id - delete a project
 
 Packages in use:
1. Node.js
2. Express
3. MongoDB
4. Mongoose
5. bcryptjs
6. jsonwebtoken
7. helmet
8. CORS
9. express-rate-limit
10. express validator
 