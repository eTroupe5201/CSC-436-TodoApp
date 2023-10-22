import Userbar from "./Userbar";
import CreateTodoItem from "./CreateTodoItem";
import { useState } from "react";
import PostTodoList from "./PostTodoList";


function App() {
  
  const [user, setUser] = useState("");
  const initialPosts = [

  ];
  const [posts, setPosts] = useState(initialPosts);
  
  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]); //set new post opbect and prepend it into a list
  }
  
   return (
    
   <html>
    
   
    <div>
      
      <h1>Erica Troupe's Todo App</h1>
      <Userbar user={user} setUser={setUser}/> 
      <p className="CreatePost"></p><CreateTodoItem user={user} handleAddPost={handleAddPost}/>
      <PostTodoList posts={posts}/>
    
    </div>
    </html>
  );
 }


//hello name is being evaluated, 
//value is a controlled input
// it is a controlled input becuase the value is controlled and we control 
//what happens when the input changes
//onChange is called whenever the text input is used
//handleNameChange is a function we wrote, accepts parameter that we named
//it set the name to the value of the parameter that is being passed

export default App;
//app component
//calling useState gives back the variable itself and a setter
//uses array destructuring
//each component should have a single task

//Login has a trailing / becuase it is a null element

//reducer is used to centralized the state mj

