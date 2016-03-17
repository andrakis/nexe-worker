This is a test project for Nexe:
	Building an app that can spawn additional processes from the same bundle

This will build app.js and worker.js into a single executable, and write
it to nexe/app. You can change to the nexe directory and run the app to
prove that it is not loading from local sources.


Instructions
============

1. Run `npm install` or update the file `build_nexe` to point to your nexe installation.
2. Run `./build_nexe`. This step can take a while.
3. Move to the `nexe` directory and run the app: `./app`
