const express = require('express'); 
const app = express();

const cors = require('cors');


const allow = ['http://localhost:3000']

app.use(cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true);
      if(allow.indexOf(origin) === -1){
        return callback(new Error("Cross-Origin Rejected"), false);
      }
      return callback(null, true);
    }
  }));


app.use(express.json());


const questions = require('./routes/api/questions');


const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongo's A GoGo"))
    .catch(err => console.log(err))


app.use('/api/questions', questions);

app.get('/test', (req, res) => res.send("This Works"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up on port ${port}`));