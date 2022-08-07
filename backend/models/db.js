const mongoose = require("mongoose");

const uri = "mongodb+srv://goodgame:mo3adnabeelbino@cluster0.bpjctrp.mongodb.net/GGwebsite?retryWrites=true&w=majority";
mongoose.connect(uri).then(
  () => {
    console.log(process.env.DB_URI);
    console.log("we are ready to work");
  },
  (err) => {
    console.log(err);
  }
);
