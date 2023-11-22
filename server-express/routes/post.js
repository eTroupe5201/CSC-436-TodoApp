const express = require("express");
const router = express.Router(); //creates router
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const privateKey = ``;

//we are validating that the token payload is valid and appending it to the 
//to the request object
//becomes available for all other rout handlers on the request object
//middleware
//executes first

//router.use executes regardless 
router.use(function (req, res, next) {
	if (req.header("Authorization")) {
		try {
			req.payload = jwt.verify(req.header("Authorization"), privateKey, {
				algorithms: ["RS256"],
			});
			
		} catch (error) {
			return res.status(401).json({ error: error.message });
		}
	} else {
		return res.status(401).json({ error: "Unauthorized" });
	}
	next();
});

//router executes for http post requests
router.post("/", async function (req, res) {
	const post = new Post({
	title: req.body.title,
	content: req.body.content,
	author: req.payload.id, //blank if changed to author
	dateCreated: new Date(),
	complete: false,
	completeText:'Not Complete',
	dateCompleted: new Date(),
	
});
	await post
		.save()
		.then((savedPost) => {
			return res.status(201).json({
				title: savedPost.title,
				content: savedPost.content,
				author: savedPost.author,
				dateCreated: savedPost.dateCreated, 
				complete: savedPost.complete, 
				completedText: savedPost.completeText,
				dateCompleted: savedPost.dateCompleted,
				id: savedPost._id,
			});
		})
.catch((error) => {
	return res.status(500).json({ error: error.message });
});
});
	
		router.patch("/:id", async function (req, res) {
			const {current} = req.params;
			const post = await Post.findByIdAndUpdate
			(current, req.body, {new: true})
				.then((savedPost) => {
					return res.status(201).json({
						data: current,
					});
				})
		.catch((error) => {
			return res.status(500).json({ error: error.message });
		});
		});



//for http get requests
router.get("/", async function (req, res, next) {
    const posts = 
	await 
	Post.find()
	.where("author")
	.equals(req.payload.id)
	.then((posts) =>{
		return res.status(200).json({ posts});
	})
	.catch((error) => {
		return res.status(500).json({error: error.message});
		})
	});




	// router.delete("/:id", async function (req, res) {
	// 	const posts = 
	// 	await 
	// 	Post.find()
	// 	.where("author")
	// 	.equals(req.payload.id)
	// 	.then((posts) =>{
	// 	posts.delete(req.payload.id);
	// 	message:"deleted";
	// 	})
	// 	.catch((error) => {
	// 		return res.status(500).json({error: error.message});
	// 		})
	
	router.delete('/:id', async (req, res) => {
		const { id } = req.params;
		await Post.findByIdAndDelete(id);
		return res.status(200).json({
		  id,
		  message:"Post Deleted"
		})
		// .catch((error) => {
		// 	console.log("error");
	    // return res.status(500).json({error: error.message});
		// })
		//catch kicked me off of the server, not sure why, working now

 	});

	
module.exports = router;


    //typically you'll use a request identifier
    //normally you don't want to send out an error message thats coming back from the library
    // because it could potentially leak too much information about the backend to the caller
` title: action.title,
description: action.description,
author: action.author,
dateCreated: action.dateCreated,
complete: action.complete,
completeText: action.completeText,
dateCompleted: action.dateCompleted, 
id: action.id, `


