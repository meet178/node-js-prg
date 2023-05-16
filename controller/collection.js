const express = require("express")
const userCollection = require("../schema/schema")
const jwt = require("jsonwebtoken")

module.exports = {
    register: function(req,response){
        try{
            userCollection.create({
                Name:req.body.Name,
                Age:req.body.Age,
                email:req.body.email,
                password:req.body.password
            })
            response.json({message:"Data Is Submited"})
        }
        catch(err){
                console.log(err)
            }           
    },

    login: async function(req,res){
        
            if(req.body.email && req.body.password){
                let user = await userCollection.findOne((req.body))
                if(user)
                {
                    jwt.sign({user}, "sdfdfdfssrgrgedg", (err,token)=>{
                        if(err){
                            console.log("Somthing Went Wrong");
                        }
                        else{
                            res.json({"Token": token})
                        }   
                    })  
                }
                else{
                    res.send("User is not Found")
                }
            }
        },

    get_data: async function(req,res){
        try{
            const AllData = await userCollection.find()
                    res.status(200).json(AllData)
        }
        catch(err){
                res.json({"Err ": err})
            }
    },

    data_update: async function(req,res){
        try{
           await userCollection.updateOne({_id: req.body._id},
            {
                $set:{
                    Name: req.body.Name,
                    Age: req.body.Age,
                    email: req.body.email,
                    password:req.body.password
                }
            },{
                upsert: true
            })
            res.json({message:"Data Is Updated"})
        }
        catch(err){
            console.log(err)
        }
    },

    data_delete: function(req,res){
        userCollection.deleteOne({_id: req.body._id},
            {
                $delete:{
                    Name: req.body.Name,
                    Age: req.body.Age,
                    email: req.body.email,
                    password:req.body.password
                }
            }).then(()=>{
                res.json({message:"Data Deleted"})
            }).catch((err)=>{
                console.log(err);
            })
    },

    imageupload: function (req,res){
        console.log(req.file)
        res.send({
          "msg":"image uploaded"
        })
    }
}