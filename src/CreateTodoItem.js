import {useState} from 'react';


export default function CreateTodoItem ({user, handleAddPost}) {//accepts prop of user
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateCreated, setDateCreated] = useState("");
    
   

    function handleTitle(evt){
        setTitle(evt.target.value);
    }
    function handleDescription(evt){
        setDescription(evt.target.value);
        const currentDate = Date.now();
        const f = new Intl.DateTimeFormat("en-us", {
          dateStyle: "full"
        })
        setDateCreated(f.format(currentDate));
    }

    function handleCreate(){
        const newItem = {title, description, author: user, dateCreated};
        handleAddPost(newItem);
    }
   
    return (
         <form  onSubmit={(e) => {e.preventDefault(); handleCreate()}}>
            <div > 
            <br/>
            <tr>
            <td>Author: <b>{user}</b></td>
            <br/>
            <td>&nbsp; &nbsp; &nbsp; &nbsp; 
                <label htmlFor="create-title">Title:</label>
                <input 
                type="text" 
                value={title}
                onChange={handleTitle}
                name="create-title" 
                id="create-title" 
                />
            </td>
            
            <td>
            &nbsp; &nbsp;  Description: <textarea value={description} onChange={handleDescription}/>
          </td>
        
        
          <td> <input type="submit" value="Create"  /></td></tr>
          </div>
        </form>);
}
