const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
require('dotenv').config()
const port = process.env.PORT || 5000;


//Middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vzimcou.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toysCollection = client.db('toyCollection').collection('toysData')

    app.get('/', (req, res)=>{
        res.send('ToysHub server is running ')
    } )

    app.post('/uploadToys', async (req, res)=>{
      const data = req.body;
      console.log(data);
      const result = await toysCollection.insertOne(data)
      res.send(result)
  })

  app.get('/allToys', async(req, res)=>{
    const result = await toysCollection.find().toArray()
    console.log(result);
    res.send(result)
  })

  app.get("/allToys/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const result = await toysCollection.find(query).toArray()
    console.log(result);
    res.send(result);
  });


  
  app.get("/categoryToys/:text", async(req, res )=>{
    const result = await toysCollection.find({category: req.params.text}).toArray()
    console.log(result);
    res.send(result)
  })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, ()=>{
    console.log(`ToysHub server is running on port ${port}`);
})