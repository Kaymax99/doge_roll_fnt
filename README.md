# VTT RPG Platform Doge Roll
Doge roll begins as a Virtual Table Top map maker for Dungeon Masters that want to make 2d maps online. Wether that's for online usage or IRL usage with a large screen.<br>
It also packs features that allow handling of several Character Sheets for 5e DnD, along side pseudo-random number generation for dice rolls.
It is fully responsive (down to 300px width) and fairly easy to use.

## Required backend RestAPI
The app requires the usage of a backend RestAPI written with Java SpringBoot that can be found <a href="https://github.com/Kaymax99/doge_roll_bk">here</a>.

## The app stack

<ul>
  <li>React</li>
  <li>Redux Persist</li>
  <li>Typescript</li>
  <li>Fabric JS</li>
  <li>Bootstrap & Bootstrap Icons</li>
</ul>

## Available Commands
The following commands can be run by terminal once the repo was cloned:

### <code>npm i</code> OR <code>npm install</code>
Both do the same thing, they install all dependencies that are not downloaded when cloning the repository.

### <code>npm run dev</code>
Starts the application on web server. By default it will host on <a href="localhost:5173">https://localhost:5173</a><br>
Any code modification is shown and refreshed live, however sometimes it may be required to manually refresh to trigger proper components life cycle.

### <code>npm run build</code>
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Closing notes
Overall it has been a great experience and I've learned a lot from this. Fabric JS is a great library that has lots of functions that really help when using HTML Canvas.<br>
However there are also many features that are missing, such as objects IDs for canvas elements. I had to make some custom types based on Fabric's default ones to make sure I could locate and address the canvas objects to allow persitance.

Other than that, it's always great working with React + Redux, and it has been a nice challenge to combine all of this with Typescript.
