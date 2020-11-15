This is the root directory of the frontend server. 

Note: node_modules is no longer tracked in github. node_modules should be updated per-environment, as the dependencies will coincide with your OS. That means in order to load/update necessary dependencies in node_modules you just have to do a "npm install" here in this directory. npm will track the needed files in package.json. AVOID MANUALLY EDITING DEPENDENCIES IN PACKAGE.JSON.

Start server with:
npm start
