const express = require('express');
const router = express.Router();
const Posts = require('./db.js');

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    });
  });

  router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'id not found' })
        }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    });
  });


  //// WORK ON THIS AFTER
  router.get('/:id/comments', (req, res) => {
      const { id } = req.params;
    Posts.findPostComments(id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'id not found' })
        }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    });
  });

router.post('/', (req, res) => {

    function validatePost(post) {
        if(!post.title) {
            return false
        } else if (!post.contents) {
            return false
        } else {
            return true
        }
    }
    if(validatePost(req.body)) {
        Posts.insert(req.body)
    .then (post => {
        res.status(201).json({message: ' post success'})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'There was an error while saving the post to the database'})
    })
    } else {
        Posts.catch
        res.status(400).json({message: "please provide both title and contents"})
    }
});

router.post('/:id/comments', (req, res) => {
    function validateComment(comment) {
        if(!comment.text) {
            return false
        } else if (!comment.post_id) {
            return false
        } else {
            return true
        }
    }

    Posts.insertComment(req.body)
    .then (post => {
        res.status(201).json(post)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'error adding post'})
    })
});

router.delete('/:id', (req, res) => {
   
    Posts.remove(req.params.id)
    .then (post => {
        if (post > 0) {
            res.status(200).json({ message: 'The post has been deleted' });
          } else {
            res.status(404).json({message: 'post can not be found'})}
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'error deleteing'})
    });
})
    
router.put('/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
    .then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'post id could not be found'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).jsone({ message: 'error updating the post'})
    })
})







  module.exports = router; 