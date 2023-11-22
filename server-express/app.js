var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

// //importing routers
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var postRouter = require('./routes/post'); //const is more ideal, var is dated



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require("./setupMongo")();

//handlers that specifies routes
app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/post")); //only executes if the route is /post
app.use("/delete:id", require("./routes/post"));
app.use("/patch:id", require("./routes/post"));

//app.use("/delete/:id", require("./routes/post"));
module.exports = app;

