
# Ece Chat application - final project

This is the source code supporting our application "Ece Chat". A messenger application where, after logging in with github, you can communicate with all your friends, by creating channels and invite them to join it so you would be able to communicate in the best conditions.
This README contains all information you have to know about our achievements and what could be improve.
Our source code already contains the dex server folders necessary for the Oauth2 connection and obviously back end and front end folders. 
Follow the commands below to start and use our application.

## Usage

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/mathieudad/WebSI.git
  cd WebSI
  ```

Install and start the application faster with our launcher

* Install back-end dependencies
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  cd ..
  ```

* Install front-end dependencies
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  yarn install
  cd ..
  ```

* Start the whole application with the launcher
  ```bash
  #Make dex Server and start front/back-end and dex Server
  ./launcher
  ```

Or you can follow all the instructions below

* Build the dex Server:   
  ```bash
  #Build Dex
  cd dex
  make
  make examples
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


## Author

|   Title  |   author |   school |   period |  
|---    |:-:    |:-:  |--:    |
|   Final Project - ECE Chat  |  - Mathieu Dadoun <mathieudadoun98@gmail.com> <br/>- Mathieu de Campou <mdecampou@gmail.com>   |  ECE |  Fall 2020  |

## Tasks

Project management

* Naming convention   
  *variable named : camel case convention, tried to be as meaningful as possible*
* Project structure   
  *3 main folders : front-end back-end dex-server*
* Code quality   
  *unbelievable quality*
* Design, UX
  *Simple designed application, design with material-ui component, theme with our palette color, Buttons, IconButtons,TextField, Dialog windows*
* Git and DevOps   
  *We used github project management feature and one branch per issue. As few as possible commit directly on master. Each one of us reviewed "pull request" of the other*

Application development

* First Connection
  *You have to choose a username (unique) and an avatar during the first connection. You will be able to modify it later.*
* Welcome screens
  *Welcome (before and after login) screens are simple to use and to understand witch some buttons to navigate inside our application you can go back to the "welcome after login" screen at any time by clicking on the button "Ece Chat" located in the header*
* New channel creation   
  *You are able to create a channel, choose his name, add participants*
* Channel modification and access   
  *You are able to rename the channel, delete it, add participants whenever you want IF you are the owner of the channel, otherwise you can only see who are the others participants, or leave the channel* 
* Resource access control
  *A user can only gain access to the channel he created or to the channels he was invited to.*  
* Invite users to channels   
  *Only the creator can invite users to channel: during the creation or the modification (button : •••)*
* Message modification   
  *You can modify all the messages you send by clicking on the button edit (pen icon)*
* Message removal   
  *You can remove all the messages you send, this one will be delete from the database, any members of the channel won't be able to see it anymore, lost forever... (trash icon)*
* Account settings   
  *You can manage your settings by clicking on the button from the welcome screen or by clicking on the gear icon (top right of the screen). Inside the settings app you have the choose: modify username, language, dark or light mode, avatar.*
* Gravatar integration   
  *You can choose your gravatar during first sign in, or you can add it when you are in the account setting inside the application, if you have no gravatar it will import the default gravatar*
* Avatar selection
  *We offer you a selection of six beautiful avatars, selected with taste, the most complicated will be to choose*
* Personal custom avatar   
  *If you want you want to upload a image from your computer you can, thanks to a drag and drop area. The maximum size is 30ko and ony images format are accepted. Only downside, we don't print an error if files are not accepted, if this is the case nothing append you have to choose an other image*

## Possible Improvement

We are totally aware of the importance of tests, we know that we are supposed to write them first. We had troubles to implements them add the beginning (authorization ...).    

## Bonus

*no bonus*
