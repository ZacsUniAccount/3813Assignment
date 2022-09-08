# 3813Assignment

## GIT LAYOUT
The git repository contains an ‘assignment’ folder, with the files of the project inside, as well as a ‘readme’ to let users know about the project and ‘commands.txt’ file to help remember the console commands to use. The branch is up to date on ‘main’. 

For version control, I would complete a small task the project required, check it worked correctly, and then commit with a description of what was added. I did not have the need to make branches as I was the only one working on this project.

## DATA STRUCTURES
The data structures I used in this program were ‘groups’, ‘channels’ and ‘users’. 
All these structures are objects. ‘users’ is the simplest and only contains a ‘name’, ‘email’ and ‘role’. The name is for logging in and displaying when logged in, email is not yet implemented, and ‘role’ determines what the user can view in the website, and what permissions they can control.
 
The ‘groups’ object contains a ‘title’ with the name of the group, it also contains ‘users’ to keep track of who is in the group, as well as an array of ‘channels’
‘channels’ contained a ‘title’ with the name of the channel, and an array of ‘users’ who belong in that channel
A tree of the data structures can be seen below

[Users:	Name, Email, Role]

[Groups: Title, [Users], [Channels]: {Title, [users]}

These structures have class files inside their corresponding angular services, and are stored as a JSON files on the server side in /server/data.



## RESTFUL API
The angular front end of the website communicates with the Node.JS server. These are the routes which they use.

### postLogin (post)
this route takes a string ‘username’ and returns a ‘user’ object & ‘valid’ object.
It is responsible for taking a username entered by the user, and checking against all ‘user’ objects to find a match. If a match is found it returns ‘valid: true’ and a corresponding user object.  which allows a user to enter the website If no match is found it returns ‘valid: false’. 
### newUser (post)
this route takes a ‘user’ object and returns a ‘valid’ and ‘msg’ object.
It is responsible for taking the given ‘user’ object, checking whether the username already exists, and if not, saving it into a JSON file with other users. 
### allUsers (get)
This route takes no values, and returns a ‘users’ object holding an array of strings.
It is responsible for looking through all users created and stored in the ‘users’ JSON file, and giving them back to the client as a string.

### deleteUser (post)
This route takes a string ‘user’ and returns a ‘msg’ object
It reads the ‘users’ JSON file into an object, searches the object for a match on the given ‘user’ string, deletes it, and then writes it back to the JSON file.
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
This route allows super admins and group admins to create new users who can log into the website. If the user is a super admin, they can also delete any users who have been created. There is a back button to navigate to the ‘/home’ route.
#### Chat
This route is the main part of the website. On the left there is a navigation menu to select groups and channels. Super Admins and Group Admins can see all groups and channels, however Users can only see groups and channels which they are part of. There is also an option to add new groups, and channels inside the selected group, which updates the navigation menu instantly. In the middle will be the chat part of the app, which is not yet implemented so a placeholder is there instead. On the right side of the screen there is an option to see members of the group and channel which the user is currently joined. There is also an input and button to add users to the current group/channel, and remove them, however only adding to the group is currently implemented. There is also a back button in the top right to allow users back to the ‘/home’ component.

## Services
My services store my data models as class files so I can ensure when I create and store my data, it is conforming to the correct data structure and types.
#### userlogin
this service is a class file which holds the username and in future the password of a user. It is used to ensure the input of a user logging in is valid.
#### Channel
this service is a class file for creating and storing channels. It has a ‘title’ of type string, and an array of ‘users’ of type string.
#### Group
This service contains a class file which is used to create and store groups. It contains a ‘title’ of type string, and array of ‘users’ of type string, and an array of ‘channel’ which uses the ChannelService type from above.
#### Userobj
This service contains a class file which is used to create and store users. It has a ‘username’, ‘role’, and ‘email’ all of type string.
