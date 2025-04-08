const express=require('express');
const {getAllUsers, createUser, getSpecificUser, updateUser, deleteUser}=require('../Controllers/userController');

// to creating the router instance
const router=express.Router();

// route to get all the users
router.get('/',getAllUsers);

// route to create a user
router.post('/',createUser);

// to get the specific user according to id
router.get('/:id',getSpecificUser);

// to update user
router.patch('/:id',updateUser);

// to delete the user
router.delete('/:id',deleteUser);

// export the router
module.exports=router;