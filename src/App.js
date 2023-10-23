import Userbar from "./Userbar";
import CreateTodoItem from "./CreateTodoItem";
import PostTodoList from "./PostTodoList";
import React, { useReducer } from "react";
import appReducer  from "./reducers";


function App() {
  //use reducer for global variables set here
  const initialPosts = [];
 
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: initialPosts,
  });
  
  //const [show, setShowComponent] = useState(false);
 
  function toggle(){
    if(state.user === ""){
      return false;
    }else{
      return true;
    }
  }
  

//const { user, posts } = state; //user data is in state, destructured
//destructure allows you to access specfic objects values without using . or brackets
  
  const handleAddPost = (newPost) => {
     dispatch({type:"CREATE_POST", ...newPost});
  };
  //update this globally

   return (
    
    <div>
      <h1>Erica Troupe's Todo App</h1>
      <Userbar user={state.user} dispatch={dispatch} />
      <p className="CreatePost"></p>
      {toggle() && <CreateTodoItem user={state.user} handleAddPost={handleAddPost}/>}
      {toggle()&& <PostTodoList posts={state.posts}/>}
    </div>
  );
 }
//conditional rendering added based on userReducer, not sure if I can add toggle to reducer

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

