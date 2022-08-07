const newsModel = require("../models/news");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const addnews = (req, res) => {
  const { description, title, image } = req.body;
  const news = new newsModel({
    description,
    title,
    image,
  });

  news
    .save()
    .then((resulat) => {
      res.status(201).json(resulat);
    })
    .catch((err) => {});
};

const gitallnews = (req, res) => {
  newsModel
    .find({})
    .then((resulat) => {
      res.status(200).json(resulat);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const findNewsById = (req,res) => {
  const { id } = req.params;
  newsModel
      .findById({ _id: id })
      .exec()
      .then((result) => {
          if (result._id == id) {
              res.status(200).json({
                  success: true,
                  message: `news `,
                  result: result,
              });
          } 
      })
      .catch((err) => {
          res.status(500).json({
              success: false,
              message: `Server Error`,
              err: err.message,
          });
      });

};








module.exports = {
  addnews,
  gitallnews,
  findNewsById
};
