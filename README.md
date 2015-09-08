Crowd Share – Web Client
Practical exam JavaScript Applications - 29 July 2014

You are given server logic in the form of a REST API in Node.js, which implements the Crowd Share. Your task is to develop a client-side application using HTML, CSS and JavaScript (+jQuery), that uses (consumes) these services, to allow users to share their posts, using their web browser.

The server is started through the app.js script from Node (you need first to install the dependencies) or by starting the commands start-server.txt file.

The server is available locally on your computer or online here: http://jsapps.bgcoder.com

Crowd Share Description

Visitors must register in order to post to the Crowd Share application.

The application has the following workflow:

Visitors enter the application
They can view all the posts, even if not logged-in
They can register or login a user
Visitors can view all posts, sorted
The visitor chooses how the posts to be sorted:
By date or by title (alphabetically)
Ascending or descending
The visitor can see the posts in pages. Each page contains N posts
N is provided by the visitor
Visitors can navigate through the pages (previous or next)
Visitors can register a user
Providing a username and a password
Visitors can login into the application
Providing a username and a password
They receive an unique session key that is used to authenticate to the application
Logged-in users can logout from the application
Providing their session key (received after the login)
Registered users can post into the Crowd Share
Providing a title, body and a session key (received after the login)
Task description

Using the REST API, implement the Crowd Share application, following the requirements:

Implementation Requirements

Use all the endpoints from the REST API. Full description can be found in Crowd-Share-Services.docx/Crowd-Share-Services.pdf file.

Method	Endpoint	Brief description
POST	/user	Registers an user. Needs a username and authentication code
POST	/auth	Logs-in an user. Needs a username and authentication code. Returns a session key
PUT	/user	Logs-out an user. Needs a session key
POST	/post	Creates a new post. Needs a session key
GET	/post	Fetch posts from server. Can filter posts either by User or by search pattern
