const commentModel = require("../models/comments");
const postsModel = require("../models/posts");

const addComment = (req, res) => {
  const postId = req.params.id;
  const { comment } = req.body;
  const newcomment = new commentModel({
    commenterName: req.token.userName,
    comment,
    postId,
    commenter: req.token.userId,
    imag: req.token.imag,
  });
  newcomment.save().then((result) => {
    postsModel
      .updateOne({ _id: postId }, { $push: { comments: result._id } })
      .then(() => {
        res.status(201).json({
          success: true,
          message: `Comment added`,
          comment: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  });
};

const deletecomment = (req, res) => {
  commentId = req.params.id;
  commentModel
    .findByIdAndDelete(commentId)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `comment deleted`,
        result: result,
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

const updatecomment = (req, res) => {
  commentId = req.params.id;

  commentModel
    .findByIdAndUpdate(commentId, req.body)
    .then((result) => {
      res.status(202).json({
        success: true,
        message: `comment updated`,
        article: result,
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

module.exports = { addComment, deletecomment, updatecomment };
