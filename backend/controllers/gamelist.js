const axios = require("axios");
const usersModel = require("../models/users");

const gamelistModel = require("../models/gamelist");
const res = require("express/lib/response");

const gamelist = async (req, res) => {
  try {
    const list = await axios.get(
      "https://api.rawg.io/api/games?key=57161d95ab644501bfed73cd92025efe"
    );
    res.json(list.data.results);
  } catch (err) {
    throw err;
  }
};

const getAllGames = (req,res) => {
  gamelistModel 
     .find({})
    .then((resualt) => {
      res.status(200).json({
        success: true,
        message: `All the games`,
        posts: resualt,
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

const addgame = (req, res) => {
  const {gamename, image, genres, playtime, rate, released ,wherefound} = req.body;

  const game = new gamelistModel({
    image,
    gamename,
    genres,
    playtime,
    rate,
    released,
    wherefound
  });
  game
    .save()
    .then((resulat) => {
      res.status(200).json(resulat)
    })
    .catch((err) => {
      res.status(500).json(err)
    });
};

const deletelike = (req, res) => {
  // const id = req.body.id;
  // const token = req.token;

  // usersModel
  //   .update({_id:token.userId})
  //   .then(async (resl) => {
  //     try {
  //       const list = await axios.get(
  //         "https://api.rawg.io/api/games?key=57161d95ab644501bfed73cd92025efe"
  //       );
  //       const newlist = list.data.results;
  //       newlist.forEach((ele) => {
  //         if (id == ele.id) {
  //           usersModel
  //             .findByIdAndDelete({ _id: token.userId }, { wihslist: ele.id })
  //             .then((results) => {
  //               res.status(201).json({
  //                 success: true,
  //                 message: `added to wishlist`,
  //                 comment: results,
  //               });
  //             })
  //             .catch((err) => {
  //               res.status(500).json({
  //                 success: false,
  //                 message: `Server Error`,
  //                 err: err.message,
  //               });
  //             });
  //         }
  //       });
  //     } catch (err) {
  //       throw err;
  //     }
  //   })
  //   .catch((err) => {
  //   });
};

const addToLike = async (req, res) => {
  const id = req.body.id;
  const token = req.token;

  usersModel
    .findById(token.userId)
    .then(async (resl) => {
      try {
        const list = await axios.get(
          "https://api.rawg.io/api/games?key=57161d95ab644501bfed73cd92025efe"
        );
        const newlist = list.data.results;
        const addtowishlist = newlist.map((ele) => {
          if (id == ele.id) {
            usersModel
              .updateOne({ _id: token.userId }, { $push: { wihslist: ele.id } })
              .then((results) => {
                res.status(201).json({
                  success: true,
                  message: `added to wishlist`,
                  comment: results,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  success: false,
                  message: `Server Error`,
                  err: err.message,
                });
              });
          }
        });
      } catch (err) {
        throw err;
      }
    })
    .catch((err) => {});
};

const addToWishList = (req, res) => {
  const id = req.body.id;

  const token = req.token;

  usersModel
    .findById(token.userId)
    .then(async () => {
      try {
        const list = await axios.get(
          "https://api.rawg.io/api/games?key=57161d95ab644501bfed73cd92025efe"
        );
        const newlist = list.data.results;
        const addtowishlist = newlist.map((ele) => {
          if (id == ele.id) {
            usersModel
              .updateOne({ _id: token.userId }, { $push: { wihslist: ele.id } })
              .then((results) => {
                res.status(201).json({
                  success: true,
                  message: `added to wishlist`,
                  comment: results,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  success: false,
                  message: `Server Error`,
                  err: err.message,
                });
              });
          }
        });
      } catch (err) {
        throw err;
      }
    })
    .catch((err) => {
    });
};

module.exports = { gamelist, addToLike, addToWishList, deletelike, addgame ,getAllGames};
