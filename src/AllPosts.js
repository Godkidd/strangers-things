import React, { useState } from "react";

0;
//this is a functional component that shows the posts from the api to the page
const AllPosts = (props) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const token = props.token;
  const fetchPosts = props.fetchPosts;
  const setPosts = props.setPosts;
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState(false);
  const [postId, setPostId] = useState("");

  const posts = props.posts;
  const handleClick = (id) => {
    setSendMessage(!sendMessage);
    setPostId(id);
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await fetch(
      `https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${postId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: message,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  };

  return (
    <div>
      
     <div id='searchBar'> 
      <input
        id='search'
        placeholder='Search'
        value={searchPhrase}
        onChange={(ev) => setSearchPhrase(ev.target.value)}
      />
     </div> 
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className={post.isAuthor ? "singlePost myPost" : "singlePost"}
          >
            <div id="title">{post.title} </div>
            <p> {post.description} </p>
            <p>Price: {post.price} </p>
            <p>Location: {post.location} </p>
            <p>Will Deliver: {post.willDeliver} </p>
            {post.isAuthor ? (
              <button>Edit</button>
            ) : (
              <button onClick={(ev) => handleClick(post._id)}>
                send meassage
              </button>
            )}
            {post.isAuthor ? (
              <button
                onClick={() => deletePost(post._id, fetchPosts, setPosts)}
              >
                Delete
              </button>
            ) : null}
            {sendMessage && post._id === postId ? (
              <form onSubmit={(ev) => handleSubmit(ev)}>
                <input
                  placeholder="message"
                  value={message}
                  onChange={(ev) => setMessage(ev.target.value)}
                />
                <button>send</button>
              </form>
            ) : null}
          </div>
        );
      })}
    </div>
  );

  function deletePost(id) {
    fetch(
      `https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          const newPosts = posts.filter((post) => post._id !== id);
          setPosts(newPosts);
          fetchPosts();
        }
      })
      .catch(console.error);
  }
};

export default AllPosts;
