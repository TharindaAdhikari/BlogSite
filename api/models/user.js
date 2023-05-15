import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/config.js";
import Post from './post.js';

class User extends Model {}


User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, { sequelize, modelName: 'User' });


// Define the User-Post association
User.hasMany(Post, { as: 'posts', foreignKey: 'uid' });

export default User;



