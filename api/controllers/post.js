import { db } from "../config/db.js";
import { Op } from 'sequelize';
import jwt from "jsonwebtoken";
import Post from '../models/post.js';
import User from '../models/user.js';



export const getPosts = async (req, res) => {
  try {
    const whereClause = req.query.cat ? { cat: req.query.cat } : {};
    const posts = await Post.findAll({
      where: whereClause,
      //include: [{ model: User, attributes: ['username'] }],
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// export const getPost = async (req, res) => {
//   try {
//     const post = await Post.findOne({
//       where: { id: req.params.id },
//       include: [{ model: User, attributes: ['username'] }],
//     });
//     return res.status(200).json(post);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

    //console.log(q);
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost =  async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const userInfo = jwt.verify(token, "jwtkey");
    const { title, desc, img, cat, date } = req.body;
    const uid = userInfo.id;

    console.log(uid);
    const post = await Post.create({
      title,
      desc,
      img,
      cat,
      date,
      uid,
    });

    return res.json("Post has been created.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findOne({ where: { id: postId } });

    if (!post) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    const decodedToken = jwt.verify(token, "jwtkey");

    if (post.uid !== decodedToken.id) {
      return res.status(403).json("You can delete only your post!");
    }

    await post.destroy();
    return res.json({ message: "Post has been deleted!" });

  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findOne({ where: { id: postId } });

    if (!post) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    const decodedToken = jwt.verify(token, "jwtkey");

    if (post.uid !== decodedToken.id) {
      return res.status(403).json("You can update only your post!");
    }

    const updatedPost = {
      title: req.body.title,
      desc: req.body.desc,
      img: req.body.img,
      cat: req.body.cat
    };

    await post.update(updatedPost);
    return res.json({ message: "Post has been updated!" });

  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }

};
