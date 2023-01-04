import React, { useState } from 'react'


0
//this is a functional component that shows the posts from the api to the page
const AllPosts = (props) => {

  const [searchPhrase, setSearchPhrase] = useState('');
  const token = props.token;
  const fetchPosts = props.fetchPosts;
  const setPosts = props.setPosts;

    const posts = props.posts;
    
    //jsx (showing html on page)
      return (
        <div>
          <h1>Posts</h1>
          <h3>Search</h3>
          <input value={searchPhrase} onChange={ev => setSearchPhrase(ev.target.value)} />
            {posts.map((post) => {
              return (
                  <div key={post._id}
                   className={post.isAuthor ? 'singlePost myPost' : 'singlePost'}>
                    <div id='title'>{post.title} </div>
                      <p> {post.description} </p>
                      <p>Price: {post.price} </p>
                      <p>Location: {post.location} </p>
                      <p>Will Deliver: {post.willDeliver} </p>
                      {post.isAuthor ? <button>Edit</button> : null}
                        {post.isAuthor ? <button onClick={() => deletePost(post._id, fetchPosts, setPosts )}>Delete</button> : null}
                  </div>
             );
          })}
          
        </div>
  )

  function deletePost(id) {
    fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(result => {
      if (result) {
        const newPosts = posts.filter(post => post._id !== id);
        setPosts (newPosts)
        fetchPosts();
      }
      
    })
    .catch(console.error);
  };

}



export default AllPosts;
