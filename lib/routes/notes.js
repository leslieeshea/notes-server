const { Router } = require('express');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const { title, body } = req.body;

    try {
      const note = await Note.create({ title, body });
      res.send(note);
    } catch(error) {
      next(error);
    }
  })
  .get('/', async(req, res, next) => {
    try {
      const note = await Note
        .find()
        .select({
          __v: false
        })
        .lean();
      res.send(note);
    } catch(error) {
      next(error);
    }
  });
