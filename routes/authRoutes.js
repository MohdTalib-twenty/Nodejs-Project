const express = require("express")
const {Register, Login, getUserInfo}=require("../controllers/authController");
const userAuth = require("../middlewares/authMiddleware");

const router = express.Router();



router.post('/register',Register);
router.post('/login',Login)
router.get('/getUserInfo',userAuth,getUserInfo)



module.exports=router