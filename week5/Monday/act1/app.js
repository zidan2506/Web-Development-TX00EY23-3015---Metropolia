// app.js

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

//Mock blog
const blog = {
  title: 'New Blog',
  body: 'This is the content of the new blog.',
  userId: 1,
};
const blogId = 2
const updatedData = {title: "Updated Blog", body: "This blog has been updated!"}

//fetch
const addBlog = async () => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(blog),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();
  console.log('New Blog added:', json);
};

const fetchAllBlogs = async () => {
    const res = await fetch(apiUrl, {
        method: "GET"
    })
    const data = await res.json();
    console.log("All blogs:", data)
}
const fetchBlog = async (id) => {
    const res = await fetch(`${apiUrl}/${id}`);
    const data = await res.json();
    console.log("Blog:", data)
}

const updateBlog = async (id, updatedData) => {
    const res = await fetch(`${apiUrl}/${id}`,{
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
            "Content-Type": 'application/json'
        }
    })
    
    const updatedBlog = await res.json();
    console.log("Blog updated: ", updatedBlog);
}

const deleteBlog = async (id) => {
    const res = await fetch(`${apiUrl}/${id}`,{
        method: "DELETE"
    });

    const deletedBlog = await res.json();
    console.log("Blog deleted", deletedBlog);
}

// Example Usage
// addBlog();
// fetchAllBlogs();
// fetchBlog(blogId);
// updateBlog(blogId, updatedData);
// deleteBlog(3);