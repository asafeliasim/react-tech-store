const express = require('express');
const cors = require('cors');
const BranchModel = require('../db/models/branchModel');
const router = new express.Router();

router.use(cors());
router.post('/branch',async (req,res) => {
    const branch = await new BranchModel(req.body);
    try{
        branch.save();
        res.status(200).send(branch);
    }catch (e) {
        res.status(500).send(e);
    }

});


router.get('/branches', async (req,res)=>{
    try{
        const branches = await BranchModel.find({});
        if(!branches){
            throw new Error('Branches are empty');
        }
        res.status(200).send(branches);
    }catch (e) {
        res.status(500).send(e);
    }
});
router.patch('/branch/:address',async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowsUpdates = 'address';
    const isValidOperation  = updates.every((update)=> allowsUpdates.includes(update));
    const _address = req.params.address;
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid update'});
    }
    try{
        const branch = await BranchModel.findOneAndUpdate({address: _address},req.body,{new:true,runValidation:true});
        res.status(200).send(branch);
    }catch (e) {
        res.status(500).send(e);
    }
});
router.delete('/branch/:title', async (req,res)=>{
    try{
        const _title = req.params.title;
        const branch = await BranchModel.findOneAndDelete({title:_title});
        if(!branch){
            return res.send("BranchModel isn't exist");
        }
        res.status(200).send(`${_title} has deleted`);
    }catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
