import {useState, useContext, useEffect} from "react";
import {StateContext} from "./context";

import {useResource } from "react-request-hook";
import"./App.css";
export default function Post ({ title, description, author, dateCreated, complete, completeText, dateCompleted, id}) {

  //useState hook within Post component set to empty string init

const {state, dispatch} = useContext(StateContext);


function handleComplete(evt){
  const endpoint = "/CreateTodoItem/" + JSON.stringify(id);
  
    if (evt.target.checked) {
        const currentDate = Date.now();
        const f = new Intl.DateTimeFormat("en-us", {
          dateStyle: "full"
        })
       
        updateComplete(endpoint, true,  "Complete",f.format(currentDate),);
      } else {
        post.complete = false;
        updateComplete(endpoint, false, "Not Complete", "");

      }
      
 //post.complete = current => !current;
   // post.complete = current => !current;
    }
    const [updatedPost, updateComplete] = useResource((endpoint, complete,  completeText, dateCompleted,id) => ({
      url: endpoint,
      method: "put",
      data: { title, description, author, dateCreated,complete, completeText, dateCompleted, id},
    }));


  const [post, createDelete] = useResource((element) => ({
    url: element,
    method: "delete",
    data: { title, description, author, dateCreated,complete, completeText, dateCompleted, id},
  }));


  
  function handleDelete(){
      const element = "/CreateTodoItem/" + JSON.stringify(id);
      createDelete(element);
      deleteDivById(id);
    console.log(element);
  };

  //so this works, now update the page with a 
  
  function deleteDivById(currentElement)  
{   
    var item = document.getElementById(currentElement);
    item.parentNode.removeChild(item);
    
}
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
