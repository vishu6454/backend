import Blog from "../models/Blog"

// 

// create blog
export const createBlog = async (req , res) =>{
  try{
    const {title, content, author }=req.body
    const blog = await Blog.create({title, content, author })
    res.json({blog})

  }
  catch (err){
    res.status(400).json({msg: err.message})
  }
}


// get blog
export const getBlogs = async (req,res) =>{
    const blogs = await Blog.find().populate("author","email")
    res.json({blogs})
    
}