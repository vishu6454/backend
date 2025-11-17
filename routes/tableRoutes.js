import{
    createTableEntry, getTable,deleteTable, 
} from "../Controllers/tableController.js"

import express from "express";
const router = express.Router();

router.post("/create-table", createTableEntry);

router.get("/get-table", getTable);

router.delete ("/delete-table", deleteTable);

export default router;