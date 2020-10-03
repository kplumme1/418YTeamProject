const router = require('express').Router();
let Board = require('../models/board.model');

router.route('/').get((req, res) => {
  Board.find()
    .then(board => res.json(board))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const board_title_text = req.body.board_title_text;
  const board_desc_text = req.body.board_desc_text;
  const newBoard = new Board({
    board_title_text,
    board_desc_text
  });

  newBoard.save()
    .then(() => res.json('Board added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;