import Table from "../models/Table.js";

export const createTableEntry  = async (req , res )=>{
    const {Day, Time, Subject, Teacher}=req.body;
    try {
        const table= await Table.create ({Day, Time, Subject, Teacher});
        res.json ({msg: "Table is created", table});
    }
    catch(err) {
        res.status(400).json({msg: err.message})
    }
}

//get table

export const getTable = async (req, res) => {
    try {
        const tables = await Table.find();
        res.json({
            msg: "Tables fetched successfully",
            data: tables
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
} 

// delete table
export const deleteTable = async (req, res) => {
     try {
        const tables = await Table.findByIdAndDelete({_id:"691734549eb0d339e982472a"});
        res.json({
            msg: "Tables delete successfully",
            data: tables
            
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}