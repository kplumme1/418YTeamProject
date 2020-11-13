const router = require('express').Router();
let Post = require('../models/post.model');

//get all posts
router.route('/').get((req, res) => {
  Post.find({ del_flag: false })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get posts by parent ID
router.route('/thread').get((req, res) => {
  console.log(req.query.id)
  Post.find({ parent_thread_id: req.query.parent_thread_id, del_flag: false })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get posts by internal ID via parameter
router.route('/id').get((req, res) => {
  console.log(req.query.id)
  Post.find({ _id: req.query._id, del_flag: false })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get post by internal db ID via URL
router.route('/:id').get((req, res) => {
  console.log(req.params.id);
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(400).json('Error: ' + err));
});



//add a post
router.route('/add').post((req, res) => {
  const parent_thread_id = req.body.parent_thread_id;
  const post_num = Number(req.body.post_num);
  const post_author = req.body.post_author;
  const post_body_text = req.body.post_body_text;
  const del_flag = req.body.del_flag;

  const newPost = new Post({
    parent_thread_id,
    post_num,
    post_author,
    post_body_text,
    del_flag
  });

  newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update a post
router.route('/update').post((req, res) => {
  console.log(req.query.id)
  Post.find({ parent_thread_id: req.query.parent_thread_id })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));






  const parent_thread_id = req.body.parent_thread_id;
  const post_num = Number(req.body.post_num);
  const post_author = req.body.post_author;
  const post_body_text = req.body.post_body_text;
  const del_flag = req.body.del_flag;

  const updatePost = new Post({
    parent_thread_id,
    post_num,
    post_author,
    post_body_text,
    del_flag
  });

  updatePost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


  //del not tested yet
  router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then(() => res.json('Post deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });



module.exports = router;