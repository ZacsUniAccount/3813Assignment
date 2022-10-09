# 3813Assignment
https://github.com/ZacsUniAccount/3813Assignment

## GIT LAYOUT
The git repository contains an ‘assignment’ folder, with the files of the project inside, as well as a ‘readme’ to let users know about the project and ‘commands.txt’ file to help remember the console commands to use. The branch is up to date on ‘main’. 

For version control, I would complete a small task the project required, check it worked correctly, and then commit and push with a description of what was added. I did not have the need to make branches as I was the only one working on this project.

## DATA STRUCTURES
The data structures I used in this program were ‘groups’, ‘channels’ and ‘users’. 
All these structures are objects.

‘users’ is the simplest and only contains a ‘name’, 'password’ and ‘role’. The name is for logging in and displaying when logged in, the password is used to authenticate the user, and ‘role’ determines what the user can view in the website, and what permissions they can control. The 'user' structure is the only structure contained in mongodb. The others are stored in a JSON file locally
 
The ‘groups’ object contains a ‘title’ with the name of the group, it also contains ‘users’ to keep track of who is in the group, as well as an array of ‘channels’
‘channels’ contained a ‘title’ with the name of the channel, and an array of ‘users’ who belong in that channel
A tree of the data structures can be seen below

[Users:	Name, Password, Role]

[Groups: Title, [Users], [Channels]: {Title, [users]}

These structures have class files inside their corresponding angular services, and are stored as a JSON files on the server side in /server/data.



## RESTFUL API
The angular front end of the website communicates with the Node.JS server. These are the routes which they use.

### login (post)
this route takes a string ‘username’ and string 'password' then returns a 'info’ object and 'error' object.

It is responsible for taking a username and password entered by the user, and checking against in mongodb users collection if there is a match for the username. If a match is found it checks whether the password given matches that users password. If it does it returns a corresponding user object which allows a user to enter the website. If no match is found it returns an error message to be displayed. 
### add (post)
this route takes a ‘user’ object and returns a ‘valid’ and ‘msg’ object.

It is responsible for taking the given ‘user’ object, checking whether the username already exists, and if not, saving it into a mongo database collection named 'users'. 
### find (get)
This route takes no values, and returns a ‘users’ object holding an array of strings.

It is responsible for searching the mongodb users collection for all entries, and saving the username of each one into an array to give back to the client.

### delete (post)
This route takes a string ‘user’ and returns a ‘msg’ object

It opens the mongodb users collection, and deletes the user with a matching username it has been given.
### allGroups (get)
This route takes no value, and returns a ‘gArray’ object with a type of ‘group’

It reads the ‘groups’ JSON file, converts it to an object, and sends it back to the client.

### addGroup (post)
This route takes an object which contains a ‘title’ string, and two empty arrays; ‘channel’ and ‘users’. It returns a ‘msg’ string

It reads the ‘groups’ JSON file, and converts it into an object. It then searches for a group with the same title which it was passed. If it finds a match, it returns the ‘msg’ string with an error message. If no match was found, it adds the empty group with the given title into the object and returns the ‘msg’ string with a confirmation message

### addChannel (post)
this route takes an object which contains a ‘group’ string, and a ‘channel’ object containing a ‘title’ string, and an empty array of ‘users’. -> [ “group”: string, “channel”: {“title”: string, “users”: [] } ] It returns a ‘msg’ string

It converts the ‘groups’ file into an object, and finds a group with the matching ‘group’ string given. If it cannot find one it returns the ‘msg’ string containing an error message. If it finds a match, it checks whether there is a channel inside the group with a title matching the ‘title’ string contained in the channel object. If there is, the ‘msg’ string is returned with an error message. If it does not already exists, it pushes the ‘channel’ object into the group, and writes the object back into the JSON file.
### addGroupUser (post)
This route takes a ‘senduser’ object containing a ‘newUser’ string and ‘selectedGroup’ string. It returns a ‘msg’ string.

The route first converts the ‘users’ JSON file into an object, and checks that the given ‘newuser’ exists. If it does not exist, the ‘msg’ is returned to the client with an error message. If the user does exist, it converts the ‘groups’ JSON file into an object and checks whether the group with a title matching the ‘selectedGroup’ does not already contain that user. If it does, ‘msg’ is returned containing an error message. If the user does not exist in the group, it is pushed into the object, and written back to the JSON file. ‘msg’ is then returned with a confirmation message.


## ANGULAR ARCHITECTURE
### Components
#### Login
The login component is the home route ‘/’ and ‘/login’ route of the app. It has an input field for a user to enter their username and a button to submit it. If the username is valid, it navigates to the ‘/home’ route
#### Home 
The home component displays the users role and username to them. There is a button to navigate to the ‘/chat’ route, and if the user is a super admin or group admin, there is another button which navigates to the ‘/newuser’ route. A logout button is also present to clear the session storage and navigate the user back to the login page.
#### newUser
This page allows new users to be added to the website. It adds users to a mongodb with a password and role which can then be used to login
#### Chat
This route is the main part of the website. On the left there is a navigation menu to select groups and channels. Super Admins and Group Admins can see all groups and channels, however Users can only see groups and channels which they are part of. There is also an option to add new groups, and channels inside the selected group, which updates the navigation menu instantly. In the middle will be the chat part of the app, which is not yet implemented so a placeholder is there instead. On the right side of the screen there is an option to see members of the group and channel which the user is currently joined. There is also an input and button to add users to the current group/channel, and remove them, however only adding to the group is currently implemented. There is also a back button in the top right to allow users back to the ‘/home’ component.

This component uses sockets to send and recieve messages into the chat. However the seperate channels and groups are not working and there is only one big chat room regardless of the channel you are in

## Services
My services store my data models as class files so I can ensure when I create and store my data, it is conforming to the correct data structure and types.
#### userlogin
this service is a class file which holds the username and the password of a user.

 It is used to ensure the input of a user logging in is valid.
#### Channel
this service is a class file for creating and storing channels. 

It has a ‘title’ of type string, and an array of ‘users’ of type string.
#### Group
This service contains a class file which is used to create and store groups. 

It contains a ‘title’ of type string, and array of ‘users’ of type string, and an array of ‘channel’ which uses the ChannelService type from above.
#### Userobj
This service contains a class file which is used to create and store users. It has a ‘username’, ‘role’, and 'password’ all of type string.

#### Userdata
This service is a middle point between the angular app and node server. It includes functions which connect to the nodejs endpoint and ensure the correct data is passed through it.

this is where the 'login', 'add', 'find', and 'delete' restful functions are found

#### Socket
This service is the middle point between the angular client and node socket server, It sends and retrieves messages from the socket server and sends them back to the client. 
