const mongoose = require("mongoose");
const uri = "mongodb+srv://etroupe:odUl2C1wTOxIDubG@webapplicationsdatabase.wk7rgkd.mongodb.net/?retryWrites=true&w=majority";
//bad practice, your password is visible, anyone can connect to your database
function connect() {
const options = { useNewUrlParser: true };
mongoose.connect(uri, options).then(
 () => { console.log("Database connection established!"); },
 err => { console.log("Error connecting Database instance due to: ", err); }
 ) }
module.exports = connect;


