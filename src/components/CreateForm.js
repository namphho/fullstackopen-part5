import React, { useState } from "react";

const CreateForm = ({ onHandleCreate }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    setTitle("")
    setUrl("");
    setAuthor("");
    onHandleCreate({
      title: title,
      url: url,
      author: author,
    });
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateForm;