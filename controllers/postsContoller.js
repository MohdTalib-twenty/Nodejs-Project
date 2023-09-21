const Post = require("../models/postsModels");

//Create Operation

const createPost = async (req, res) => {
    try {
      const { title, body,userName } = req.body;
  
      if (!title || !body || !userName) {
        res.status(400).send({
          success: false,
          message: "Enter all the fields",
        });
      } else {
        const post = await new Post({
          title: title,
          body: body,
          userId: req.user.userId,
          userName: userName,
        });
        await post.save();
  
        res.status(201).send({
          success: true,
          message: "Posted successfully",
          post,
        });
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error,
      });
    }
  };


//Read Operation
const getPost = async (req, res) => {
  try {
   
    const result = await Post.findOne({userId:req.user.userId})
    if (result) {
      res.status(201).send({
        success: true,
        result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};


//Delete Operation

const deletePost = async (req, res) => {
  try {
    const result = await Post.findOneAndDelete({
      _id: req.params.id,
    });
    if (result) {
      res.status(201).send({
        success: true,
        message: "Deleted Successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong please try after sometime",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};
//Update Post
const updatePost = async (req, res) => {
    try {
       const { _id, newtitle, newbody } = req.body;
      const result = await Post.findByIdAndUpdate(_id, {
        $set: { title: newtitle, body: newbody }
      });
      if (result) {
        res.status(201).send({
          success: true,
          message: "Post Updated",
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Something went wrong",
        });
      }
   
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error,
      });
    }
  };
//Like on Post
const likePost = async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await Post.findByIdAndUpdate(
      _id,
      {
        $push: { likes: req.user.userId },
        $inc: { numLikes: 1 },
      },
      { new: true }
    )
    if (result) {
      res.status(201).send({
        success: true,
        message: "Liked successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};

const unlikePost = async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await Post.findByIdAndUpdate(
      _id,

      { $pull: { likes: req.user.userId }, $inc: { numLikes: -1 } },
      { new: true }
    )

    if (result) {
      res.status(201).send({
        success: true,
        message: "unliked successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};

const commentPost = async (req, res) => {
  try {
    const { body } = req.body;
    const result = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: { comment: body, commenter: req.user.userId },
        },
        $inc: { numComments: 1 },
      },
      { new: true }
    )

    if (result) {
      res.status(201).send({
        success: true,
        message: "comment added successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};
module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  likePost,unlikePost,
  commentPost
};
