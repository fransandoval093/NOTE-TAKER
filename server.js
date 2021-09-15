const express = require('express');
const path = require('path');
const fs = require('fs')
const generateUniqueId = require('generate-unique-id');

const app = express();
const PORT = process.env.PORT || 7070;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.get('/notes', (req,res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('/', (req,res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/api/notes', (req,res)=> res.sendFile(path.join(__dirname, '/db/db.json')));
app.post('/api/notes',(req,res)=> {
    console.log("You are in the post request")
    const note = req.body;
    let id = generateUniqueId({
        length:5,
        useLetters: false
      });
      note.id = id
      console.log(note)
      console.log(id);
      JSON.stringify(note)
    fs.readFile('./db/db.json', 'utf-8',function (err, data){
        if(err) throw err
        console.log(data)

        var arrayofObjects = JSON.parse(data)
        arrayofObjects.push(note)

        fs.writeFile('./db/db.json',JSON.stringify(arrayofObjects),function(err) {
            if(err) {console.log(err);
        }});
    })

    res.json(note)

})

app.delete('/api/notes/:id', (req,res)=> {
    const chosenId = req.params.id;
    fs.readFile('./Develop/db/db.json','utf-8', function(err,data){
        if(err) throw err
        var arrayofObjects = JSON.parse(data)
        for(i=0;i<arrayofObjects.length;i++){
            if(arrayofObjects[i].id == chosenId) {
                
                arrayofObjects.splice(i,1)
                fs.writeFile('./Develop/db/db.json',JSON.stringify(arrayofObjects),function(err) {
                    if(err) {console.log(err);
                    
                }});
            }
        }
        

    })
});


// LISTENER | The below code effectively "starts" our server
app.listen(PORT, () => {
  console.log(`App listening on PORT: http://localhost:${PORT}`);
});

// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // DEPENDENCIES | Series of packages that we will use to give our server useful functionality
// const express = require('express');
// const path = require('path'); // Include the path package to get the correct file path for our htmlRoutes

// // EXPRESS CONFIGURATION | This sets up the basic properties for our express server
// const app = express(); // Tells node that we are creating an "express" server
// const PORT = process.env.PORT || 7070; // Sets an initial port. We'll use this later in our listener

// // Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // ROUTER | These routes files give servers a "map" of how to respond when visits or request data from various URLs.

// // LOAD DATA | We are linking our routes to a series of "data" sources.
// // These data sources hold arrays of information on table-data, waitinglist, etc.
// // const tableData = require('../data/tableData');
// tableArray = {
//   customerName: 'Ahmed',
//   customerEmail: 'ahmed@example.com',
//   customerID: 'afhaque89',
//   phoneNumber: '000-000-0000',
// };

// // ROUTING
// // API GET Requests | Below code handles when users "visits" a page via link.
// // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
// app.get('/tables', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/tables.html'));
// });

// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/notes.html'));
// });

// // If no matching route is found default to home
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/index.html'));
// });


// app.get('/api/tables', (req, res) => res.json(tableData));
// app.get('/api/waitlist', (req, res) => res.json(waitListData));

// // API POST Requests | Below code handles when a user submits a form and thus submits data to the server.
// app.post('/api/tables', (req, res) => {
//   // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
//   // It will do this by sending out the value "true" have a table
//   // req.body is available since we're using the body parsing middleware
//   console.log("+++++++++++++++++");
//   console.log("The req.body for /api/tables is:");
//   console.log(req.body);
//   console.log("+++++++++++++++++");
//   if (tableData.length < 5) {
//     tableData.push(req.body);
//     res.json(true);
//   } else {
//     waitListData.push(req.body);
//     res.json(false);
//   }
// });


// app.post('/api/clear', (req, res) => {
//   // Empty out the arrays of data
//   tableData.length = 0;
//   waitListData.length = 0;

//   res.json({ ok: true });
// });

