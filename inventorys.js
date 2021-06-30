const express = require('express');
const Inventory = require('../models/inventory');

const router = express.Router();

router.post('/add',(req,res)=>{

    let newInventory = new Inventory(req.body);

    newInventory.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Inventory created Successfully!"
        });

        });
});

//get
router.get('/inventory',(req,res)=>{
    Inventory.find().exec((err,inventorys)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingInventory: inventorys
        });
    }) ;          
});

//specific
router.get("/inventory/:id",(req,res)=>{
    let inId = req.params.id;
    Inventory.findById(inId,(err,inventory)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            inventory
        });
    });
});

//update
router.put('/inventory/update/:id',(req,res)=>{
    Inventory.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,inventory)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Successfully"
            })
        }
    );
});


//delete
router.delete('/inventory/delete/:id',(req,res)=>{
    Inventory.findByIdAndRemove(req.params.id).exec((err,deletedInventory)=>{
        if (err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete Successful",deletedInventory
        });

    });
});


module.exports = router;



