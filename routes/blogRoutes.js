import {
createBlog,
getBlogs,
} from "../Controllers/blogController.js";
import express from "express";

const router = express.Router();

// create blog route
router.post("/", createBlog);

// get blogs route
router.get("/", getBlogs);

export default router;