const router = require('express').Router();
let Topic = require('../models/topic.model');

router.route('/').get((req, res) => {
  Topic.find()
    .then(topics => res.json(topics))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const parent_board_id = req.body.parent_board_id;
    const thread_num = Number(req.body.thread_num);
    const thread_author = req.body.thread_author;
    const thread_top_post_id = req.body.thread_top_post_id;
    const thread_title_text = req.body.thread_title_text;

  const newTopic = new Topic({
    parent_board_id,
    thread_num,
    thread_author,
    thread_top_post_id,
    thread_title_text
  });

  router.route('/:id').get((req, res) => {
  Topic.findById(req.params.id)
    .then(topic => res.json(topic))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Topic.findByIdAndDelete(req.params.id)
    .then(() => res.json('Topic deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


  newTopic.save()
  .then(() => res.json('Topic added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;