import Post from "./Post"

export default function PostList ({posts = []}) {
  
 return (
  <div>
   {posts.map((p, i) => 
   
   <Post {...p} key={'post-' + i} />)}

  </div>);
}
//Class Notes
//accepts props, has deffault value of empty array if it doesnt receive a post
//map function is used to iterate over posts, create new posts components as it iterates
//any time we iterate over an array, we create components
//key is critical for delete, if not specified when rendered it will not function properly
//key attributes helps track which posts gets operated on, has to be unique
//need to genrate a uuid
//uuid in class 10/3/2023