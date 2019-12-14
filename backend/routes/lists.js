const mongoose = require('mongoose');
const {List, validate} = require('../models/list.js');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    // let list = new List({ name: req.body.name, userId: req.body.id });
    let list = new List({ });
    list.name = req.body.name;
    list.userId = req.body.userId; 
    list = await list.save();
  
    res.send(list);
});

router.get('/', async (req, res) => {
    const lists = await List.find().sort('name');
    res.send(lists);
});

//np. GET http://localhost:3000/api/lists/5df4edb327459638cb5514ba
router.get('/:id', async (req, res) => {
    const list = await List.findById(req.params.id);
    
    if (!list) return res.status(404).send('The list with the given ID was not found.');
    res.send(list);    
});

router.delete('/:id', async (req, res) => {
    const list = await List.findByIdAndRemove(req.params.id);
    
    if (!list) return res.status(404).send('The list with the given ID was not found.');
    res.send(list);
});

router.put('/:id', async (req, res) => {
    const list = await List.findById(req.params.id);

    if (!list) res.status(404).send('The course with the given ID was not found');
    const { error } = validate(req.body); 
    
    if (error) return res.status(400).send(error.details[0].message);

    list.name = req.body.name;
    list.userId = req.body.id;

    res.send(list);
});

module.exports = router;