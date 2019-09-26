# Weather Service Api

## Getting Started
Follow the steps to get started.

### Install Dependencies
* Run `npm install`

### Run Server Locally for Development
* Run `npm run start:dev`

>This command will run the server locally just like `npm start`, except with a sprinkle of sunshine, as this will start it with [nodemon](https://nodemon.io/).  In a nutshell, when executed this command will watch your `./src` dir, and automagically transpile with babel and start the node process over again.  Thus saving  you the annoyance of doing it manually

### Testing
I have only implemented unit tests for what I changed, and tested a little bit, of the code that was already there, but I felt that this wasnt an exercise on whether I could add tests to existing code I left it 'as is'. 
#### Unit Tests
* Run `npm run test:unit`

>This will run the unit tests in watch mode. Meaning when a file changes it will re run the tests

#### Coverage
As stated above I did not feel it was necessery to write tests for existing code, so testing coverage is only for the files that I made major changes to.  

* Run `npm run test:coverage`

>This command will execute the code coverage reporting which you can see in two arenas.  First, the terminal will display statistics for covered files.  Finally, you can open the `index.html` file in a chrome window found `coverage/lcov-report/index.html` in this project to get a drill down in what you are missing in each file.

#### Integration
This was provided by the project, so I assume you know what to do...just in case.

* Run `npm test`

### Code Quality
For code quality, at least for javascript hinting, you can use the following command
* Run `npm run lint`

> This will scan all files in `./src` and either warn or error out given a problem within your code.  Very helpful and your welcome :)



