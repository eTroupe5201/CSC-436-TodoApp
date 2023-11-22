import Userbar from "./Userbar";
import CreateTodoItem from "./CreateTodoItem";
import PostTodoList from "./PostTodoList";
import React, { useEffect, useReducer } from "react";
import {StateContext} from "./context"
import appReducer  from "./reducers";
import {useResource } from "react-request-hook";

function App() {
  //use reducer for global variables set here
  //const initialPosts = [];
 
  // useEffect(() => {
  //   fetch("api/CreateTodoItem")
  //     .then((result) => result.json())
  //     .then((posts) => dispatch({ type:"FETCH_TODO", posts}));
  // }, []);

  // const [postResponse, getPosts] = useResource(() => ({
  //   url:'/CreateTodoItem',
  //   method: "get"
  // }));

  

  // useEffect(() => {
  //   if(postResponse && postResponse.data){
  //     dispatch({ type:"FETCH_TODO", posts: postResponse.data.reverse()});
      
  //   }
  // }, [postResponse]); //was missing the postResponse



  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: [],
  });

const {user} = state;

    const [posts, getPosts] = useResource(() => ({
    url: "/post",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
    }));

   
    
    useEffect(() => {
      getPosts();
    }, [state?.user?.access_token]);

       useEffect(() => {
    if (posts && posts.isLoading === false && posts.data) {
      dispatch({ type: "FETCH_POSTS", posts: posts.data.posts.reverse() });
    }
    }, [posts]);
   
    useEffect(getPosts, []);
  //const [show, setShowComponent] = useState(false);
 
  function toggle(){
    if(user === ""){
      return false;
    }else{
      return true;
    }
  }
  

//const { user, posts } = state; //user data is in state, destructured
//destructure allows you to access specfic objects values without using . or brackets
  
  // const handleAddPost = (newPost) => {
  //    dispatch({type:"CREATE_POST", ...newPost});
  // };
  //update this globally

   return (
    
    <div>
      <StateContext.Provider value = {{state, dispatch}}>
      <h1>Erica Troupe's Todo App</h1>
      <Userbar/>
      <p className="CreatePost"></p>
      {toggle() && <CreateTodoItem/>}
      {toggle() && <PostTodoList/>}
      </StateContext.Provider>
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

