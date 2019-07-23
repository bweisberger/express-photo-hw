const express = require('express');
const app = express();
const photoController = require('./controllers/photos');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('./db/db')

app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use('/photos', photoController);

app.get('/', (req, res)=>{
  res.render('home/index.ejs');
})




app.listen(3000, ()=>{
  console.log("listening on port 3000");
});
