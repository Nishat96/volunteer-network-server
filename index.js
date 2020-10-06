const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

console.log(process.env.DB_USER)

var MongoClient = require('mongodb').MongoClient;

var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.9xmg6.mongodb.net:27017,cluster0-shard-00-01.9xmg6.mongodb.net:27017,cluster0-shard-00-02.9xmg6.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-pg0dei-shard-0&authSource=admin&retryWrites=true&w=majority`;
MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
  const collection = client.db("volunteerNetwork").collection("volunteerWork");

  app.post('/addWork', (req, res) => {
    const work = req.body;
    collection.insertOne(work)
    .then(result => {
      console.log(result)
    })
  })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port);