const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {type: String, required: true},
    content: {type: String, required: true,},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    dateCreated: {type: Date},
    complete: {type: Boolean},
    completeText: {type: String},
    dateCompleted: {type: Date},
    id: {type: String},

  }
);

//Export model
module.exports = mongoose.model('Post', PostSchema);
//used to perform crud operations
//post schema, used in post router

`  
title: action.title,
description: action.description,
author: action.author,
dateCreated: action.dateCreated,
complete: action.complete,
completeText: action.completeText,
dateCompleted: action.dateCompleted, 
id: action.id, `