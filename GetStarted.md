# Get Started

## Prerequisites

You need to install the following if they are not already on your system.
* node. we have tested it with version 12.16.3
* @angular/cli   This current app was written with Angular 6 (in 2018). It needs an upgrade.
* mongodb. we have tested it with 4.0.0
* forever

Please Google, or use another internet search engine, for instructions on how to install these on your system.

The bash scripts will run on mac and linux. For Windows, take a look at the .sh files, and create equivalent .bat files. 


## Download the code

1. Fork this repository. 

2. clone the new repository (with your username) onto your system:

    git clone ....

3.
The Angular front end is version 6. It written originally in 2018. As of Nov 2020, the dependencies in package.json are getting errors during npm install. So we need to upgrade this app to the latest version of Angular. 

In the meantime, as a workaround, you can download our old copy of node_modules from https://drive.google.com/file/d/1cQ4BIIYplz9dyKLZsi6ic8_-IETfmU52/view?usp=sharing

It's a compressed tar file. The file name is node_modules_dspsforms_intake.tgz. To uncompress:

tar xzf node_modules_dspsforms_intake.tgz 

will result in the node_modules/ directory. Move node_modules to this folder.

Alternstely, you can play with package.json. If you get it to work, we can use your updated package.json!

4. Set the environment variables:

Go to ./src/environments, and do the following:

Copy environment.ts.template -> environment.ts
Copy environment.prod.ts.template -> environment.prod.ts

Then, open the files environment.prod.ts and environment.ts in your favorite text editor (such as Visual Studio Code). Do not use Word or similar programs because they may insert invisible characters. Supply the values that you see in those files. 

Next, go to backend/ and copy env.template -> .env  (notice the period). Open .env in a text editor, and supply the values for your system. 


5. In a terminal, from this folder, execute
    ./buildProd.sh

This will build the Angular app and put the transpiled files in backend/angular/ 

6. In a terminal, copy startProdServer.sh.template to startProdServer.sh. If you wish, you can change the names of the log files in startProdServer.sh

Then execute:
    ./startProdServer.sh

This will start your server. 

6a. First time you run the server, you need to create an admin user for your system. 

Open backend/.env and set FIRST_TIME=1

Next, copy backend/misc/once.js to backend/misc/once.tmp.js

Open the file once.tmp.js in a text editor. Add an admin user, and  password. 

Run ./startProdServer.sh


You should see a message that a user was created. Stop the server with a control-C.

Delete the file once.tmp.js that you just created.

In .env, set FIRST_TIME=0

Restart the server:  ./startProdServer.sh

7.
Point your browser to yourServer:3000  or whatever port you have set in .env

Login as the admin user you created in Step 6a. 

Then create other staff users. 

Your students do NOT need to login to submit forms. 

8. If you run into issues, please contact us. We are here to help.
