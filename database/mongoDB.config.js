const mongoose = require('mongoose')

class JEMCloudDB {

    constructor() {
        this.JEMCloudUrl = process.env.MONGODBCNN;
    }

    async JEMCloudConnection() {

        try {
            
            await mongoose.connect(this.JEMCloudUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: true
            });

            console.log('Connected to JEMCloud Database');
        } catch (err) {
            
            console.log(err);
            throw new Error('Error connecting to JEMCloud database');
        }
    }
}

module.exports = JEMCloudDB;