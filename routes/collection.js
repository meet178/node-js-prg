const express = require("express")
const multer = require("multer")
const controller = require("../controller/collection")

const router = express.Router()

var fileStorage = multer.diskStorage({ 
    destination : function(req,file,cb){
        cb(null , './upload');
    },
    filename: function (req, file, cb) { 
        cb(null , file.originalname);   
     }
})

var upload = multer({storage:fileStorage})


router.post("/register", controller.register)
router.post("/imgupload",upload.single("image"),controller.imageupload)
router.post("/login", controller.login)
router.get("/get_data", controller.get_data)
router.put("/data_update", controller.data_update)
router.delete("/data_delete", controller.data_delete)

module.exports = router