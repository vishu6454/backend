import Form from "../models/Form.js";

export const createForm  = async (req , res )=>{
    try{
        const{name , email,messages , contact}=req.body;
        const form = await Form.create({name , email,messages , contact});
        res.json({msg:"Form sent" , form });
    }
    catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const deleteForm = async (req , res )=>{
  try {
    const {id} = req.params;
    const form = await Form.findByIdAndDelete(id);
    res.json({
      msg:"form has eliminated",
      Form
    });
  }catch (err){
    res.status(400).json({msg:err.message});
  }
}