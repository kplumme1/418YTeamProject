Old README:


### Install dependencies:
It should only be necessary to install node and nodemon for new server. Otherwise the necessary files should all be in the repo.
 - install node v. 10.22.1
 - create forum folder for react app at proj/forum/  
   - npx create-react-app forum
 - install stuff for backend in proj/forum/backend/  
   - npm install express cors mongoose dotenv
 - install nodemon (globally?) proj/forum/backend/  
   - npm install -g nodemon



### Directories:
/forum/backend/ - server directory  
/forum/backend/models/ - database schema  
/forum/backend/routes/ - express routing  
  
/forum/src/ - frontend directory  
/forum/src/components/ - react components
  
### Server Control:
#### start server: (run in server directory)
nodemon server

#### stop server:
	get server process ID:
	lsof -i tcp:5000
	
	then shut down with kill command:
	kill <PID>
	
(This may have left some sort of zombie process clogging port 5000, will need to test. Just reboot server with reboot command)

### Backend Notes:
to add a new database route:
add file to /backend/routes/
add file to /backend/models/
add into "load routes" section of /server.js

### Misc:
Ubuntu version:  
Distributor ID: Ubuntu  
Description:    Ubuntu 18.04.5 LTS  
Release:        18.04  
Codename:       bionic  


MERN guide:  
https://www.geeksforgeeks.org/mern-stack/


New dependencies:
Software I installed as part of the tutorial

bootstrap
npm install bootstrap

react router dom?
npm install react-router-dom

react date picker
npm install react-datepicker

axios
npm install acios

