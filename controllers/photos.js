const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');

//index route
router.get('/', (req, res)=>{
  Photos.find((err, photos)=>{
    if (err){
      console.log(err)
    } else {
      res.render('photos/index.ejs', {
        photos: photos
      })
    }
  })
});

//new route
router.get('/new', (req, res)=>{
      res.render('photos/new.ejs')
  });

//post route
router.post('/', (req, res)=>{
  Photos.create(req.body, (err, photo)=>{
    if (err){
      console.log(err)
    } else {
      res.redirect("/photos/");
    }
  })
})

//show route
router.get('/:id', (req, res)=>{
  Photos.findById(req.params.id, (err, photo)=>{
    if(err){
      console.log(err)
    } else {
      res.render('photos/show.ejs', {
        photo: photo
      })
    }
  })
});

//edit route
router.get('/:id/edit', (req, res)=>{
  Photos.findById(req.params.id, (err, photo)=>{
    if(err){
      console.log(err)
    } else {
      res.render('photos/edit.ejs', {
        photo: photo
      })
    }
  })
})

//put route
router.put('/:id', (req, res)=>{
  Photos.findByIdAndUpdate(req.params.id, req.body, (err, photo)=>{
    if(err){
      console.log(err);
    } else {
      res.redirect("/photos/" + req.params.id)
    }
  })
})

//delete route
router.delete("/:id", (req, res)=>{
  Photos.findByIdAndDelete(req.params.id, (err, photo)=>{
    if(err){
      console.log(err);
    } else {
      res.redirect('/photos/');
    }
  })
})

module.exports = router;
