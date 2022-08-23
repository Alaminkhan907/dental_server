const express = require('express')
const app = express()
const Object = require('mongodb').ObjectId;
const port =process.env.PORT || 8000;
const cors=require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q40wd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    console.log("connection err",err);
  const appointmentsCollection = client.db("DentalPortal").collection("appointments");
  // perform actions on the collection object
  console.log("database connection successful");

  app.post('/addAppointment',(req, res) => {
    const appointments= req.body;
    console.log(appointments);
    appointmentsCollection.insertOne(appointments)
    .then(result => {
        res.send(result.insertedCount>0)
    })
  });
  app.post('/appointmentsByDate',(req, res) => {
    const date= req.body;
    console.log(date.date);
    appointmentsCollection.find({date: date.date})
    .toArray((err , documents)=>{
        res.send(documents);
    })
  })
})

app.listen(process.env.PORT||port);