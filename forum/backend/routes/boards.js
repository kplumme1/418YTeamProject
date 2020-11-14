const router = require('express').Router();
let Board = require('../models/board.model');

//default - get list of all boards
router.route('/').get((req, res) => {
  Board.find()
    .then(board => res.json(board))
    .catch(err => res.status(400).json('Error: ' + err));
});

//add board
router.route('/add').post((req, res) => {
  const board_title_text = req.body.board_title_text;
  const board_desc_text = req.body.board_desc_text;
  const newBoard = new Board({
    board_title_text,
    board_desc_text
  });

  //save new board
  newBoard.save()
    .then(() => res.json('Board added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//find board by ID
router.route('/urlid/:id').get((req, res) => {
  Board.findById(req.params.id)
    .then(board => res.json(board))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete board
router.route('/:id').delete((req, res) => {
  Board.findByIdAndDelete(req.params.id)
    .then(() => res.json('Board deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;