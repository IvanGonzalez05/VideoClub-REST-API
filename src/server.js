const dotenv = require('dotenv');
const mongoose = require('mongoose');

// handling uncaughtException. Its good to have it
// on top of the file, so it can catch any exception,
// that can be produced later
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    process.exit(1);
});

// telling node to use the .env file
dotenv.config({ path: '.env' });

// getting connection string
const connectionString = process.env.MONGODB.replace(
    '<password>',
    process.env.MONGODB_PASSWORD
);

// connecting to mongo database
mongoose
    .connect(connectionString, {
        // not needed on v6 of mongoose
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true,
    })
    .then((conn) => console.log('Database connection successfull'));

const app = require('./app');

const port = process.env.API_PORT || 3000;
const server = app.listen(port, 'localhost', () => {
    console.log(`Listening at port: ${port}`);
});

// managing unhandled rejections (when a promise rejection is not catched)
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => process.exit(1));
});
