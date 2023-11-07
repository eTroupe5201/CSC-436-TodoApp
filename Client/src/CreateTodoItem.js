import { useState } from "react";
import {v4 as uuid} from "uuid";
import"./App.css";
import {StateContext} from "./context";
import {useContext} from "react";
import { useResource } from "react-request-hook";
export default function CreatePost() {
  //Notes:  state lets component remember user input
  // useState - declares a state variable that you can update directly
  //useReducer - declares a state variable with the update logic inside a reducer function

  //state hooks for create todo component - initalState set to empty string
  const [title, setTitle] = useState("");
  const [description, setContent] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [postID, setID] = useState("");

  const {state, dispatch} = useContext(StateContext);
  const {user} = state;

  


  function handleTitle(evt) {
    setTitle(evt.target.value);
  }

  function handleContent(evt) {
    setContent(evt.target.value);
    setID( uuid);
    const currentDate = Date.now();
    const f = new Intl.DateTimeFormat("en-us", {
      dateStyle: "full"
    })
    setDateCreated(f.format(currentDate));

    
  }
 
  const [post, createPost] = useResource(({ title, description, author, dateCreated, postID }) => ({
    url: "/CreateTodoItem",
    method: "post",
    data: { title, description, author, dateCreated, postID },
  }));

 

  function handleCreate() {
    const newPost = { title, description, author: user, dateCreated, postID};
    createPost(newPost)
    dispatch({type:"CREATE_POST", ...newPost});
  }
  
  
  //create an id for each todo, iterate through array find id and remove the post

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div className="createTodo">
        <table><tbody><tr>
          <td>Author: <b>{user}</b></td>
          <td>  <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          name="create-title"
          id="create-title"/></div></td>
          <td><textarea value={description} onChange={handleContent} /></td>
          <td> <input className="btn" type="submit" value="Create" /></td>
          </tr></tbody></table>
        </div>
        </form>
  );
}