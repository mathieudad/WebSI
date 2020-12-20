
# Ece Chat application - final project

*presentation, introduction, ...*

This is the source code supporting our application "Ece Chat". A messenger application where, after logging in with github, you can communicate with all your friends, by creating channels and invite them to join it so you would be able to communicate in the best conditions.
It contains all information you have to know about our achievements and what could be improve.
Our source code already contains the dex server folder, necessary for the Oauth2 connection and obviously back end and front end folders. 
Follow the commands below to start and use our application.

## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/mathieudad/WebSI.git
  cd WebSI
  ```
* Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). For example, on Ubuntu, from your project root directory:   
  ```
  # Install Go
  apt install golang-go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make
  make examples
  ```
  Note, the provided `.gitignore` file ignore the `dex` folder.
* Register your GitHub application, get the clientID and clientSecret from GitHub and report them to your Dex configuration. Modify the provided `./dex-config/config.yml` configuration to look like:
  ```yaml
  - type: github
    id: github
    name: GitHub
    config:
      clientID: xxxx98f1c26493dbxxxx
      clientSecret: xxxxxxxxx80e139441b637796b128d8xxxxxxxxx
      redirectURI: http://127.0.0.1:5556/dex/callback
  ```
* Inside `./dex-config/config.yml`, the frond-end application is already registered and CORS is activated. Now that Dex is built and configured, your can start the Dex server:
  ```yaml
  cd dex
  bin/dex serve ../dex-config/config.yaml
  ```
* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Optional, fill the database with initial data
  bin/init
  # Start the back-end
  bin/start
  ```
* Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Start the front-end
  yarn start
  ```

* Start the hole application with the launcher
  ```bash
  #Install all dependencies and start front/back-end dex Server
  ./launcher
  ```

## Author

---
title: Final Project - ECE Chat
authors:
- Mathieu Dadoun <mdecampou@gmail.com>
- Mathieu de Campou <mathieudadoun98@gmiail.com>
school: ECE
period: Fall 2020
---

## Tasks

Project management

* Naming convention   
  *variable named uppercase convention, tried to be as meaningful as possible*
* Project structure   
  *3 main folders : front-end back-end dex-server*
* Code quality   
  *unbelievable quality*
* Design, UX   
  *Simple application, design with matterial-ui component, theme with our palette color, Buttons, IconButtons,TextField, Dialog windows*
* Git and DevOps   
  *using one branch/issue, as few as possible commit directly on master, using To Do function on github to manage all issues, each one was regarding pull request of the other*

Application development

* Welcome screens   
  *Welcome (before and after login) screens are simple to use and to understand witch some buttons to navigate inside our application you can go back to the welcome after login screen at any time by clicking on the button "Ece Chat" located in the header*
* New channel creation   
  *You are able to create a channel, choose his name, add participants*
* Channel membership and access   
  *Wou are able to rename the channel, delete it, add participants whenever you want IF you are the owner of the channel, otherwise you can only see who are the others participants, or leave the channel* 
* Resource access control
  *As we said only owner of a channel can modify or delete it*  
* Invite users to channels   
  *When you create it, when you are the owner and you modify it*
* Message modification   
  *You can modify all the messages you send by clicking on the button edit (pen icon)*
* Message removal   
  *You can remove all the messages you send, this one will be delete from the database, any members of the channel won't be able to see it anymore, lost forever...*
* Account settings   
  *we can manage your settings by clicking on the button from the welcome screen or by clicking on the gear icon (top right of the screen)*
* Gravatar integration   
  *You can choose your gravatar during sign in, or you can add it when you are in the account setting inside the application, if you have no gravatar it will import the default gravatar*
* Avatar selection
  *We offer you a selection of six beautiful avatars, selected with taste, the most complicated will be to choose*
* Personal custom avatar   
  *If you want you want to upload a image from your computer you can, thanks to a drag and drop area. The maximum size is 30ko and ony images format are accepted, only downside we don't print an error if files are not accepted, if this is the case nothing append you have to choose an other image*

## Bonus

*place your comments*
