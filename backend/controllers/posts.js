const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    const { title, content, category, language } = req.body;
    const images = req.flies ? req.files.map((file) => file.filename) : [];

    const post = await Post.create({
      user: req.user.id,
      title,
      content,
      category,
      language,
      images,
    });

    const populatePost = await Post.findById(post._id).populate({
      path: "user",
      select: "name profileImage country",
    });

    res.status(201).json({
      success: true,
      data: populatePost,
    });
  } catch (error) {
    console.error("Create Post Failed: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate({
        path: "user",
        select: "name profileImage country",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      success: true,
      count: posts.length,
      total: totalPosts,
      data: posts,
    });
  } catch (error) {
    console.error("failed to Get Posts : ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await Post.find({ category })
      .populate({
        path: "user",
        select: "name profileImage country",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("failed to Get Posts by catogory : ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.find(req.params.id)
      .populate({
        path: "user",
        select: "name profileImage country city bio",
      })
      .populate({
        path: "comments.user",
        select: "name profileImage",
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("failed to Get Posts by catogory: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId })
      .populate({
        path: "user",
        select: "name profileImage country",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Get user Posts failed: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
