const express = require("express")
const { createPost, updatePost, deletePost, getPost, likePost, unlikePost, commentPost } = require("../controllers/postsContoller");
const userAuth = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/createPost',userAuth,createPost)
router.get('/getPost',userAuth,getPost);
router.put("/updatePost",userAuth,updatePost)
router.delete('/deletePost/:id',userAuth,deletePost)
router.post('/likePost',userAuth,likePost);
router.post('/unlikePost',userAuth,unlikePost);
router.post('/commentPost/:id',userAuth,commentPost);





module.exports=router