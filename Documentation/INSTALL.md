# Installation:

## Databaase:
Create a free account with mongo DB atlas:
https://www.mongodb.com/cloud/
The following variables must be filled out in the .env file located at `/forum/backend/.env`. 
Use the existing parameters in order to connect to the existing 4UM  production database.

```
ATLAS_USER=dbuser 
ATLAS_PASS=418Ydbuser
ATLAS_CLUSTER=cluster0.aqznf.gcp.mongodb.net
ATLAS_DB=4um-prod
ATLAS_SETTINGS=retryWrites=true&w=majority
```

## Backend:
The backend server root is `/forum/backend/` and the server runs on port 5000 by default.

In order to access the backend API add a link to the location of the backend server to the file in `/forum/src/backendLink.js`
set variable backendURL to the address and port of the backend server, or use the existing 4UM Prod server: `http://kplumme1-ec2.ddns.net:5000`

perform `npm install` in the backend server root directory `/forum/backend/` to install dependencies.




## Frontend:
The frontend server root is `/forum/` and the frontend server runs on port 3000 by default.

perform `npm install` in the frontend server root directory `/forum/` to install dependencies.
perform `npm start` to start the development server.






