// const likes_dislike_comments = (sequelize, DataTypes) => {
//   const Likes_dislike_comments = sequelize.define('likes_dislike_comments', {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true
//     },
//     comment_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'comments',
//         key: 'id'
//       }
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'users',
//         key: 'id'
//       }
//     },
//     like: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     tableName: 'likes_dislike_comments',
//     schema: 'public',
//     timestamps: false,
//     indexes: [
//       {
//         name: "likes_dislike_comments_pkey",
//         unique: true,
//         fields: [
//           { name: "id" },
//         ]
//       },
//     ]
//   });
//   return Likes_dislike_comments;
// };

const mongoose = require("mongoose");

const Likes_dislike_comments =new mongoose.Schema({
  comment_id: {
    type: mongoose.Schema.ObjectId,
    ref: "comments",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  likes: {
    type: Boolean,
    required: true,
  },
  dislikes: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "likes_dislike_comments",
  Likes_dislike_comments
);
