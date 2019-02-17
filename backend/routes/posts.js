const express = require("express");
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})

router.post('' , multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  });

});

router.get('',(req, res, next) => {
  // TODO: why + is prefixed
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;

  if(pageSize && currentPage){
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  postQuery.find()
    .then(documents => {
      // If return in THEN, it will create a new promise and listen to it's result automatically
      fetchedPosts = documents;
      return Post.count();
    }) // Chaining
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: fetchedPosts,
        maxPosts: count
      });
    })

});

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Post deleted"});
    });
});

router.put("/:id", multer({storage: storage}).single('image'), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  console.log(post)
  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({message: 'Update successful!'});
  })
});

router.get("/:id", (req, res, next) =>{
  Post.findById(req.params.id).then(post => {
    if (post){
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'});
    }
  })
});

module.exports = router;
