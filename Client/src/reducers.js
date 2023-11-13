function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username

    case "LOGOUT":
      return ""
 
    default:
      return state;
  }
}

 function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_POST":
      const newPost = {
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: action.dateCreated,
        complete: action.complete,
        completeText: action.completeText,
        dateCompleted: action.dateCompleted,
        id: action.id, 
      };
      return [newPost, ...state];
      case "FETCH_TODO":
        return action.posts;
      case "DELETE_TODO":
        return action.posts;
      case "TOGGLE_TODO":
        return action.posts;
    default:
      return state;
  }
}


export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    posts: todoReducer(state.posts, action),
  };
}
