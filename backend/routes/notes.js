const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const bodyParser = require("body-parser");
const Notes = require("../models/Notes");
var jsonparser = bodyParser.json();
const { body, validationResult } = require("express-validator");


router.post('/addnotes',fetchUser, jsonparser,
[
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Enter description of min 5 characters").isLength({ min: 5 }),

],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title,description,tag} = req.body;
    try{
        const note = new Notes({
            title,description,tag,user:req.user.id
        })
        const savednote = await note.save();
        res.send(savednote)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


router.get('/fetchallnotes',fetchUser,async (req,res)=>{
    try{
     const notes = await Notes.find({user:req.user.id});
     res.json(notes)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


router.put('/Updatenotes/:id',fetchUser,jsonparser,async (req,res)=>{
    const {title,description,tag} = req.body;
    // create new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    try{

    // Find the note to be updated
    let note = await Notes.findById(req.params.id)
    // console.log(req.params.id)
    // console.log(note._id.toString())
    if(!note){return res.status(404).send("Not Found")};
    if(note._id.toString() !== req.params.id){return res.status(401).send("Unauthorized access")};
    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true})
    res.json(note)}
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})




router.delete('/deletenotes/:id',fetchUser,jsonparser,async (req,res)=>{
    const {title,description,tag} = req.body;
    try{
    // Find the note to be deleted
    let note = await Notes.findById(req.params.id)
    // console.log(req.params.id)
    // console.log(note._id.toString())
    if(!note){return res.status(404).send("Not Found")};
    if(note._id.toString() !== req.params.id){return res.status(401).send("Unauthorized access")};
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success" :"Note has been deleted"});}
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
    
})

module.exports = router;