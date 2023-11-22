const mongoose = require('mongoose'); //import mongoose
const Schema = mongoose.Schema; //importing schema from mongose
const UserSchema = new Schema( //creating new instance of schema and assign it
{
 username: {type: String, required: true, unique: true}, 
 password: {type: String, required: true,},
 posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
 }
);
//Export model
module.exports = mongoose.model('User', UserSchema); //compile user into a model and export the model
