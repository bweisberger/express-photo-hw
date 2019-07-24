const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Photos = require('../models/photos')

//index route
router.get('/', async (req, res)=>{
  try{
    const users = await Users.find();
    res.render('users/index.ejs', {
        users: users
      })
  } catch(err) {
    res.send(err);
  }  
});

//new route
router.get('/new', async (req, res)=>{
    try{
        res.render('users/new.ejs')  
    } catch(err) {
        res.send(err)
    }
});

//post route
router.post('/', async (req, res)=>{
    try {
        await Users.create(req.body)
        res.redirect("/users/");
    } catch(err){
        res.send(err);
    }
})

//show route
router.get('/:id', async (req, res)=>{
  try {
    const user = await Users.findById(req.params.id);
    const photosfromDB = await Photos.find({user: req.params.id});
    console.log(user, "<----user in show route");
    console.log(photosfromDB, "<-----photosfromDB in show route");
    res.render('users/show.ejs', {
        user: user,
        photos: photosfromDB
      })
  } catch(err){
      res.send(err);
  }
});


//edit route
router.get('/:id/edit', async (req, res)=>{
    try {
        const user = await Users.findById(req.params.id);
        const photos = await Photos.find({user: req.params.id});
        res.render('users/edit.ejs', {
            user: user,
            photos: photos
        })
    } catch(err) {
        res.send(err);
    }
})


//put route
router.put('/:id', async (req, res)=>{
    try{
        const user = await Users.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/users/" + req.params.id)
    } catch(err){
        res.send(err);
    }
})

//delete route
router.delete("/:id", async (req, res)=>{
  try{
    await Users.findByIdAndDelete(req.params.id);
    await Photos.remove({user: req.params.id});
    res.redirect('/users/');
  } catch(err){
      res.send(err);
  }
})

module.exports = router;
