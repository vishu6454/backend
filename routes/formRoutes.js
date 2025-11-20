import{
    createForm,
    deleteForm
}from "../Controllers/formController.js";
import express from "express";          
const router = express.Router();

// create form route
router.post("/form", createForm);  
router.delete("/delete-form/:id",deleteForm) 


export default router;


