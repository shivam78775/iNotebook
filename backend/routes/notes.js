const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



//Route:1 Get all the notes using: GET '/api/auth/getuser' login required
try {
    router.get('/fetchallnotes', fetchuser, async (req, res) => {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    })

} catch (error) {
    console.error(error.message);
    return res.status(500).send("Some error ocoured");
}

//Route:2 Add a new note using : POST '/api/auth/addnote' login required
try {
    router.post('/addnote', fetchuser, [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Descrption must be atleast 5 characters').isLength({ min: 5 }),
    ], async (req, res) => {
        const { title, description, tag } = req.body;
        //If there are errors, return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    })
} catch (error) {
    console.error(error.message);
    return res.status(500).send("Some error ocoured");
}

//Route:3 Update an existing note using: PUT '/api/notes/updatenote' login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the node to be updated or update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Some error ocoured");
    }
})

//Route:4 Delete an existing note using: Delete '/api/notes/deletenote' login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
    //Find the node to be deleted or deleted it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not found") }
    // Allow deletion only if user ownes this Notes
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Note has been deleted", note: note });
         
} catch (error) {
    console.error(error.message);
    return res.status(500).send("Some error ocoured");
}
})
module.exports = router