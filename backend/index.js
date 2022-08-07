const express = require("express");
require("dotenv").config();
const cors = require("cors");
const db = require("./models/db");

const app = express();
const PORT = 5000;
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const roleRouter = require("./routes/roles");
const commentRouter = require("./routes/comments");
const gamelistRouter = require("./routes/gamelist");
const newsRouter = require("./routes/newes");
app.use(cors());
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/roles", roleRouter);
app.use("/comment", commentRouter);
app.use("/gamelist", gamelistRouter);

app.use("/newes", newsRouter);
app.listen(process.env.PORT, () => {
  console.log(`app listen on PORT ${PORT}`);

});


