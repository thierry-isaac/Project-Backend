const express = require("express");
const {Category} = require("../models/category")

const router = express.Router();

router.get(`/`, async (req, res)=>{
    
    const category = await Category.find();
    if(!category){
        res.status(500).json({success:false})
    }
    res.send(category)
})

router.post(`/`, async (req, res)=>{
    
let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color
})
category = await category.save()

if(!category)
return res.status(404).send("Category could not be created ...");

res.send(category)

})

router.get("/:id", async (req, res)=>{
    const category = await Category.findById(req.params.id);

    if(!category){
         res.status(500).send("the category with this id cannot be found");
    }
    res.status(200).send(category)
})

router.put("/:id", async(req, res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: req.body.image,
            icon: req.body.icon
        },
        {
            new: true
        }
    )
    if(!category){
        res.status(500).json({message: "the category cound not be updated"})
    }
    res.status(200).send(category)
})

    router.delete("/:id",(req, res)=>{
        Category.findByIdAndRemove(req.params.id).then(category =>{
            if(category){
            return res.status(200).json({success: true, message: "Category deleted successfuly"})
            } else {
            return res.status(404).json({success:false, message: "Category Not deleted"})
            }
            
        }).catch(err=>{
            return res.status(400).json({success:false, error: err})
        })
    })

module.exports = router;