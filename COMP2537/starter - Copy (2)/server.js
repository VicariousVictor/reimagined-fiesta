const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const { DB_URL } = require("./credentials");

// ========================

// Link to Database
// ========================


// Replace DB_URL with your actual connection string in credentials.js
const connectionString = DB_URL

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('cst-quotes')
    const quotesCollection = db.collection('quotes')

    // ========================
    // Middlewares
    // ========================
    app.set('view engine', 'ejs')
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(express.static('public'))


    // ========================
    // Routes
    // ========================
  
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(quotes => {
          res.render('pages/index.ejs', { quotes: quotes })
        })
        .catch(error => console.error(error))
    })

    // app.get('/myForm', (req, res) => {
    //   db.collection('quotes').find().toArray()
    //     .then(quotes => {
    //       res.render('pages/myForm', { quotes: quotes })
    //     })
    //     .catch(error => console.error(error))
    // })
    app.get("/myForm", (req, res) => res.render("pages/myForm"));
    app.post('/myForm', (req, res) => {
      if(!Array.isArray(req.body.toDoList)) {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error));
        // console.log(req.body.toDoList);
      } else {
        let arrayQuotes = [];
        for (let i = 0; i < req.body.toDoList.length; i++){
          arrayQuotes.push({
            toDoList: req.body.toDoList[i]
          }) 
        };
        // console.log(req.body);
        // console.log(arrayQuotes);
        quotesCollection.insertMany(arrayQuotes)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error));
      }
    });

    app.put('/', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { toDoList: req.body.toNotDoList },
        {
          $set: {
            toDoList: req.body.toDoList,
          }
        },
        {
          upsert: true,
          collation: {
            locale:"en",
            strength: 1
          }
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    app.delete('/', (req, res) => {
      quotesCollection.deleteOne(
        { toDoList: req.body.toDoList }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted CIT Student\'s quote')
        })
        .catch(error => console.error(error))
    })

    // ========================
    // Listen
    // ========================
    const port = 3000
    app.listen(port, function () {
      console.log(`listening on ${port}`)
    })
  })
  .catch(console.error)
