const User = require('../models/userModel');


const getAllUsers = async (req, res) => {
  const users = await User.find().sort('name');
  res.status(200).json({
    users,
    count: users.length
  })
    
    };
    

module.exports = getAllUsers;
