const goalsModel = require('../models/goalsModel');
const userModel = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const okCode = 200;
const createdCode = 201;
const unprocessable = 400;
const notFound = 404;
const root = '/';

exports.getAllGoals = catchAsync(async (request, response, next) => { // Function that GETS all the goals from the database
        const method = request.method; // Request method
        const url = request.url;

        if(method === 'GET' && url.startsWith(root)) { // If there is a GET request
            const goals = await goalsModel.find();

            if(goals.length === 0) {
                return next(new AppError('Goals not found'), 404);
            }

            return response.status(okCode).json(goals); // Send back the goals
        }
    } 
);

exports.getGoalByID = catchAsync(async (request, response, next) => {
        const id = request.params.id;
        const goal = await goalsModel.findById(id);

        if(!goal) {
            return next(new AppError('No goal found'), 404);
        }

        return response.status(okCode).json(goal);
    }
);

exports.createGoal = catchAsync(async (request, response, next) => { // Function export that creates a new goal
    try {
        const method = request.method; // The request method
        const {goal, reason, reward, length} = request.body; // Body of the request
        const createdBy = request.account.id; //Getting the user _id from the JWT that was verified by authentication.js

        if(request.account.type !== 'User') {
            return response.status(unprocessable).json({
                message: 'Only users can create goals'
            });
        }

        if(!goal || !reason || !reward || !length) {
            return response.status(unprocessable).json({
                message: 'Goal must have a goal, reason, length and reward',
                sentAt: new Date().toISOString()
            });
        }

        if(method === 'POST') {
            const newGoal = new goalsModel({goal, reason, reward, length, createdBy});
            await newGoal.save(); // Save the goal

            //Add reference to goal to the user who created it
            await userModel.updateOne({_id: createdBy}, {$push: {goals: newGoal.id}});
            return response.status(createdCode).json(newGoal);
        }
    } 
    
    catch(error) {
        if(error) {
            return response.status(notFound).json({
                message: error.message
            });
        }
    }
});

exports.editGoal = catchAsync(async (request, response) => { // Controller function to edit a goal

    try {
        let goalEdited = false;
        
        const method = request.method;
        const url = request.url;
        const id = request.params.id; // The ID of the goal coming from the params section
        const {goal, reason, length, reward} = request.body; // The data from the body.

        if(!goal || !reason || !length || !reward) {

            return response.status(unprocessable).json({
                message: 'Goal must have a goal, reason, length and reward',
                sentAt: new Date().toISOString()
            });
        }
        
        if(!isNaN(id) || !id) { // If there is no ID or if it's not a number
            return response.status(unprocessable).json({
                message: 'ID invalid',
                sentAt: new Date().toISOString()
            });
        }

        if(method === 'PATCH' && url.startsWith(root)) {
            goalEdited = true;

            if(goalEdited) {
                const updatedGoal = await goalsModel.findByIdAndUpdate(id, request.body); // Update the goal by finding its id and updating the body
                return response.status(okCode).json(updatedGoal);
            }
        }
    } 
    
    catch(error) {
        const msg = error.message;
        const stack = error.stack;

        if(error) {
            return response.status(notFound).json({
                message: msg,
                stack
            });
        }
    }
});

exports.deleteGoals = async (request, response) => { // Deletes all the goals
    try {
        const method = request.method;
        const url = request.url;

        if(method === 'DELETE' || url.startsWith(root)) {
            await goalsModel.deleteMany();

            //Remove all goal references from user models
            await userModel.updateMany({},{$set: {goals: []}});

            return response.status(okCode).json({
                message: 'Goals deleted successfully',
                sentAt: new Date().toISOString()
            });
        }
    } 
    
    catch(error) {
        const errorMsg = error.message;

        if(error) { // If there is an error
            return response.status(unprocessable).json(errorMsg);
        }
    }
}

exports.deleteGoalByID = async (request, response) => { // Deletes a goal by its ID
    try {
        const id = request.params.id;
        const url = request.url;
        const method = request.method;

        if(!id || !isNaN(id)) {
            return response.status(unprocessable).json({
                message: 'ID invalid'
            });
        }

        if(method === 'DELETE' && url.startsWith(root)) {
            const goal = await goalsModel.findByIdAndDelete(id);
           
            //The goal reference then needs to be deleted from the usermodel
            await userModel.updateOne(
                {_id: goal.createdBy},
                {$pull: {goals: goal.id}}
            );
            
            return response.status(okCode).json({
                message: 'Goal Deleted',
                sentAt: new Date().toISOString()
            });
        }
    } 
    
    catch(error) {
        const errorMsg = error.message;

        if(error) {
            return response.status(notFound).json(errorMsg);
        }
    }
}  