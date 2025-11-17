import{
    createForm,
}from "../Controllers/formController.js";
import express from "express";          
const router = express.Router();

// create form route
router.post("/form", createForm);   


export default router;


