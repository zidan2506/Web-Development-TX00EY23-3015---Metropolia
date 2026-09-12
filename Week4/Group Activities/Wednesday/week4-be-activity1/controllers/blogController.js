const Blog = require("../models/blogModel");

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.status(200).json(blogs);
};

const createBlog = async (req, res) => {
  const newBlog = await Blog.create({ ...req.body });
  res.status(201).json(newBlog);
};

const getBlogById = async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findById(blogId);
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  const deletedBlog = await Blog.findOneAndDelete({ _id: blogId });
  if (deletedBlog) {
    res.status(200).json({ message: "Blog deleted successfully" });
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
};
