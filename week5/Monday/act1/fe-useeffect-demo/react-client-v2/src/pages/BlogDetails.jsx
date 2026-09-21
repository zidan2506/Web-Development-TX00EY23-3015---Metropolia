import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

const BlogDetails = () => {

  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClick = async () => {

    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    navigate("/");

  };

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`${apiUrl}/${id}`);
      console.log(`/api/blogs/${id}`);
      const json = await response.json();

      if (response.ok) {
        setBlog(json);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className="blog-details">
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;

