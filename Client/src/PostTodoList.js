import Post from "./Post"
import {StateContext} from "./context";
import {useContext} from "react";

export default function PostList () {
  const {state, dispatch} = useContext(StateContext);
  const {posts} = state;
 return (
  <div>
   {posts.length === 0 && <h2>No posts found.</h2>}
   {posts.length > 0 && posts.map((p, i) => <Post {...p} key={p._id || p.id} />)}
    
  </div>);
}
//Class Notes
//accepts props, has deffault value of empty array if it doesnt receive a post
//map function is used to iterate over posts, create new posts components as it iterates
//any time we iterate over an array, we create components
//key is critical for delete, if not specified when rendered it will not function properly
//key attributes helps track which posts gets operated on, has to be unique
//need to genrate a uuid
//uuid in class 10/3/2023
