const express=require('express');
const {getAllTours, postTour, getTourById, UpdateTourById, deleteTourById,checkId, checkBody, createTour}=require('../Controllers/tourController');

// to creating the router instance
const router=express.Router();

// Param Middleware- It is the middleware that is specifically used to handle route parameters
router.param('id',checkId);

// get method to fetch all the tours
router.get('/',getAllTours);

// post method to create a particular tour
// router.post('/',checkBody,postTour);

// get method to access the data of a particular id and also we can also make the parameter optional by writing question Mark in it
router.get('/:id',getTourById);

// update the particular data with the id and in that case, we will use patch
router.patch('/:id',UpdateTourById);

// Now we will create the delete method
router.delete('/:id',deleteTourById);

// to create the tour
router.post('/',createTour);

// export the router
module.exports=router;