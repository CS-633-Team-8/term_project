This subdirectory contains the code for the front end robot interface.

[![Netlify Status](https://api.netlify.com/api/v1/badges/99392d75-9fee-4847-8199-6fa051fc4249/deploy-status)](https://app.netlify.com/sites/askharold/deploys)

# Overview

This is the front end for the CS-633 team 8 project. The master branch is protected for Continuous Deployment to Netlify.
The site itself uses the React framework with Pusher for realtime chat.

# To Develop

Either clone and create feature or bug brach to contribute.

# To run on local machine
Please make sure you have [node](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/en/docs/install) installed in your system.

Please run the following commands to clone the project, install dependencies and start the application.

```bash
git clone https://github.com/CS-633-Team-8/term_project.git  # clone the project
cd /robot # change to Robot sub-folder
yarn install  # install dependencies
yarn start  # start the project
```

Alternatively if you would like to work online, sign up for GitPod and use: 

https://gitpod.io/#https://github.com/CS-633-Team-8/term_project.git

## Tests

Unit tests are run from local folders

`cd /robot`
`yarn test`



