const postsModel = require("../models/posts");
const commentModel = require("../models/comments");

const creatpost = (req, res) => {
  const { title, postimag } = req.body;
  const newpost = new postsModel({
    title,
    postimag,
    author: req.token.userId,
    creater: req.token.userName,
    imag: req.token.imag,
  });
  newpost
    .save()
    .then((resualt) => {
      res.status(201).json({
        resualt: resualt,
        success: true,
        message: `Article created`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteArticleById = (req, res) => {
  const postId = req.params.id;

  commentModel.findOneAndDelete(postId).then((resualt) => {

  });
  postsModel
    .findByIdAndDelete(postId)
    .then((resualt) => {


      res.status(200).json({
        success: true,
        message: `Article deleted`,
        resualt: resualt,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const updatepost = (req, res) => {
  postId = req.params.id;
  title = req.body;

  postsModel
    .findByIdAndUpdate(postId, title)
    .then((resualt) => {
      res
        .status(202)
        .json({ success: true, message: `post updated`, post: resualt });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllPost = async (req, res) => {
  await postsModel
    .find({})
    .populate("comments")
    .then((resualt) => {
      res.status(200).json({
        success: true,
        message: `All the posts`,
        posts: resualt,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        here: "here",
        err: err.message,
      });
    });
};

module.exports = { creatpost, deleteArticleById, updatepost, getAllPost };
