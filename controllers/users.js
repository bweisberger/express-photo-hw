const express = require('express');
const router = express.Router();
const Users = require('../models/users');

//index route
router.get('/', (req, res)=>{
  Users.find((err, users)=>{
    if (err){
      console.log(err)
    } else {
      res.render('users/index.ejs', {
        photos: photos
      })
    }
  })
});

//new route
router.get('/new', (req, res)=>{
      res.render('users/new.ejs')
  });

//post route
router.post('/', (req, res)=>{
  Users.create(req.body, (err, photo)=>{
    if (err){
      console.log(err)
    } else {
      res.redirect("/users/");
    }
  })
})

//show route
router.get('/:id', (req, res)=>{
  Users.findById(req.params.id, (err, photo)=>{
    if(err){
      console.log(err)
    } else {
      res.render('users/show.ejs', {
        photo: photo
      })
    }
  })
});

//edit route
router.get('/:id/edit', (req, res)=>{
  Users.findById(req.params.id, (err, photo)=>{
    if(err){
      console.log(err)
    } else {
      res.render('users/edit.ejs', {
        photo: photo
      })
    }
  })
})

//put route
router.put('/:id', (req, res)=>{
  Users.findByIdAndUpdate(req.params.id, req.body, (err, photo)=>{
    if(err){
      console.log(err);
    } else {
      res.redirect("/users/" + req.params.id)
    }
  })
})

//delete route
router.delete("/:id", (req, res)=>{
  Users.findByIdAndDelete(req.params.id, (err, photo)=>{
    if(err){
      console.log(err);
    } else {
      res.redirect('/users/');
    }
  })
})

module.exports = router;
