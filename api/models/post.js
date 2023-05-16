import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import  User  from "./user.js";

class Post extends Model {}

Post.init(
 { title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING(3000),
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  cat: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue:  DataTypes.NOW
  },
},
  {
    sequelize,
    modelName: 'Post',
  }

);

//Define the Post-User association
// Post.belongsTo( User, {
//     foreignKey: "uid"
//   });

Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'uid'
    })
  }
  

export default Post;
