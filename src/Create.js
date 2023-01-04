import React, { useState } from "react";

const Create = (props) => {
  const posts = props.posts;
  const setPosts = props.setPosts;

  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [willDeliver, setWillDeliver] = useState(false);

  const token = window.localStorage.getItem("token");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const response = await fetch(
      "https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            willDeliver: true,
          },
        }),
      }
    );
    const result = await response.json();

    const post = result.data.post;
    setPosts([post, ...posts]);
    setTitle("");
    setDescription("");
    setPrice("");
    setWillDeliver(false);
  };

  return (
    <div>
      <h2 id='create'>Create Your Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <input
          placeholder="Price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <input
          placeholder="Will Deliver"
          value={willDeliver}
          onChange={(ev) => setWillDeliver(ev.target.value)}
        />

        <button> Create Post </button>
      </form>
    </div>
  );
};

export default Create;
