import {useState} from "react";
import"./App.css";
export default function Post ({ title, Description, author, dateCreated, postID}) {

  //useState hook within Post component set to empty string init
const [dateCompleted, setDateCompleted] = useState("");
const [complete, setComplete] = useState("");
const [completeText, setCompleteText] = useState("");

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
// function handleDelete(currentID){
//  const newTodoList = posts.filter(item => item.postID !== currentID);
//  //update list from here
// }



    return (
      <div >
        <div className="TodoItem">
          <table>
            <tbody>
              <tr >
                <td >Title: {title}</td> 
                <td>Description: {Description}</td>
                <td><i>Written by <b>{author}</b></i></td> 
                <td>Date Created: {dateCreated}</td>
                <td>Complete: <input type="checkbox" value={complete} onChange={handleComplete} ></input></td> 
                <td><input type="text" value={completeText} placeholder="Not Complete" disabled></input></td>
                <td>Date Completed:<input type="text" value={dateCompleted} placeholder="Not Complete" disabled></input> </td>
                <td>ID:<input type="text" value={postID} disabled></input> </td>
                {/* <td><button >Delete</button></td> */}
              </tr>
            </tbody>
          </table>
        </div>
        </div>);
}
//accepts title Description and authur as props
//uuid created to hopefully delete post