# TimeValidator

### Purpose
The main purpose of the time validator repository is to validate if the time slot chosen by client is within the correct range. In other words, it should be between opening and closing hours. We also check if the time chosen by user is not in the lunch or fika break. So when the time is valid the data will be send to the next component to be filter.

### Technologies used
*  MQTT with HiveMQ broker
*  Node.js

### Dependencies
1. Node.js & Npm (https://nodejs.org/en/download/)
2. Git (https://git-scm.com/downloads)

### Setup
1. Move the file Global_Keys in the Documentations folder to the parent directory
2. Move the registry file from the documentation to the parent
3. To set up the TimeValidator repository we use "npm i mqtt" command



### Running
   To run this node we use "node index" command
