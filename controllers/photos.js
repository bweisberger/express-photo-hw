const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');
const Users = require('../models/users')

//index route
router.get('/', async(req, res)=>{
  try{
    const photos = await Photos.find();
    const users = await Users.find();
    res.render('photos/index.ejs', {
      photos: photos,
      users: users
    })
  } catch(err){
    res.send(err);
  }
});

//new route
router.get('/new', async (req, res)=>{
    try{
      const users = await Users.find();
      res.render('photos/new.ejs', {
        users : users
      })
    } catch(err){
      res.send(err);
    }
  });

//post route
router.post('/', async (req, res)=>{
  try {
    console.log(req.body, "<----req.body in photo post route");
    const photo = await Photos.create(req.body);
      res.redirect("/photos/");
  } catch(err){
    res.send(err);
  } 
})

//show route
router.get('/:id', async (req, res)=>{
  try {
    const photo = await Photos.findById(req.params.id).populate('user', 'name');
    res.render('photos/show.ejs', {
      photo: photo
    });
  }catch(err){
    res.send(err)
  }
})

//edit route
router.get('/:id/edit', async (req, res)=>{
  try {
    const photo = await Photos.findById(req.params.id).populate('user');
    console.log(photo);
    const users = await Users.find();
    res.render('photos/edit.ejs', {
      photo: photo,
      users: users
    })
  } catch(err) {
    res.send(err);
  }
})

//put route
router.put('/:id', async (req, res)=>{
  try {
    const photo = await Photos.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/photos/" + req.params.id)
  } catch(err){
    res.send(err);
  }
})

//delete route
router.delete("/:id", async (req, res)=>{
  try{
    const photo = await Photos.findByIdAndDelete(req.params.id);
    res.redirect('/photos/');
  } catch(err){
    res.send(err);
  }
})

module.exports = router;
