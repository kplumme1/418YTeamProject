const router = require('express').Router();
let Topic = require('../models/topic.model');


//get all topics
router.route('/').get((req, res) => {
  Topic.find({ del_flag: false }).sort({topic_num: 1})
    .then(topics => res.json(topics))
    .catch(err => res.status(400).json('Error: ' + err));
});
/* testing out some other syntax...

router.route('/test').get(function(req, res) {
  Topic.find({ del_flag: false }, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  
  })
  .sort({topic_num: -1}).limit(1);

  router.route("/promise").get((req, res) => {

    let query = Topic.find({ del_flag: false })
    .sort({topic_num: -1});

    let promise = query.exec();

    promise.then(result => {
      res.json(result)
    });
});
*/


//get topics - there's only one board, so find all topics that aren't deleted
router.route('/board').get((req, res) => {
  console.log('parent board: ' + req.query.id)
  Topic.find({ del_flag: false }).sort({topic_num: 1})
    .then(topic => res.json(topic))
    .catch(err => res.status(400).json('Error: ' + err));
});


//get topics by internal ID via query parameter
router.route('/queryid').get((req, res) => {
  console.log('topics/query id: ' + req.query.id)
  Topic.find({ _id: req.query._id, del_flag: false })
    .then(topics => res.json(topics))
    .catch(err => res.status(400).json('Error: ' + err));
});


//get topic by internal db ID via URL
router.route('/urlid/:id').get((req, res) => {
  console.log('topics/query ID Via URL' + req.params.id);
    Topic.findById(req.params.id)
      .then(topics => res.json(topics))
      .catch(err => res.status(400).json('Error: ' + err));
});

/*
    topic_title: { type: String, required: true },
    topic_desc: { type: Number, required: true },
    del_flag: { type: Boolean, required: true }  
*/


//add a topic
router.route('/add').post((req, res) => {
  console.log('creating new topic:::: ' + req.body.topic_title);
  const topic_title = req.body.topic_title;
  const topic_desc = req.body.topic_desc;
  //const topic_num = req.body.topic_num;
  //const del_flag = req.body.del_flag;
  //const parent_board_id = req.body.parent_board_id
  //console.log("Body: " + JSON.stringify(req.body));
  let newTopic = new Topic({
    parent_board_id: 'ignored',
    topic_title,
    topic_desc,
    //topic_num,
    del_flag: false
  });

  //get the highest topic_num
  Topic.find({ del_flag: false }).sort({topic_num: -1}).limit(1)
    .exec(function (error, topic) {
      console.log('topic[0]: ' + topic[0]);
      if (typeof topic[0] === 'undefined' ) {
        console.log('topic_num undefined...');
        newTopic.topic_num = 0;
      } else {
        console.log('topic[0].post_num: ' + topic[0].topic_num);
        newTopic.topic_num = Number(topic[0].topic_num + 1);
      }

      //console.log('newTopic.topic_num: ' + newTopic.topic_num);
      newTopic.save()
        .then(() => /*console.log('new topic saved')*/res.json('Topic added!'))
        .catch(err => /*console.log('new topic error: ' + err)*/res.status(400).json('Error: ' + err));
    });
});

//update a Topic
router.route('/update').post((req, res) => {
  console.log('updating topic: ' + req.body._id)
  Topic.findById( req.body._id )
    .then(topics => {
        topic.topic_title = req.body.topic_title;
        topic.topic_desc = req.body.topic_desc;
        topic.del_flag = req.body.del_flag;

      topics.save()
        .then(() => res.json('Topic updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

  //del not tested yet
  router.route('/delete').post((req, res) => {
    console.log('deleting (del_flag = true) topic: ' + req.query._id)
    Topic.findById( req.query._id )
      .then(topcis => {
        topcis.del_flag = true;
        topcis.save()
          .then(() => res.json('Topic deleted (flagged)!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });



module.exports = router;