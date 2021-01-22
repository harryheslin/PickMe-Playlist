# PickMe Playlist - https://pickmeplaylist.me/

PickMe Playlist is a React & Express application that allows you to quickly make a playlist based on the artists you want to hear.
The user selects up to 20 artists they wish to hear and assigns a percentage to each. The total number of songs per percentage is 
calculated against the selected total. The outputed playlist can then be saved to the users Spotify account for 
future listening.

## Local Host Deployment 
1. Change directory to client folder 
   1. Run 'npm install' 
   1. Run 'npm run build'

1. Change directory to server folder
   1. Create a .env file in the server directory at the top level
   1. The file will have the following structure

        ###### SPOTIFYCLIENTID = ________________
        ###### SPOTIFYCLIENTSECRET = ________________
        ###### SPOTIFYREDIRECT = http://localhost:3010

   1. Run 'nodemon start'

Access the application on localhost:3010
        
#### **Important**
To run a Spotify Application must be registered to obtain a client id and client secret key


