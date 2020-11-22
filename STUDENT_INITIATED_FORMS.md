# Dsps Forms
This web app provides an online workflow for forms that students need to submit to DSPS.

**Features**

* This is a so-called Single Page Application. What that means is the entire app
is loaded once, and after that, only data moves between the browser and the server.

* Students can submit forms without logging in. Behind the scenes, there is Google's ReCaptcha V3 protecting the site from robot submissions.

* The submitted data is visible to Admin and Staff users. 

* Admin users can create new admin and staff users.

* There is support for Accessibility.

* There is support for error handling. However, if you see error messages that are unclear, please contact us.

**Technologies**

At the top level, we are using the following technologies.

* Angular 6 (front end single page app)
* Node + Express
* Mongo + Mongoose
* Bootstrap and Angular Material
* Aria (accessibility)
* ReCaptcha V3
* Apache httpd
* Support for IE (attempted, need to test)
* forever for running Node in production

At a more granular level:

Client side.

* RxJs Observables
* Angular Material Dialog (modal) for error messages and showing terms of agreement when submitting a form
* HttpInterceptor for error handling as well as transmitting headers (JSON web token)
* Guards for authentication and also for updating recaptha v3 scores
* JSON web token for authenticated users
* Breadcrumbs
* Pagination
* A simple class hierarcy for handling common stuff for submitting forms

Server side.

* A small framework around Node/Express to handle routes, controllers, middleware
* JSON web token for authenticated users


Some server side external modules:

 * bodyparser
 * bcrypt
 * jsonwebtoken
 * mongo-sanitize
 * request and request-promise for recaptcha V3 server side
 * dotenv for loading node environment variables
 
 
 
 




