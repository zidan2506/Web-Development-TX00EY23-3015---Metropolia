import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';


const Home = () => {
  const [blogs, setBlogs] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setBlogs(data);
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;

