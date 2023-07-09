# locationgrabber
A live location data gather app module to generate dataset using MERN stack

# To run the project 
Do the following to run the project:

Open Node Api file & run the server on local host using command: node server.js

Open Stickersmasher file & run the react native expo cli using command : npm run start

Your MongoDb cluster should be in active state.


# Important Note

Change the endpoint path url according to your own ipv4 address as it may introduce axios network error if u you don't ( Both local host and the emulator/device should be running on the same network)

Edit the connection string for your own mongodb atlas in node api file for successfull db connection.

if any dependencies are deprecated use command to update if needed: npm install -g 

Can be run on physical device as well as emulator( physical device prefrred for live location compatiblity)
