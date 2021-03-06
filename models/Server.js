/**
 *  Requires
 *      express: For setting up a web server
 *      hbs: To serve dynamic views
 *      path: To join directories 
 */

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressFileUpload = require('express-fileupload');

const JEMCloudDB = require('../database/mongoDB.config');
class Server {

    jemcloudDb = new JEMCloudDB();

    constructor() {

        // Initialize our express app
        this.app = express();

        // Get the port that we will be using from the .env file
        this.port = process.env.PORT;

        // Set up the connection toour DB
        this.connect();

        // Execute all the middlewares that might caught and process the request
        this.middlewares();

        // Register all the routes of the project
        this.routes();        
    }

    async connect() {
        await this.jemcloudDb.JEMCloudConnection();
    }

    middlewares(){
        
        this.app.use( cors() );

        this.app.use( cookieParser(process.env.COOKIESECRET || '' ));

        this.app.use( express.urlencoded({
            extended: true
        }) );

        this.app.use( express.static(path.join(__dirname, '../public')) );

        this.app.use( express.json() );
        // Set up hbs as out templates engine
        this.app.set('view engine', 'hbs');

        this.app.use( expressFileUpload({
            useTempFiles: true,
            tempFileDir: '/temp/'
        }) );

        // Set up the partials/components that the project will use 
        hbs.registerPartials(path.join(__dirname, '../views/partials')); 
        
    }

    routes() {

        this.app.use(require('../routes/JEMCloud.routes'));
        this.app.use('/profile', require('../routes/JEMClouder.routes'));
        this.app.use('/auth', require('../routes/auth.routes'));
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