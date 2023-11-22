import {useState, useContext, useEffect} from "react";
import {StateContext} from "./context";

import {useResource } from "react-request-hook";
import"./App.css";
export default function Post ({ title, content, author, dateCreated, id}) {

  //useState hook within Post component set to empty string init

const {state, dispatch} = useContext(StateContext);
const {user} = state;
const [dateCompleted, setDateCompleted] = useState("");
const [complete, setComplete] = useState("");
const [completeText, setCompleteText] = useState("");


function handleComplete(evt){
  //const endpoint = "/post/" + JSON.stringify(id);
  
    if (evt.target.checked) {
        const currentDate = Date.now();
        const f = new Intl.DateTimeFormat("en-us", {
          dateStyle: "full"
        })
            setComplete(true);
            setCompleteText("Complete");
            setDateCompleted(f.format(currentDate));
      } else {
        setComplete(false);
        setCompleteText("Not Complete");
        setDateCompleted("");
      }
      updateComplete(complete, completeText, dateCompleted);
    }
    const [updatedPost, updateComplete] = useResource((complete, completeText, dateCompleted) => ({
      url: `/Post/${id}`,
      method: "patch", //data deletes on refresh with put
      headers: {Authorization: `${user?.access_token}`},
      //headers: {Authorization: `${state?.user.access_token}`}, glitched, added user to state
      data: {complete, completeText, dateCompleted},
    }));

  const [post, createDelete] = useResource((id)=> ({
    url: `/Post/${id}`,
    method: "delete",
    headers: {Authorization: `${user?.access_token}`},
    data: {id},
  }));


  useEffect(() => {
    if (updatedPost?.isLoading === false && updatedPost?.data) {
      dispatch({
        type: "TOGGLE_TODO", 
        title: updatedPost.data.title, 
        content: updatedPost.data.content, 
        author: updatedPost.data.author,
        dateCreated: updatedPost.data.dateCreated, 
        complete: updatedPost.data.complete, 
        completedText: updatedPost.data.completeText,
        dateCompleted: updatedPost.data.dateCompleted,
        id: updatedPost.data.id
      });
    }
  }, [updatedPost]);


  
  function handleDelete(){
      //const element = "/post/" + JSON.stringify(id);
      createDelete(id);
      dispatch({type: "DELETE_TODO",id, });

  };


    return (
      <div >
        <div id={id} className="TodoItem">
          <table>
            <tbody>
              <tr  >
                <td >Title: {title}</td> 
                <td>Description: {content}</td>
                <td><i>Written by <b>{author}</b></i></td> 
                <td>Date Created: {dateCreated}</td>
                <td>Complete: <input type="checkbox" value={complete} onChange={handleComplete} ></input></td> 
                <td><input type="text" value={completeText} placeholder="Not Complete" disabled></input></td>
                <td>Date Completed:<input type="text" value={dateCompleted} placeholder="Not Complete" disabled></input> </td>
                <td>ID:<input type="text" value={id} disabled></input> </td>
                
                <td><button onClick={handleDelete} >Delete</button></td> 
              </tr>
            </tbody>
          </table>
        </div>
        </div>);
}
//accepts title Description and authur as props
//uuid created to hopefully delete post
