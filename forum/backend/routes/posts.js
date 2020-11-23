const router = require('express').Router();
const auth = require('../validation/auth');
let Post = require('../models/post.model');

//get all posts
router.route('/').get((req, res) => {
  Post.find({ del_flag: false }).sort({post_num: 1})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get posts by parent thread ID
router.route('/thread').get((req, res) => {
  console.log('parent thread: ' + req.query.id)
  Post.find({ parent_thread_id: req.query.parent_thread_id, del_flag: false }).sort({post_num: 1})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get posts by internal ID via query parameter
router.route('/queryid').get((req, res) => {
  console.log('query id: ' + req.query.id)
  Post.find({ _id: req.query._id, del_flag: false })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});


//get post by internal db ID via URL
router.route('/urlid/:id').get((req, res) => {
  console.log('query ID Via URL' + req.params.id);
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(400).json('Error: ' + err));
});



//add a post
router.route('/add').post((req, res) => {
  const userInfo = auth.verify(req);
  if (userInfo == null) {
    console.log("CHECK FAILED?!");
    return res.status(400).send("Unauthorized!!");
  } else {console.log("CHECK PASSED!!")}
  console.log("Response: " + JSON.stringify(userInfo));
  //const post_author = userInfo.username;
  const parent_thread_id = req.body.parent_thread_id;
  let post_num = Number(req.body.post_num);
  //const post_author = req.body.post_author;
  const post_body_text = req.body.post_body_text;
  //const del_flag = req.body.del_flag;

  
  let newPost = new Post({
    parent_thread_id,
    post_author: userInfo.username/*'ignored'*/,
    post_body_text,
    del_flag: false
  });

  //get the highest post_num
  Post.find({ parent_thread_id: req.body.parent_thread_id, del_flag: false }).sort({post_num: -1}).limit(1)
    .exec(function (error, post) {
      console.log('post[0]: ' + post[0]);
      if (typeof post[0] === 'undefined' ) {
        console.log('post_num undefined...');
        newPost.post_num = 0;
      } else {
        console.log('post[0].post_num: ' + post[0].post_num);
        newPost.post_num = Number(post[0].post_num + 1);
      }

      //console.log('newPost.post_num: ' + newPost.post_num);
      newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    });
});

//update a post
router.route('/update').post((req, res) => {
  console.log('updating post: ' + req.body._id)
  Post.findById( req.body._id )
    .then(posts => {
      posts.post_body_text = req.body.post_body_text;
      posts.del_flag = req.body.del_flag;

      posts.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


  //del not tested yet
  router.route('/delete').post((req, res) => {
    console.log('deleting (del_flag = true) post: ' + req.body._id)
    Post.findById( req.body._id )
      .then(posts => {
        posts.del_flag = true;
        posts.save()
          .then(() => res.json('Post deleted (flagged)!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });



module.exports = router;