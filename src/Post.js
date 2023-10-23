import {useState} from 'react';
//import DateObject from "react-date-object";

//title, description, author, datecreated, uuid passed as props
export default function Post ({ title, Description, author, dateCreated, postID, complete }) {

  //useState hook within Post component set to empty string init
const [dateCompleted, setDateCompleted] = useState("");
//const [complete, setComplete] = useState("");
const [completeText, setCompleteText] = useState("");
//const { user, posts } = state; 
function handleComplete(evt){
 
    if (evt.target.checked) {
        const currentDate = Date.now();
        const f = new Intl.DateTimeFormat("en-us", {
          dateStyle: "full"
        })
      
        setDateCompleted(f.format(currentDate));
        setCompleteText("Complete");
      } else {
        setDateCompleted("Not Complete");
        setCompleteText("Not Complete");
      }
      setComplete(current => !current);
    }


    return (
         <div  class="todoElement">
            <tr>
            <td>Title: {title}</td>&nbsp; 
            <td>Description: {Description}</td>&nbsp; 
            <td><i>Written by <b>{author}</b></i></td> &nbsp; 
            <td>Date Created: {dateCreated}</td>&nbsp; 
            <td>Complete: <input type="checkbox" value={complete} onChange={handleComplete} ></input></td>&nbsp; 
            <input type="text" value={completeText} placeholder="Not Complete" disabled></input>
            <td>Date Completed:<input type="text" value={dateCompleted} placeholder="Not Complete" disabled></input> </td>
            <td>ID:<input type="text" value={postID} disabled></input> </td>
           
            <button >Delete</button>
       
            </tr>
        </div>);
}
//accepts title Description and authur as props
//uuid created to hopefully delete post