# Harold the Chat Bot - CS633 Team 8 Project


[![Netlify Status](https://api.netlify.com/api/v1/badges/99392d75-9fee-4847-8199-6fa051fc4249/deploy-status)](https://app.netlify.com/sites/askharold/deploys)  

Team 8 term project for CS633, a friendly elephant who knows everything about anything.

The project is split into the front end UI /robot, and the api chat server /server. The system is continuously deployed from the master branch, the UI to Netlify and the API to Heroku.

# To run on local machine

Please make sure you have [node](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/en/docs/install) installed in your system.

Begin by cloning the repository into a local folder of your choice:

`git clone https://github.com/CS-633-Team-8/term_project.git`  
`cd /term_project` # change to project folder

## Start the Server

`cd /server` # change to server folder  
`node server.js` # start server

The api calls will automatically be made to localhost when in development mode.

## Robot UI

The UI runs locally with `react-scripts`

`cd /robot` # change to Robot sub-folder  
`yarn install` # install dependencies  
`yarn start` # start the project`  

## Tests

Unit tests are run from local folders

`cd /robot`  
`yarn test`

# Branch Policy

To work on feature or bug name your branch with a relevant title.

All pull requests should use the template found in the root of the project.

All commits to master are through pull request only for help see https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests
