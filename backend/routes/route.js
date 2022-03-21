var express = require('express');
const pool = require('../DB/pg');

const router = express.Router();

router.post("/save",(req,res)=>{
    pool.Save(req).then((data)=>{
        return res.json(data)
    });
});

router.post("/load",(req,res)=>{
    pool.Load(req).then((data)=>{
        return res.json(data)
    });
});

router.post("/view",(req,res)=>{
    pool.View(req).then((data)=>{
        return res.json(data)
    });
});

router.post("/delete",(req,res)=>{
    pool.Delete(req).then((data)=>{
        return res.json(data)
    });
});
module.exports=router;