/**
 *  Requires
 *      express: For setting up a web server
 *      hbs: To serve dynamic views
 *      path: To join directories 
 */

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const { request, response } = require('express');

class Server {

    constructor() {

        // Initialize our express app
        this.app = express();

        // Get the port that we will be using from the .env file
        this.port = process.env.PORT;

        // Execute all the middlewares that might caught and process the request
        this.middlewares();

        // Register all the routes of the project
        this.routes();        
    }

    middlewares(){

        // Set up hbs as out templates engine
        this.app.set('view engine', 'hbs');

        // Set up the partials/components that the project will use 
        hbs.registerPartials(path.join(__dirname, '../views/partials'));        
    }

    routes() {

        this.app.use(require('../routes/client.routes'));
        this.app.use('/profile', require('../routes/user.routes'));
        this.app.use(require('../routes/errors.routes'));
    }

    listen() {

        // Get the server ready to process the requests
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${ this.port }`);
        });
    }

}

// Export the class so we can execute the server at any point we need it
module.exports = Server;