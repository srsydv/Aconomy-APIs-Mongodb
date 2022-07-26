// const {MongoClient} = require('mongodb');
// const url= 'mongodb://localhost:27017';
// const databaseName='Pandora'
// const client= new MongoClient(url);
// async function dbConnect() {
//     let result = await client.connect();
//     db= result.db(databaseName);
//     return db.collection('signup');
// }

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Pandora");

// module.exports = dbConnect;