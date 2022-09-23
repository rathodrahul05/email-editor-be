const req = require('express/lib/request');
const userService=require('../services/userService');

const getAllUsers=async(req,res)=>{
const users=await userService.getAllUsers();
res.json(users)
}

const getUserById=async(req,res)=>{
const user1=await userService.getUserById(req.params.id);
res.json(user1)
}
const updateUser=async(req,res)=>{
const user1=await userService.updateUser(req)
res.json(user1)
}

const deleteUser=async(req,res)=>{
    await userService.deleteUser(req.params.id);
    res.send({"message":'user deleted successfully'})

}
module.exports = {
   
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  };