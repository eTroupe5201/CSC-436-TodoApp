import {useState, useContext, useEffect} from "react";
import {StateContext} from "./context";

import {useResource } from "react-request-hook";
import"./App.css";
export default function Post ({ title, description, author, dateCreated, id}) {

  //useState hook within Post component set to empty string init

const {state, dispatch} = useContext(StateContext);
const [dateCompleted, setDateCompleted] = useState("");
const [complete, setComplete] = useState("");
const [completeText, setCompleteText] = useState("");


function handleComplete(evt){
  const endpoint = "/CreateTodoItem/" + JSON.stringify(id);
  
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
      updateComplete(endpoint, complete, completeText, dateCompleted);
    }
    const [updatedPost, updateComplete] = useResource((endpoint, dateCreated, complete, completeText, dateCompleted) => ({
      url: endpoint,
      method: "patch", //data deletes with put
      data: {  dateCreated, complete, completeText, dateCompleted},
    }));

  const [post, createDelete] = useResource((element, id)=> ({
    url: element,
    method: "delete",
    data: {id},
  }));


  useEffect(() => {
    if (updatedPost?.isLoading === false && updatedPost?.data) {
      dispatch({
        type: "TOGGLE_TODO", 
        title: updatedPost.data.title, 
        description: updatedPost.data.description, 
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
      const element = "/CreateTodoItem/" + JSON.stringify(id);
      createDelete(element);
      dispatch({type: "DELETE_TODO",id, });
      console.log(id);
   //   deleteDivById(id);
    console.log(element);
  };

//   //so this works, now update the page with a use hook
  //hacky delete until you figure out use
//   function deleteDivById(currentElement)  
// {   
//     var item = document.getElementById(currentElement);
//     item.parentNode.removeChild(item);
    
// }
//try to make use a useEffect hook, not sure how 
    return (
      <div >
        <div id={id} className="TodoItem">
          <table>
            <tbody>
              <tr  >
                <td >Title: {title}</td> 
                <td>Description: {description}</td>
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
