const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const parent_topic_id = req.body.parent_topic_id;
    const post_num = Number(req.body.post_num);
    const post_author = req.body.post_author;
    const post_body_text = req.body.post_body_text;

  const newPost = new Post({
    parent_topic_id,
    post_num,
    post_author,
    post_body_text
  });

  router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
/*
//from exercises tutorial
router.route('/update/:id').post((req, res) => {
  Topic.findById(req.params.id)
    .then(topic => {
      topic.username = req.body.username;
      topic.description = req.body.description;
      topic.duration = Number(req.body.duration);
      topic.date = Date.parse(req.body.date);

      topic.save()
        .then(() => res.json('Topic updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
*/

  newPost.save()
  .then(() => res.json('Post added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;